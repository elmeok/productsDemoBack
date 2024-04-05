const { Product } = require('../db/sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.delete('/api/products/:id', (req, res) => {
    Product.findByPk(req.params.id)
    .then(product => {
        if(product === null) {
            const message = `Le locataire demandé n'existe pas. Réessayez avec un autre identifiant.`
            return res.status(404).json({ message })
        }
      const productDeleted = product;
      return Product.destroy({where: { id: product.id }})
      .then(_ => {
        const message = `Le locataire avec l'identifiant n°${productDeleted.id} a bien été supprimé.`
        res.json({message, data: productDeleted })
      })
    })
    .catch(error => {
    const message = `Le locataire n'a pas pu être supprimé. Réessayez dans quelques instants.`
    res.status(500).json({ message, data: error })
    })
  })
}