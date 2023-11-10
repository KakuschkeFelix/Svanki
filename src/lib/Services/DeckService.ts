import type { AnkiDeckServiceCall, AnkiDeckActionParams } from '$lib/Types/Anki/Deck';
import { AnkiService } from './AnkiService';

export class DeckService {
	private readonly _anki: AnkiService;
	private static instance: DeckService;
	constructor() {
		this._anki = new AnkiService();
	}

	public static getInstance(): DeckService {
		if (!DeckService.instance) {
			DeckService.instance = new DeckService();
		}
		return DeckService.instance;
	}

	async deckNames() {
		return await this._anki.invoke<AnkiDeckServiceCall<'deckNames'>>({
			action: 'deckNames',
			version: 6,
			params: undefined
		});
	}

	async deckNamesAndIds() {
		return await this._anki.invoke<AnkiDeckServiceCall<'deckNamesAndIds'>>({
			action: 'deckNamesAndIds',
			version: 6,
			params: undefined
		});
	}

	async getDecks(cards: AnkiDeckActionParams['getDecks']['cards']) {
		return await this._anki.invoke<AnkiDeckServiceCall<'getDecks'>>({
			action: 'getDecks',
			version: 6,
			params: { cards }
		});
	}

	async createDeck(deck: AnkiDeckActionParams['createDeck']['deck']) {
		return await this._anki.invoke<AnkiDeckServiceCall<'createDeck'>>({
			action: 'createDeck',
			version: 6,
			params: { deck }
		});
	}

	async changeDeck(
		cards: AnkiDeckActionParams['changeDeck']['cards'],
		deck: AnkiDeckActionParams['changeDeck']['deck']
	) {
		return await this._anki.invoke<AnkiDeckServiceCall<'changeDeck'>>({
			action: 'changeDeck',
			version: 6,
			params: { cards, deck }
		});
	}

	async deleteDecks(decks: AnkiDeckActionParams['deleteDecks']['decks']) {
		return await this._anki.invoke<AnkiDeckServiceCall<'deleteDecks'>>({
			action: 'deleteDecks',
			version: 6,
			params: { decks }
		});
	}

	async getDeckConfig(deck: AnkiDeckActionParams['getDeckConfig']['deck']) {
		return await this._anki.invoke<AnkiDeckServiceCall<'getDeckConfig'>>({
			action: 'getDeckConfig',
			version: 6,
			params: { deck }
		});
	}

	async saveDeckConfig(config: AnkiDeckActionParams['saveDeckConfig']['config']) {
		return await this._anki.invoke<AnkiDeckServiceCall<'saveDeckConfig'>>({
			action: 'saveDeckConfig',
			version: 6,
			params: { config }
		});
	}

	async setDeckConfigId(
		deck: AnkiDeckActionParams['setDeckConfigId']['deck'],
		configId: AnkiDeckActionParams['setDeckConfigId']['configId']
	) {
		return await this._anki.invoke<AnkiDeckServiceCall<'setDeckConfigId'>>({
			action: 'setDeckConfigId',
			version: 6,
			params: { deck, configId }
		});
	}

	async cloneDeckConfigId(
		name: AnkiDeckActionParams['cloneDeckConfigId']['name'],
		cloneFrom: AnkiDeckActionParams['cloneDeckConfigId']['cloneFrom']
	) {
		return await this._anki.invoke<AnkiDeckServiceCall<'cloneDeckConfigId'>>({
			action: 'cloneDeckConfigId',
			version: 6,
			params: { name, cloneFrom }
		});
	}

	async removeDeckConfigId(configId: AnkiDeckActionParams['removeDeckConfigId']['configId']) {
		return await this._anki.invoke<AnkiDeckServiceCall<'removeDeckConfigId'>>({
			action: 'removeDeckConfigId',
			version: 6,
			params: { configId }
		});
	}

	async getDeckStats(decks: AnkiDeckActionParams['getDeckStats']['decks']) {
		return await this._anki.invoke<AnkiDeckServiceCall<'getDeckStats'>>({
			action: 'getDeckStats',
			version: 6,
			params: { decks }
		});
	}
}
