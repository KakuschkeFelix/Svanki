import type { AnkiMediaActionParams, AnkiMediaServiceCall } from '$lib/Types/Anki/Media';
import { AnkiService } from './AnkiService';

export class MediaService {
    private readonly _anki: AnkiService;
    private static instance: MediaService;

    constructor(anki: AnkiService = new AnkiService()) {
        this._anki = anki;
    }

    public static getInstance(): MediaService {
        if (!MediaService.instance) {
            MediaService.instance = new MediaService();
        }
        return MediaService.instance;
    }

    async retrieveMediaFile(filename: AnkiMediaActionParams['retrieveMediaFile']['filename']) {
        return this._anki.invoke<AnkiMediaServiceCall<'retrieveMediaFile'>>({
            action: 'retrieveMediaFile',
            version: 6,
            params: { filename },
        })
    }
}
