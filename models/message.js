'use strict';
module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('Message', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // Définition des associtations entre les différents modeles
        models.Message.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  });
  return Message;
};