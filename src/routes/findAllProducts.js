const { Product } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.get('/api/products', (req, res) => {
    if(req.query.name) {
        const name = req.query.name
        return Product.findAll({ where : {name : name}})
        .then(products => {
           const message = `Il y a ${products.length} qui correspondent au terme de recherche ${name}.`
           res.json({ message, data: products})
        })
    } 
    else {
        Product.findAll()
        .then(products => {
        const message = 'La liste des produits a bien été récupérée.'
        res.json({ message, data: products })
    })
    .catch(error => {
    const message = `La liste des produit n'a pas pu être récupéré. 
                        Réessayez dans quelques instants.`
    res.status(500).json({ message, data: error })
    })
    }
  })
}