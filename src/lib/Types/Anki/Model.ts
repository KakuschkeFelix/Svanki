const AnkiModelActions = [
    'modelNames',
    'modelNamesAndIds',
    'modelFieldNames',
    'modelFieldDescriptions',
    'modelFieldFonts',
    'modelFieldsOnTemplates',
    'createModel',
    'modelTemplates',
    'modelStyling',
    'updateModelTemplates',
    'updateModelStyling',
    'findAndReplaceInModels',
    'modelTemplateRename',
    'modelTemplateReposition',
    'modelTemplateAdd',
    'modelTemplateRemove',
    'modelFieldRename',
    'modelFieldReposition',
    'modelFieldAdd',
    'modelFieldRemove',
    'modelFieldSetFont',
    'modelFieldSetFontSize',
    'modelFieldSetDescription',
] as const;

export type ModelDefinition = {
    modelName: string;
    inOrderFields: string[];
    css: string;
    isCloze: boolean;
    cardTemplates: { [fieldName: string]: string }[];
};

export type ModelInfo = {
    sortf: number;
    did: number;
    latexPre: string;
    latexPost: string;
    mod: number;
    usn: number;
    vers: any[];
    type: number;
    css: string;
    name: string;
    flds: {
        name: string;
        ord: number;
        sticky: boolean;
        rtl: boolean;
        font: string;
        size: number;
        media: any[];
    }[];
    tmpls: {
        name: string;
        ord: number;
        qfmt: string;
        afmt: string;
        did: null | number;
        bqfmt: string;
        bafmt: string;
    }[];
    tags: any[];
    id: number;
    req: [
        number,
        string,
        any[]
    ][];
};

export type AnkiModelAction = typeof AnkiModelActions[number];

export type AnkiModelActionParams = {
    modelNames: undefined;
    modelNamesAndIds: undefined;
    modelFieldNames: { modelName: string };
    modelFieldDescriptions: { modelName: string };
    modelFieldFonts: { modelName: string };
    modelFieldsOnTemplates: { modelName: string };
    createModel: ModelDefinition;
    modelTemplates: { modelName: string };
    modelStyling: { modelName: string };
    updateModelTemplates: { model: { name: string, templates: Record<string, { [fieldName: string]: string }> } };
    updateModelStyling: { model: { name: string, css: string } };
    findAndReplaceInModels: { modelName: string; findText: string; replaceText: string; front: boolean; back: boolean; css: boolean };
    modelTemplateRename: { modelName: string; oldTemplateName: string; newTemplateName: string };
    modelTemplateReposition: { modelName: string; templateName: string; index: number };
    modelTemplateAdd: { modelName: string; template: { [fieldName: string]: string } };
    modelTemplateRemove: { modelName: string; templateName: string };
    modelFieldRename: { modelName: string; oldFieldName: string; newFieldName: string };
    modelFieldReposition: { modelName: string; fieldName: string; index: number };
    modelFieldAdd: { modelName: string; fieldName: string; index: number };
    modelFieldRemove: { modelName: string; fieldName: string };
    modelFieldSetFont: { modelName: string; fieldName: string; fontName: string };
    modelFieldSetFontSize: { modelName: string; fieldName: string; fontSize: number };
    modelFieldSetDescription: { modelName: string; fieldName: string; description: string };
};

export type AnkiModelActionResult = {
    modelNames: string[];
    modelNamesAndIds: { [modelName: string]: number };
    modelFieldNames: string[];
    modelFieldDescriptions: string[];
    modelFieldFonts: { [fieldName: string]: { font: string, size: number } };
    modelFieldsOnTemplates: { [templateName: string]: [question: string[], answer: string[]] };
    createModel: ModelInfo;
    modelTemplates: { [templateName: string]: { [fieldName: string]: string } };
    modelStyling: { css: string };
    updateModelTemplates: null;
    updateModelStyling: null;
    findAndReplaceInModels: number;
    modelTemplateRename: null;
    modelTemplateReposition: null;
    modelTemplateAdd: null;
    modelTemplateRemove: null;
    modelFieldRename: null;
    modelFieldReposition: null;
    modelFieldAdd: null;
    modelFieldRemove: null;
    modelFieldSetFont: null;
    modelFieldSetFontSize: null;
    modelFieldSetDescription: boolean;
};

export type AnkiModelServiceCall<A extends AnkiModelAction> = {
    action: A;
    version: 6;
    params: AnkiModelActionParams[A];
    returnType: AnkiModelActionResult[A];
};
