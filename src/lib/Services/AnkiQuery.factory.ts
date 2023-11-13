type AnkiQueryPart = {
    selector: string;
    param: string;
};

interface DeckQueryPart extends AnkiQueryPart {
    selector: 'deck';
    param: string;
}

interface CardQueryPart extends AnkiQueryPart {
    selector: 'card';
    param: string;
}

interface CardStateQueryPart extends AnkiQueryPart {
    selector: 'is';
    param: 'due' | 'new' | 'learn' | 'review' | 'suspended' | 'buried';
}

type ValidQueryPart = DeckQueryPart | CardQueryPart | CardStateQueryPart;
export class AnkiQueryFactory {
    private _query: ValidQueryPart[];

    constructor() {
        this._query = [];
    }

    public addDeckQuery(deckName: string): void {
        this._query.push({
            selector: 'deck',
            param: deckName
        });
    }

    public addCardQuery(cardId: string): void {
        this._query.push({
            selector: 'card',
            param: cardId
        });
    }

    public addCardStateQuery(state: CardStateQueryPart['param']): void {
        this._query.push({
            selector: 'is',
            param: state
        });
    }

    public build(): string {
        return this._query.map((part) => `"${part.selector}:${part.param}"`).join(' ');
    }
}