const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Produto = db.define('Produto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
    },
}, {
    createdAt: false,
    updatedAt: false,
});

// Produto.sync({force: true})

module.exports = Produto;
