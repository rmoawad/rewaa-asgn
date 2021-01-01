const express = require('express');
const router = express.Router();
const { validateProductJson } = require('../validation/product.validation');
const authorize = require('../auth/authorize')
const productService = require('./product.service');

// routes
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(), validateProductJson, create);
router.put('/:id', authorize(), validateProductJson, update);
router.delete('/:id', authorize(), remove);

function getAll(req, res, next) {
    productService.getAll()
        .then(products => res.json(products))
        .catch(next);
}

function getById(req, res, next) {
    productService.getById(req.params.id)
        .then(product => res.json(product))
        .catch(next);
}

function create(req, res, next) {
    productService.create(req.body)
        .then(product => res.json(product))
        .catch(next);
}

function update(req, res, next) {
    productService.update(req.params.id, req.body)
        .then(product => res.json(product))
        .catch(next);
}

function remove(req, res, next) {
    productService.delete(req.params.id)
        .then(() => res.json({ message: 'Product Is Deleted Successfully' }))
        .catch(next);
}

module.exports = router;
