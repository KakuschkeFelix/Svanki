import type { AnkiCardAction } from './Card';
import type { AnkiDeckAction } from './Deck';
import type { AnkiModelAction } from './Model';

export type AnkiAction = AnkiCardAction | AnkiDeckAction | AnkiModelAction;
