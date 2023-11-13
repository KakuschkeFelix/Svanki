import type { AnkiCardServiceCall, AnkiCardActionParams, CardInfo } from '$lib/Types/Anki/Card';
import { AnkiService } from './AnkiService';

export class CardService {
	private readonly _anki: AnkiService;
	private static instance: CardService;

	constructor(anki: AnkiService = new AnkiService()) {
		this._anki = anki;
	}

	public static getInstance(): CardService {
		if (!CardService.instance) {
			CardService.instance = new CardService();
		}
		return CardService.instance;
	}

	async cardsInfo(cards: AnkiCardActionParams['cardsInfo']['cards']) {
		return await this._anki.invoke<AnkiCardServiceCall<'cardsInfo'>>({
			action: 'cardsInfo',
			version: 6,
			params: { cards }
		});
	}

	async findCards(query: AnkiCardActionParams['findCards']['query']) {
		return await this._anki.invoke<AnkiCardServiceCall<'findCards'>>({
			action: 'findCards',
			version: 6,
			params: { query }
		});
	}

	async findCardsAndLimit(query: AnkiCardActionParams['findCards']['query'], limit: number) {
		return await this._anki.invoke<AnkiCardServiceCall<'findCards'>>({
			action: 'findCards',
			version: 6,
			params: { query }
		}).then((result) => {
			if (result.error) return result;
			if (!result.result) return result;
			return {
				error: null,
				result: result.result.slice(0, limit)
			}
		})
	}

	async cardsToNotes(cards: AnkiCardActionParams['cardsToNotes']['cards']) {
		return await this._anki.invoke<AnkiCardServiceCall<'cardsToNotes'>>({
			action: 'cardsToNotes',
			version: 6,
			params: { cards }
		});
	}

	async cardsModTime(cards: AnkiCardActionParams['cardsModTime']['cards']) {
		return await this._anki.invoke<AnkiCardServiceCall<'cardsModTime'>>({
			action: 'cardsModTime',
			version: 6,
			params: { cards }
		});
	}

	async areDue(cards: AnkiCardActionParams['areDue']['cards']) {
		return await this._anki.invoke<AnkiCardServiceCall<'areDue'>>({
			action: 'areDue',
			version: 6,
			params: { cards }
		});
	}

	async getIntervals(cards: AnkiCardActionParams['getIntervals']['cards']) {
		return await this._anki.invoke<AnkiCardServiceCall<'getIntervals'>>({
			action: 'getIntervals',
			version: 6,
			params: { cards }
		});
	}

	async areSuspended(cards: AnkiCardActionParams['areSuspended']['cards']) {
		return await this._anki.invoke<AnkiCardServiceCall<'areSuspended'>>({
			action: 'areSuspended',
			version: 6,
			params: { cards }
		});
	}

	async suspended(cards: AnkiCardActionParams['suspended']['cards']) {
		return await this._anki.invoke<AnkiCardServiceCall<'suspended'>>({
			action: 'suspended',
			version: 6,
			params: { cards }
		});
	}

	async suspend(cards: AnkiCardActionParams['suspend']['cards']) {
		return await this._anki.invoke<AnkiCardServiceCall<'suspend'>>({
			action: 'suspend',
			version: 6,
			params: { cards }
		});
	}

	async unsuspend(cards: AnkiCardActionParams['unsuspend']['cards']) {
		return await this._anki.invoke<AnkiCardServiceCall<'unsuspend'>>({
			action: 'unsuspend',
			version: 6,
			params: { cards }
		});
	}

	async setSpecificValueOfCard(
		card: AnkiCardActionParams['setSpecificValueOfCard']['card'],
		keys: AnkiCardActionParams['setSpecificValueOfCard']['keys'],
		newValues: AnkiCardActionParams['setSpecificValueOfCard']['newValues']
	) {
		return await this._anki.invoke<AnkiCardServiceCall<'setSpecificValueOfCard'>>({
			action: 'setSpecificValueOfCard',
			version: 6,
			params: { card, keys, newValues }
		});
	}

	async setEaseFactors(
		cards: AnkiCardActionParams['setEaseFactors']['cards'],
		easeFactors: AnkiCardActionParams['setEaseFactors']['easeFactors']
	) {
		return await this._anki.invoke<AnkiCardServiceCall<'setEaseFactors'>>({
			action: 'setEaseFactors',
			version: 6,
			params: { cards, easeFactors }
		});
	}

	async getEaseFactors(cards: AnkiCardActionParams['getEaseFactors']['cards']) {
		return await this._anki.invoke<AnkiCardServiceCall<'getEaseFactors'>>({
			action: 'getEaseFactors',
			version: 6,
			params: { cards }
		});
	}

	async forgetCards(cards: AnkiCardActionParams['forgetCards']['cards']) {
		return await this._anki.invoke<AnkiCardServiceCall<'forgetCards'>>({
			action: 'forgetCards',
			version: 6,
			params: { cards }
		});
	}

	async relearnCards(cards: AnkiCardActionParams['relearnCards']['cards']) {
		return await this._anki.invoke<AnkiCardServiceCall<'relearnCards'>>({
			action: 'relearnCards',
			version: 6,
			params: { cards }
		});
	}

	async answerCards(answers: AnkiCardActionParams['answerCards']['answers']) {
		return await this._anki.invoke<AnkiCardServiceCall<'answerCards'>>({
			action: 'answerCards',
			version: 6,
			params: { answers }
		});
	}

	public static hydrateCard(fields: CardInfo['fields'], template: string): string {
		return template.replace(/{{(.*?)}}/g, (_, key) => {
			const sanitizedKey = key.replace(/edit:/g, '').replace(/furigana:/g, '');
			let value = fields[sanitizedKey]?.value;
			if (sanitizedKey === 'FrontSide') return '';
			if (!value) return `{{${sanitizedKey}}}`;
			if (/furigana:/.test(key)) {
				value = this.addFurigana(value);
			}
			return value;
		});
	}

	private static addFurigana(input: string): string {
		return input.replace(/\s(.+?)\[(.+?)\]/g, (_, text, furigana) => {
			return `<ruby>${text}<rt>${furigana}</rt></ruby>`;
		});
	}
}
