const db = require('./conn');
const Produto = require('../models/Produto');
const Estoque = require('../models/Estoque');

const syncDatabase = async () => {
    try {
        // Sincronize o modelo Produto primeiro
        await Produto.sync({ force: true });
        console.log('Tabela Produto criada com sucesso!');
        
        // Sincronize o modelo Estoque depois
        await Estoque.sync({ force: true });
        console.log('Tabela Estoque criada com sucesso!');
        
        // Inicie o servidor após as tabelas serem criadas
        const app = require('../server');
        const hostname = 'localhost';
        const PORT = 3333;
        
        app.listen(PORT, hostname, () => {
            console.log(`Servidor Rodando em ${hostname}:${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao sincronizar as tabelas:', error);
    }
};

syncDatabase();
