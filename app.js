const express = require("express")
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
const cors = require("cors")


const app = express()
const port = process.env.PORT || 3000


app
    .use(bodyParser.json())
    .use(cors())

sequelize.initDb()

app.get('/',(req,res) => {
  res.json("hello, Heroku")
})

require('./src/routes/findAllProducts')(app)
require('./src/routes/findProductByPk')(app)
require('./src/routes/createProduct')(app)
require('./src/routes/updateProduct')(app)
require('./src/routes/deleteProduct')(app)
require('./src/routes/login')(app)
require('./src/routes/createUser')(app)

app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
      res.status(404).json({message});
  });




app.listen(port, () => console.log(`notre application Node est démarrée sur http:/localhost:${port}`))