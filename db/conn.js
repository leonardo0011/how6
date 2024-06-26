const Sequelize = require('sequelize')
const sequelize = new Sequelize('stockjam', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql'
})

//  sequelize.authenticate().then(()=>{
//     console.log('Conexão com com Banco de Dados Realizada!')
//  }).catch((err)=>{
//      console.log('Erro de conexão com o Banco de Dados')
// })

module.exports = sequelize