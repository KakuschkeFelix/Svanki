const AnkiDeckActions = [
	'deckNames',
	'deckNamesAndIds',
	'getDecks',
	'createDeck',
	'changeDeck',
	'deleteDecks',
	'getDeckConfig',
	'saveDeckConfig',
	'setDeckConfigId',
	'cloneDeckConfigId',
	'removeDeckConfigId',
	'getDeckStats'
] as const;

export type DeckConfig = {
	lapse: {
		leechFails: number;
		delays: number[];
		minInt: number;
		leechAction: number;
		mult: number;
	};
	dyn: boolean;
	autoplay: boolean;
	mod: number;
	id: number;
	maxTaken: number;
	new: {
		bury: boolean;
		order: number;
		initialFactor: number;
		perDay: number;
		delays: number[];
		separate: boolean;
		ints: number[];
	};
	name: string;
	rev: {
		bury: boolean;
		ivlFct: number;
		ease4: number;
		maxIvl: number;
		perDay: number;
		minSpace: number;
		fuzz: number;
	};
	timer: number;
	replayq: boolean;
	usn: number;
};

export type AnkiDeckAction = (typeof AnkiDeckActions)[number];

export type AnkiDeckActionParams = {
	deckNames: undefined;
	deckNamesAndIds: undefined;
	getDecks: { cards: number[] };
	createDeck: { deck: string };
	changeDeck: { cards: number[]; deck: string };
	deleteDecks: { decks: string[] };
	getDeckConfig: { deck: string };
	saveDeckConfig: { config: DeckConfig };
	setDeckConfigId: { deck: string[]; configId: number };
	cloneDeckConfigId: { name: string; cloneFrom: number };
	removeDeckConfigId: { configId: number };
	getDeckStats: { decks: string[] };
};

export type AnkiDeckActionResult = {
	deckNames: string[];
	deckNamesAndIds: { [deckName: string]: number };
	getDecks: { [deckName: string]: number[] };
	createDeck: number;
	changeDeck: null;
	deleteDecks: null;
	getDeckConfig: DeckConfig;
	saveDeckConfig: boolean;
	setDeckConfigId: boolean;
	cloneDeckConfigId: number;
	removeDeckConfigId: boolean;
	getDeckStats: {
		[deckId: number]: {
			deck_id: number;
			name: string;
			new_count: number;
			learn_count: number;
			review_count: number;
			total_in_deck: number;
		};
	};
};

export type AnkiDeckServiceCall<A extends AnkiDeckAction> = {
	action: A;
	version: 6;
	params: AnkiDeckActionParams[A];
	returnType: AnkiDeckActionResult[A];
};
