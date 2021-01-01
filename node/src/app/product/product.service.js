const db = require('../database/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: remove
};

async function getAll() {
    return await db.Product.findAll();
}

async function getById(id) {
    return await getProduct(id);
}

async function validateNameNotTaken(name) {
    if (await db.Product.findOne({ where: { name } })) {
        throw 'Product with name "' + name + '" is already exist';
    }
}

async function create(params) {
    await validateNameNotTaken(params.name);
    // save product
    return await db.Product.create(params);
}

async function update(id, params) {
    const product = await getProduct(id);

    // validate
    const productNameChanged = params.name && product.name !== params.name;
    if (productNameChanged) {
        await validateNameNotTaken(params.name);
    }

    // copy params to product and save
    Object.assign(product, params);
    await product.save();

    return product.get();
}

async function remove(id) {
    const product = await getProduct(id);
    await product.destroy();
}

// helper functions

async function getProduct(id) {
    const product = await db.Product.findByPk(id);
    if (!product) {
        throw 'Product not found';
    }
    return product;
}
