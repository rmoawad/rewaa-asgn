const { DataTypes } = require('sequelize');

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false, size: 255 },
        stockSize: { type: DataTypes.INTEGER, allowNull: false },
        price: { type: DataTypes.DECIMAL(10,2), allowNull: false, min: 0 },
        description: { type: DataTypes.TEXT, allowNull: true },
    };

    return sequelize.define('Product', attributes);
}

module.exports = model;
