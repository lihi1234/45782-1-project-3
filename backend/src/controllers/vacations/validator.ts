import Joi from "joi";

export const newVacationValidator = Joi.object({
    destination: Joi.string().min(4).required(),
    description: Joi.string().min(20).required(),
    startedAt: Joi.date().required(),
    endedAt: Joi.date().required(),
    price: Joi.number().min(1).required(),
    imageUrl: Joi.string().allow("", null)
})

export const updateVacationValidator = newVacationValidator

