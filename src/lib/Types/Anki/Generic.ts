import type { AnkiAction } from './Actions';
import type { AnkiCardAction, AnkiCardServiceCall } from './Card';
import type { AnkiDeckAction, AnkiDeckServiceCall } from './Deck';
import type { AnkiMediaAction, AnkiMediaServiceCall } from './Media';
import type { AnkiModelAction, AnkiModelServiceCall } from './Model';

export type AnkiServiceCall<T extends AnkiAction> = T extends AnkiCardAction
	? AnkiCardServiceCall<T>
	: T extends AnkiDeckAction
	? AnkiDeckServiceCall<T>
	: T extends AnkiModelAction
	? AnkiModelServiceCall<T>
	: T extends AnkiMediaAction
	? AnkiMediaServiceCall<T>
	: never;
