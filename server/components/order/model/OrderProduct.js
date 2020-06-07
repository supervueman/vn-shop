const Sequelize = require('sequelize');
const sequelize = require('../../../../../core/db');

const Model = sequelize.define('OrderProduct', {
  quantity: {
    type: Sequelize.INTEGER
  },
  modificators: {
    type: Sequelize.TEXT
  }
});

module.exports = Model;
