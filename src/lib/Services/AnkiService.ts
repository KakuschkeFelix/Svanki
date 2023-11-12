import type { AnkiAction } from '$lib/Types/Anki/Actions';
import type { AnkiServiceCall } from '$lib/Types/Anki/Generic';
import { error } from '@sveltejs/kit';
import axios from 'axios';
import type { AxiosInstance } from 'axios';

class XhrFactory {
	createXhr(): AxiosInstance {
		return axios.create();
	}
}

export class AnkiService {
	private xhrFactory: XhrFactory;

	constructor() {
		this.xhrFactory = new XhrFactory();
	}

	async invoke<T extends AnkiServiceCall<AnkiAction>>(
		serviceCall: Omit<T, 'returnType'>
	): Promise<{
		error: null | string;
		result: T['returnType'] | undefined;
	}> {
		try {
			const response = await this.xhrFactory.createXhr().post('http://127.0.0.1:8765', serviceCall);
			const data = response.data;
			if (Object.getOwnPropertyNames(data).length != 2) {
				return {
					error: 'Response has an unexpected number of fields',
					result: undefined,
				}
			}
			if (!Object.prototype.hasOwnProperty.call(data, 'error')) {
				return {
					error: 'Response is missing required error field',
					result: undefined,
				}
			}
			if (!Object.prototype.hasOwnProperty.call(data, 'result')) {
				return {
					error: 'Response is missing required result field',
					result: undefined,
				}
			}
			if (data.error) {
				return {
					error: data.error,
					result: undefined,
				}
			}
			return data;
		} catch (e) {
			let errorMessage = 'An error occured';
			if (e instanceof Error) {
				errorMessage = e.message;
			}
			return {
				error: errorMessage,
				result: undefined,
			}
		}
	}
}
