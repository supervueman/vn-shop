const Model = require('../model');
const Context = require('../../../../../core/modules/context/model');
const User = require('../../../../../core/modules/user/model');
const Product = require('../../product/model');
const OrderStatus = require('../../orderstatus/model');
const OrderProduct = require('../model/OrderProduct');
const Delivery = require('../../delivery/model');

module.exports = () => {
  Model.belongsTo(Context, {
    as: 'context'
  });

  Model.belongsTo(User, {
    as: 'owner'
  });

  Model.belongsTo(User, {
    as: 'courier'
  });

  Model.belongsTo(User, {
    as: 'manager'
  });

  User.hasMany(Model, {
    as: 'orders',
    foreignKey: 'ownerId'
  });

  Model.belongsToMany(Product, {
    as: 'products',
    through: OrderProduct
  });

  Model.belongsTo(OrderStatus, {
    as: 'orderstatus'
  });

  Model.belongsTo(Delivery, {
    as: 'delivery'
  });
};
