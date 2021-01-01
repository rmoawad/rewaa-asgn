const Joi = require('joi');
const validateRequest = require('../validation/validate-request');

function validateAuthentication(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function validateRegistration(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().min(6).required()
    });
    validateRequest(req, next, schema);
}

module.exports = { validateAuthentication, validateRegistration };
