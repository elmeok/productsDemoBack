/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const ProductModel = require('../models/product')
const UserModel = require('../models/user')
const products = require('./mock-product')


const sequelize = new Sequelize('vendordb', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: true
})
  
const Product = ProductModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
  
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    products.map(product => {
      Product.create({
        code: product.code,
        name: product.name,
        description: product.description,
        image:product.image,
        category: product.category,
        quantity: product.quantity,
        inventoryStatus: product.inventoryStatus,
        rating:product.rating,
        price:product.price
      }).then(product => console.log(product.toJSON()))
    })

    bcrypt.hash('florian',10)
    .then(hash =>   User.create({
        username: "florian",
        password : hash
    }))
    .then(user => console.log(user.toJSON()))
    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, Product, User
}