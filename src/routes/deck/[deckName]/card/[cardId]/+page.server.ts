import { invalidate } from '$app/navigation';
import { Base64Service } from '$lib/Services/Base64.service';
import { CardService } from '$lib/Services/CardService';
import { error } from '@sveltejs/kit';
import { getDueCards, getNewCards } from '../../(queries)/queries';
import type { PageServerLoad } from './$types';
import { shuffleArray } from '$lib/helpers';
import { ModelService } from '$lib/Services/ModelService';
import sanitizeHtml from 'sanitize-html';
import type { AnkiModelActionResult } from '$lib/Types/Anki/Model';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { AnkiService } from '$lib/Services/AnkiService';

// Helper function to handle errors
function handleError<T>(result: { error: string | null; result: T }, errorMessage: string, resultValidator: (result: T) => boolean) {
    if (result.error || !resultValidator(result.result)) {
        throw error(500, errorMessage);
    }
}

// Helper function to sanitize models
const sanitizeModels = (modelTemplates: AnkiModelActionResult['modelTemplates']) => {
    return Object.entries(modelTemplates).reduce((acc, [template, fields]) => {
        acc[template] = Object.entries(fields).reduce((fieldAcc, [field, dirtyHtml]) => {
            fieldAcc[field] = sanitizeHtml(dirtyHtml, {
                allowedTags: ['b', 'i', 'u', 's', 'span', 'div', 'br', 'img', 'a'],
            });
            return fieldAcc;
        }, {} as Record<string, string>);
        return acc;
    }, {} as Record<string, Record<string, string>>);
};

const answerSchema = z.object({
    answer: z.number().gte(1).lte(4),
});

export type AnswerSchema = typeof answerSchema;

export const load = (async ({ params, parent }) => {
    const { currentDeck } = await parent();
    const cardService = CardService.getInstance();
    const modelService = ModelService.getInstance();
    const deckName = Base64Service.decode(params.deckName);

    // Fetch new and due cards
    const [newCards, dueCards] = await Promise.all([
        cardService.findCardsAndLimit(getNewCards(deckName), currentDeck.new_count),
        cardService.findCards(getDueCards(deckName)),
    ]);

    handleError(newCards, "Error fetching new cards", (result) => !!result?.length);
    handleError(dueCards, "Error fetching due cards", (result) => !!result?.length);

    const cards = shuffleArray([...newCards.result ?? [], ...dueCards.result ?? []]);
    cards.shift();

    // Fetch card info
    const card = await cardService.cardsInfo([Number(params.cardId)]);
    handleError(card, "Error fetching card", (result) => result?.length === 1);

    // Fetch model templates and fields
    const [modelTemplates, modelFields] = await Promise.all([
        modelService.modelTemplates(card.result![0].modelName),
        modelService.modelFieldsOnTemplates(card.result![0].modelName),
    ]);

    handleError(modelTemplates, "Error fetching model templates", (result) => !!result);
    handleError(modelFields, "Error fetching model fields", (result) => Object.values(result ?? [])?.every((field) => field.length));

    const sanitizedModels = sanitizeModels(modelTemplates.result!);

    return {
        card: card.result![0],
        nextCard: cards[0],
        models: sanitizedModels,
        answerForm: superValidate(answerSchema),
    };
}) satisfies PageServerLoad;