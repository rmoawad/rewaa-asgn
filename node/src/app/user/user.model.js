const { DataTypes } = require('sequelize');

function model(sequelize) {
    const attributes = {
        username: { type: DataTypes.STRING, allowNull: false },
        hashedPassword: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        defaultScope: {
            attributes: { exclude: ['hashedPassword'] }
        },
        scopes: {
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}

module.exports = model;
