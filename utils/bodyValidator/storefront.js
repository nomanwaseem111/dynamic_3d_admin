import Joi from "@hapi/joi";

const stroeFrontSchema = Joi.object({
    searchKeyword: Joi.string().required(),
    availabilityTest: Joi.string().required(),
    sortOrder: Joi.number().required(),
    templateLayout: Joi.string().required(),
    condition: Joi.string().required(),
    warrantyInformation: Joi.string().required(),
});

export const stroeFrontBodyValidate = (inputData) => {
    return stroeFrontSchema.validate(inputData);
};