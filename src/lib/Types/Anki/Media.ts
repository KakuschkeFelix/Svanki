const AnkiMediaActions = [
    'retrieveMediaFile',
] as const;

export type AnkiMediaAction = typeof AnkiMediaActions[number];

export type AnkiMediaActionParams = {
    retrieveMediaFile: { filename: string };
};

export type AnkiMediaActionResult = {
    retrieveMediaFile: string;
};

export type AnkiMediaServiceCall<A extends AnkiMediaAction> = {
    action: A;
    version: 6;
    params: AnkiMediaActionParams[A];
    returnType: AnkiMediaActionResult[A];
};
