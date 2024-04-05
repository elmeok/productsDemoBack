const { Product } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth')  


module.exports = (app) => {
  app.post('/api/products', (req, res) => {
    Product.create(req.body)
      .then(product => {
        const message = `Le produit ${req.body.name} a bien été crée.`
        res.json({ message, data: product })
      })
      .catch(error => {
        if(error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if(error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: 'error.message', data: error });
        }
        const message = `Le produit n'a pas pu être ajouté. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}