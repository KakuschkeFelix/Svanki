import type { AnkiCardAction } from './Card';
import type { AnkiDeckAction } from './Deck';
import type { AnkiMediaAction } from './Media';
import type { AnkiModelAction } from './Model';

export type AnkiAction = AnkiCardAction | AnkiDeckAction | AnkiModelAction | AnkiMediaAction;
