const { User } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (app) => {

    app.use('/api/users', function (req, res, next) {
        bcrypt.hash(req.body.password,10)
        .then(hash =>  {
            req.body.password = hash
            next();
        })
        
    });

  app.post('/api/users',  (req, res) => {
    User.create(req.body)
      .then(user => {
        const message = `L'utilisateur' ${req.body.username} a bien été crée.`
        res.json({ message, data: user })
      })
      .catch(error => {
        if(error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if(error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: 'error.message', data: error });
        }
        const message = `Le locataire n'a pas pu être ajouté. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}