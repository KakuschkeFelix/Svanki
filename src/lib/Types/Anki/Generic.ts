import type { AnkiAction } from './Actions';
import type { AnkiCardAction, AnkiCardServiceCall } from './Card';
import type { AnkiDeckAction, AnkiDeckServiceCall } from './Deck';

export type AnkiServiceCall<T extends AnkiAction> = T extends AnkiCardAction
	? AnkiCardServiceCall<T>
	: T extends AnkiDeckAction
	? AnkiDeckServiceCall<T>
	: never;
