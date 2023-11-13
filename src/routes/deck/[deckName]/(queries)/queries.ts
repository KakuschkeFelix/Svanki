import { AnkiQueryFactory } from "$lib/Services/AnkiQuery.factory";

export function getDueCards(deckName: string) {
    const factory = new AnkiQueryFactory();
    factory.addDeckQuery(deckName);
    factory.addCardStateQuery('due');
    return factory.build();
}

export function getNewCards(deckName: string) {
    const factory = new AnkiQueryFactory();
    factory.addDeckQuery(deckName);
    factory.addCardStateQuery('new');
    return factory.build();
}

export function getLearnCards(deckName: string) {
    const factory = new AnkiQueryFactory();
    factory.addDeckQuery(deckName);
    factory.addCardStateQuery('learn');
    return factory.build();
}