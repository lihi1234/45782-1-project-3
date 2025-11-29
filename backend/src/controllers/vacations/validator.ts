import Joi from "joi";

export const newVacationValidator = Joi.object({
    // destination: Joi.string().min(4).required(),
    // description: Joi.string().min(10).required(),
    // startedAt: Joi.date().required(),
    // endedAt: Joi.date().required(),
    // price: Joi.number().min(1).required(),
    // imageUrl: Joi.string().allow("", null)
})

export const updateVacationValidator = newVacationValidator

export const newPostImageValidator = Joi.object({
    image: Joi.object({
        mimetype: Joi.string().valid('image/jpeg', 'image/png')
    }).unknown(true).optional()
})

