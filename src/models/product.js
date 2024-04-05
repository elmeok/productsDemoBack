/* L’API Rest et la Base de données : Créer un modèle Sequelize */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Le code ne peut pas être vide.' },
        notNull: { msg: 'Le code est une propriété requise.'}
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Le nom est une propriété requise.'}
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Le prix est une propriété requise.'},
        min: {
          args: [0],
          msg: 'Les prix doit être supérieurs ou égales à 0.'
        },
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Le quantite est une propriété requise.'},
        min: {
          args: [0],
          msg: 'La quantité doit être supérieurs ou égales à 0.'
        },
      }
    },
    inventoryStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: {
          args: [0],
          msg: 'La notation doit être supérieurs ou égales à 0.'
        },
        // max: {
        //   args: [4],
        //   msg: 'La notation doit être inférieur à 5.'
        // },
      }
    },
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}