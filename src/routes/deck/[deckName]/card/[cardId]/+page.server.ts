import { invalidate } from '$app/navigation';
import { Base64Service } from '$lib/Services/Base64.service';
import { CardService } from '$lib/Services/CardService';
import { error } from '@sveltejs/kit';
import { getDueCards, getNewCards } from '../../(queries)/queries';
import type { PageServerLoad } from './$types';
import { shuffleArray } from '$lib/helpers';
import { ModelService } from '$lib/Services/ModelService';
import sanitizeHtml from 'sanitize-html';

export const load = (async ({ params, parent }) => {
    const { currentDeck } = await parent();
    const cardService = CardService.getInstance();
    const modelService = ModelService.getInstance();
    const deckName = Base64Service.decode(params.deckName);

    const [newCards, dueCards] = await Promise.all([
        cardService.findCardsAndLimit(getNewCards(deckName), currentDeck.new_count),
        cardService.findCards(getDueCards(deckName)),
    ]);

    if (newCards.error || !newCards.result?.length) {
        throw error(500, "Error fetching new cards");
    }

    if (dueCards.error || !dueCards.result?.length) {
        throw error(500, "Error fetching due cards");
    }

    const cards = shuffleArray([...newCards.result, ...dueCards.result]);
    cards.shift();

    const card = await cardService.cardsInfo([Number(params.cardId)]);
    if (card.error || card.result?.length !== 1) {
        throw error(500, "Error fetching card");
    }

    const [modelTemplates, modelFields] = await Promise.all([
        modelService.modelTemplates(card.result[0].modelName),
        modelService.modelFieldsOnTemplates(card.result[0].modelName),
    ]);
    if (modelTemplates.error || !modelTemplates.result) {
        console.error(modelTemplates);
        throw error(500, "Error fetching model templates");
    }

    if (modelFields.error || !Object.values(modelFields.result ?? [])?.every((field) => field.length)) {
        console.error(modelFields);
        throw error(500, "Error fetching model fields");
    }

    const sanitizedModels = Object.entries(modelTemplates.result).reduce((acc, [template, fields]) => {
        acc[template] = Object.entries(fields).reduce((fieldAcc, [field, dirtyHtml]) => {
            fieldAcc[field] = sanitizeHtml(dirtyHtml);
            return fieldAcc;
        }, {} as Record<string, string>);
        return acc;
    }, {} as Record<string, Record<string, string>>);

    return {
        card: card.result[0],
        nextCard: cards[0],
        models: sanitizedModels,
        question: modelFields.result ? Object.entries(modelFields.result).reduce((acc, [templateName, [[question]]]) => {
            acc[templateName] = question;
            return acc;
        }, {} as Record<string, string>) : {},

        answer: modelFields.result ? Object.entries(modelFields.result).reduce((acc, [templateName, [, [answer]]]) => {
            acc[templateName] = answer;
            return acc;
        }, {} as Record<string, string>) : {},
    };
}) satisfies PageServerLoad;