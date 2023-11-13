import type { AnkiModelServiceCall, AnkiModelActionParams } from '$lib/Types/Anki/Model';
import { AnkiService } from './AnkiService';

export class ModelService {
    private readonly _anki: AnkiService;
    private static instance: ModelService;

    constructor(anki: AnkiService = new AnkiService()) {
        this._anki = anki;
    }

    public static getInstance(): ModelService {
        if (!ModelService.instance) {
            ModelService.instance = new ModelService();
        }
        return ModelService.instance;
    }

    async modelNames() {
        return this._anki.invoke<AnkiModelServiceCall<'modelNames'>>({
            action: 'modelNames',
            version: 6,
            params: undefined,
        })
    }

    async modelNamesAndIds() {
        return this._anki.invoke<AnkiModelServiceCall<'modelNamesAndIds'>>({
            action: 'modelNamesAndIds',
            version: 6,
            params: undefined,
        })
    }

    async modelFieldNames(modelName: AnkiModelActionParams['modelFieldNames']['modelName']) {
        return this._anki.invoke<AnkiModelServiceCall<'modelFieldNames'>>({
            action: 'modelFieldNames',
            version: 6,
            params: { modelName },
        })
    }

    async modelFieldDescriptions(modelName: AnkiModelActionParams['modelFieldDescriptions']['modelName']) {
        return this._anki.invoke<AnkiModelServiceCall<'modelFieldDescriptions'>>({
            action: 'modelFieldDescriptions',
            version: 6,
            params: { modelName },
        })
    }

    async modelFieldFonts(modelName: AnkiModelActionParams['modelFieldFonts']['modelName']) {
        return this._anki.invoke<AnkiModelServiceCall<'modelFieldFonts'>>({
            action: 'modelFieldFonts',
            version: 6,
            params: { modelName },
        })
    }

    async modelFieldsOnTemplates(modelName: AnkiModelActionParams['modelFieldsOnTemplates']['modelName']) {
        return this._anki.invoke<AnkiModelServiceCall<'modelFieldsOnTemplates'>>({
            action: 'modelFieldsOnTemplates',
            version: 6,
            params: { modelName },
        })
    }

    async createModel(model: AnkiModelActionParams['createModel']) {
        return this._anki.invoke<AnkiModelServiceCall<'createModel'>>({
            action: 'createModel',
            version: 6,
            params: model,
        })
    }

    async modelTemplates(modelName: AnkiModelActionParams['modelTemplates']['modelName']) {
        return this._anki.invoke<AnkiModelServiceCall<'modelTemplates'>>({
            action: 'modelTemplates',
            version: 6,
            params: { modelName },
        })
    }

    async modelStyling(modelName: AnkiModelActionParams['modelStyling']['modelName']) {
        return this._anki.invoke<AnkiModelServiceCall<'modelStyling'>>({
            action: 'modelStyling',
            version: 6,
            params: { modelName },
        })
    }

    async updateModelTemplates(model: AnkiModelActionParams['updateModelTemplates']['model']) {
        return this._anki.invoke<AnkiModelServiceCall<'updateModelTemplates'>>({
            action: 'updateModelTemplates',
            version: 6,
            params: { model },
        })
    }

    async updateModelStyling(model: AnkiModelActionParams['updateModelStyling']['model']) {
        return this._anki.invoke<AnkiModelServiceCall<'updateModelStyling'>>({
            action: 'updateModelStyling',
            version: 6,
            params: { model },
        })
    }

    async findAndReplaceInModels(modelName: AnkiModelActionParams['findAndReplaceInModels']['modelName'], findText: AnkiModelActionParams['findAndReplaceInModels']['findText'], replaceText: AnkiModelActionParams['findAndReplaceInModels']['replaceText'], front: AnkiModelActionParams['findAndReplaceInModels']['front'], back: AnkiModelActionParams['findAndReplaceInModels']['back'], css: AnkiModelActionParams['findAndReplaceInModels']['css']) {
        return this._anki.invoke<AnkiModelServiceCall<'findAndReplaceInModels'>>({
            action: 'findAndReplaceInModels',
            version: 6,
            params: { modelName, findText, replaceText, front, back, css },
        })
    }

    async modelTemplateRename(modelName: AnkiModelActionParams['modelTemplateRename']['modelName'], oldTemplateName: AnkiModelActionParams['modelTemplateRename']['oldTemplateName'], newTemplateName: AnkiModelActionParams['modelTemplateRename']['newTemplateName']) {
        return this._anki.invoke<AnkiModelServiceCall<'modelTemplateRename'>>({
            action: 'modelTemplateRename',
            version: 6,
            params: { modelName, oldTemplateName, newTemplateName },
        })
    }

    async modelTemplateReposition(modelName: AnkiModelActionParams['modelTemplateReposition']['modelName'], templateName: AnkiModelActionParams['modelTemplateReposition']['templateName'], index: AnkiModelActionParams['modelTemplateReposition']['index']) {
        return this._anki.invoke<AnkiModelServiceCall<'modelTemplateReposition'>>({
            action: 'modelTemplateReposition',
            version: 6,
            params: { modelName, templateName, index },
        })
    }

    async modelTemplateAdd(modelName: AnkiModelActionParams['modelTemplateAdd']['modelName'], template: AnkiModelActionParams['modelTemplateAdd']['template']) {
        return this._anki.invoke<AnkiModelServiceCall<'modelTemplateAdd'>>({
            action: 'modelTemplateAdd',
            version: 6,
            params: { modelName, template },
        })
    }

    async modelTemplateRemove(modelName: AnkiModelActionParams['modelTemplateRemove']['modelName'], templateName: AnkiModelActionParams['modelTemplateRemove']['templateName']) {
        return this._anki.invoke<AnkiModelServiceCall<'modelTemplateRemove'>>({
            action: 'modelTemplateRemove',
            version: 6,
            params: { modelName, templateName },
        })
    }

    async modelFieldRename(modelName: AnkiModelActionParams['modelFieldRename']['modelName'], oldFieldName: AnkiModelActionParams['modelFieldRename']['oldFieldName'], newFieldName: AnkiModelActionParams['modelFieldRename']['newFieldName']) {
        return this._anki.invoke<AnkiModelServiceCall<'modelFieldRename'>>({
            action: 'modelFieldRename',
            version: 6,
            params: { modelName, oldFieldName, newFieldName },
        })
    }

    async modelFieldReposition(modelName: AnkiModelActionParams['modelFieldReposition']['modelName'], fieldName: AnkiModelActionParams['modelFieldReposition']['fieldName'], index: AnkiModelActionParams['modelFieldReposition']['index']) {
        return this._anki.invoke<AnkiModelServiceCall<'modelFieldReposition'>>({
            action: 'modelFieldReposition',
            version: 6,
            params: { modelName, fieldName, index },
        })
    }

    async modelFieldAdd(modelName: AnkiModelActionParams['modelFieldAdd']['modelName'], fieldName: AnkiModelActionParams['modelFieldAdd']['fieldName'], index: AnkiModelActionParams['modelFieldAdd']['index']) {
        return this._anki.invoke<AnkiModelServiceCall<'modelFieldAdd'>>({
            action: 'modelFieldAdd',
            version: 6,
            params: { modelName, fieldName, index },
        })
    }

    async modelFieldRemove(modelName: AnkiModelActionParams['modelFieldRemove']['modelName'], fieldName: AnkiModelActionParams['modelFieldRemove']['fieldName']) {
        return this._anki.invoke<AnkiModelServiceCall<'modelFieldRemove'>>({
            action: 'modelFieldRemove',
            version: 6,
            params: { modelName, fieldName },
        })
    }

    async modelFieldSetFont(modelName: AnkiModelActionParams['modelFieldSetFont']['modelName'], fieldName: AnkiModelActionParams['modelFieldSetFont']['fieldName'], fontName: AnkiModelActionParams['modelFieldSetFont']['fontName']) {
        return this._anki.invoke<AnkiModelServiceCall<'modelFieldSetFont'>>({
            action: 'modelFieldSetFont',
            version: 6,
            params: { modelName, fieldName, fontName },
        })
    }

    async modelFieldSetFontSize(modelName: AnkiModelActionParams['modelFieldSetFontSize']['modelName'], fieldName: AnkiModelActionParams['modelFieldSetFontSize']['fieldName'], fontSize: AnkiModelActionParams['modelFieldSetFontSize']['fontSize']) {
        return this._anki.invoke<AnkiModelServiceCall<'modelFieldSetFontSize'>>({
            action: 'modelFieldSetFontSize',
            version: 6,
            params: { modelName, fieldName, fontSize },
        })
    }

    async modelFieldSetDescription(modelName: AnkiModelActionParams['modelFieldSetDescription']['modelName'], fieldName: AnkiModelActionParams['modelFieldSetDescription']['fieldName'], description: AnkiModelActionParams['modelFieldSetDescription']['description']) {
        return this._anki.invoke<AnkiModelServiceCall<'modelFieldSetDescription'>>({
            action: 'modelFieldSetDescription',
            version: 6,
            params: { modelName, fieldName, description },
        })
    }

}
