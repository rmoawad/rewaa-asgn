const express = require('express');
const router = express.Router();
const { validateAuthentication, validateRegistration } = require('../validation/user.validation');
const userService = require('./user.service');

// routes
router.post('/authenticate', validateAuthentication, authenticate);
router.post('/register', validateRegistration, register);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}
