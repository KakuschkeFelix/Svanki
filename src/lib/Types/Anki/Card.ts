const AnkiCardActions = [
	'getEaseFactors',
	'setEaseFactors',
	'setSpecificValueOfCard',
	'suspend',
	'unsuspend',
	'suspended',
	'areSuspended',
	'areDue',
	'getIntervals',
	'findCards',
	'cardsToNotes',
	'cardsModTime',
	'cardsInfo',
	'forgetCards',
	'relearnCards',
	'answerCards'
] as const;
export type AnkiCardAction = (typeof AnkiCardActions)[number];

export type CardInfo = {
	answer: string;
	question: string;
	deckName: string;
	modelName: string;
	fieldOrder: number;
	fields: {
		[key: string]: {
			value: string;
			order: number;
		};
	};
	css: string;
	cardId: number;
	interval: number;
	note: number;
	ord: number;
	type: number;
	queue: number;
	due: number;
	reps: number;
	lapses: number;
	left: number;
	mod: number;
};

export type CardAnswer = {
	cardId: number;
	ease: 1 | 2 | 3 | 4;
};

export type AnkiCardActionParams = {
	getEaseFactors: { cards: number[] };
	setEaseFactors: { cards: number[]; easeFactors: number[] };
	setSpecificValueOfCard: { card: number; keys: string[]; newValues: number[] };
	suspend: { cards: number[] };
	unsuspend: { cards: number[] };
	suspended: { cards: number };
	areSuspended: { cards: number[] };
	areDue: { cards: number[] };
	getIntervals: { cards: number[] };
	findCards: { query: string };
	cardsToNotes: { cards: number[] };
	cardsModTime: { cards: number[] };
	cardsInfo: { cards: number[] };
	forgetCards: { cards: number[] };
	relearnCards: { cards: number[] };
	answerCards: { answers: CardAnswer[] };
};

export type AnkiCardActionResult = {
	getEaseFactors: number[];
	setEaseFactors: boolean[];
	setSpecificValueOfCard: boolean[];
	suspend: boolean;
	unsuspend: boolean;
	suspended: boolean;
	areSuspended: boolean[];
	areDue: boolean[];
	getIntervals: number[];
	findCards: number[];
	cardsToNotes: number[];
	cardsModTime: { cardId: number; mod: number }[];
	cardsInfo: CardInfo[];
	forgetCards: null;
	relearnCards: null;
	answerCards: boolean[];
};

export type AnkiCardServiceCall<A extends AnkiCardAction> = {
	action: A;
	version: 6;
	params: AnkiCardActionParams[A];
	returnType: AnkiCardActionResult[A];
};

export type AnkiCardMediaResult = { result: { field: string; media: string; type: 'image' | 'audio' }, error: string | null };

export type SvankiCardField = { template: string, media: AnkiCardMediaResult[], error: string | null };

export type SvankiCardInfo = {
	Front: SvankiCardField;
	Back: SvankiCardField;
}