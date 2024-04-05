const { Product } = require('../db/sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.get('/api/products/:id', (req, res) => {
    Product.findByPk(req.params.id)
      .then(product => {
        if(product === null) {
            const message = `Le produit demandé n'existe pas. Réessayez avec un autre identifiant.`
            return res.status(404).json({ message })
        }
        const message = 'Un produit a bien été trouvé.'
        res.json({ message, data: product })
      })
      .catch(error => {
        const message = `Le produit n'a pas pu être récupéré. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}