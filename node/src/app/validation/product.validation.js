const Joi = require('joi');
const validateRequest = require('../validation/validate-request');

function validateProductJson(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        price: Joi.number().positive().required(),
        stockSize: Joi.number().precision(0).positive().required(),
        description: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

module.exports = { validateProductJson };
