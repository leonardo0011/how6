const { DataTypes } = require('sequelize');
const db = require('../db/conn');
const Produto = require('./Produto'); // Importando o modelo Produto

const Estoque = db.define('Estoque', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_prod: {
        type: DataTypes.INTEGER,
        references: {
            model: Produto, 
            key: 'id'      
        }
    },
    nome: {
        type: DataTypes.STRING,
    },
    descricao: {
        type: DataTypes.STRING, 
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2), 
    },
    quantidade: {
        type: DataTypes.INTEGER,
    },
    valor_estoque: {
        type: DataTypes.DECIMAL(10, 2), 
    }
}, {
    createdAt: false,
    updatedAt: false,
});


Estoque.beforeCreate(async (estoque, options) => {
    const produto = await Produto.findByPk(estoque.id_prod);
    if (produto) {
        estoque.nome = produto.nome;
        estoque.descricao = produto.descricao;
        estoque.preco = produto.preco;
        estoque.valor_estoque = estoque.quantidade * produto.preco;
    }
});

// Estoque.sync({force: true})

module.exports = Estoque;
