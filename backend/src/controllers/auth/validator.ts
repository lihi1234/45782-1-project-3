import Joi from "joi";
import { Role } from "../../models/User";

export const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

export const signupValidator = loginValidator.keys({
    firstName: Joi.string().min(2),
    lastName: Joi.string().min(2),
    role: Joi.string().valid(...Object.values(Role)).required()
})