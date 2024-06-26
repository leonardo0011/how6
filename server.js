const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const Produtos = require('./models/Produto')
const Estoques = require('./models/Estoque')

const hostname = 'localhost'
const PORT = 3333

// configuração do express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// configuração do express-handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// configuração dos arquivos estáticos
app.use(express.static('public'));

/* ---------------------------------------- */



app.post('/cad_estoque', async (req, res) => {
    const id_prod       = req.body.id_prod
    const quantidade    = req.body.quantidade

    console.log(id_prod,quantidade)
    await Estoques.create({id_prod,quantidade})
    res.render('home')
});

app.get('/cad_estoque', (req,res) => {
    res.render('cad_estoque')
})


app.post('/cad_produto', async (req, res) => {
    const nome          = req.body.nome
    const descricao     = req.body.descricao
    const preco         = req.body.preco

    console.log(nome,descricao,preco)
    await Produtos.create({nome,descricao,preco})
    res.render('home')
});

app.get('/cad_produto', (req, res) => {
    res.render('cad_produto')
});

app.get('/alt_estoque', (req, res) => {
    res.render('alt_estoque')
});

app.post('/alt_estoque', async (req,res)=>{
    const id = req.body.EDid
    const quantidade = req.body.EDquantidade
    const valor_novo = req.body.EDvalor_estoque * quantidade

    const userData = {
        id: id,
        quantidade: quantidade,
        valor_estoque: valor_novo
    }

    await Estoques.update(userData, {where: {id: id}})
    res.render('alt_estoque')
})

app.get('/estoque', async (req,res)=>{
    const dados = await Estoques.findAll({raw: true})
    console.log(dados)
    res.render('estoque', {dado: dados})
}) 

app.get('/', (req, res) => {
    res.render('home');
});

module.exports = app;


/* ---------------------------------------- */
conn.sync().then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor Rodando em ${hostname}:${PORT}`)
    })
}).catch((err)=>{
    console.log('Erro de comunicação!'+err)
})