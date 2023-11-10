import type { AnkiAction } from '$lib/Types/Anki/Actions';
import type { AnkiServiceCall } from '$lib/Types/Anki/Generic';
import axios from 'axios';
import type { AxiosInstance } from 'axios';

class XhrFactory {
	createXhr(): AxiosInstance {
		return axios.create();
	}
}

class ResponseError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ResponseError';
	}
}

class MissingFieldError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'MissingFieldError';
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
		error: null;
		result: T['returnType'];
	}> {
		const response = await this.xhrFactory.createXhr().post('http://127.0.0.1:8765', serviceCall);
		const data = response.data;
		if (Object.getOwnPropertyNames(data).length != 2) {
			throw new MissingFieldError('Response has an unexpected number of fields');
		}
		if (!Object.prototype.hasOwnProperty.call(data, 'error')) {
			throw new MissingFieldError('Response is missing required error field');
		}
		if (!Object.prototype.hasOwnProperty.call(data, 'result')) {
			throw new MissingFieldError('Response is missing required result field');
		}
		if (data.error) {
			throw new ResponseError(data.error);
		}
		return data;
	}
}
