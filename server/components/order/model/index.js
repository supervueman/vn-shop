const Sequelize = require('sequelize');
const sequelize = require('../../../../../core/db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - id
 *         - order_num
 *         - summ
 *         - comment
 *         - delivery_info
 *       properties:
 *         id:
 *           type: string
 *         order_num:
 *           type: string
 *         summ:
 *           type: number
 *         comment:
 *           type: string
 *         delivery_info:
 *           type: string
 *           description: JSON format
 *         contextId:
 *           type: string
 *           description: Context id. Association name context.
 *         ownerId:
 *           type: string
 *           description: User id. Association name owner.
 *         courierId:
 *           type: string
 *           description: User id. Association name courier.
 *         orderstatusId:
 *           type: string
 *           description: Order status id. Association name orderstatus.
 *         deliveryId:
 *           type: string
 *           description: Delivery id. Association name delivery.
 *         products:
 *           type: array
 *           description: Association name products.
 *       example:
 *         id: 1
 *         order_num: VN-123/12
 *         summ: 2500
 *         comment: Comment
 *         delivery_info: '{"phone":{"title":"Телефон","value":"123456"}}'
 *         products: '[{"id": 1, "slug": "product-1", "title": "Product 1", "article": "123456", "price": 2500, "weight": 0, "count": 12, "size": "m", "popular": false, "new": true, "in_stock": false, "published": true, "level": 4, "lang": "ru", "menuindex": 4, "contextId": 2, "parentId": 5, "layoutId": 8, "resourcetypeId": 2, "OrderProduct": {"quantity": 1, "orderId": 6, "productId": 6 }}]'
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     OrderCreate:
 *       type: object
 *       required:
 *         - comment
 *         - delivery_info
 *       properties:
 *         comment:
 *           type: string
 *         delivery_info:
 *           type: string
 *           description: JSON format
 *         contextId:
 *           type: string
 *           description: Context id. Association name context.
 *         ownerId:
 *           type: string
 *           description: User id. Association name owner.
 *         courierId:
 *           type: string
 *           description: User id. Association name courier.
 *         orderstatusId:
 *           type: string
 *           description: Order status id. Association name orderstatus.
 *         deliveryId:
 *           type: string
 *           description: Delivery id. Association name delivery.
 *         products:
 *           type: array
 *           description: Association name products
 *       example:
 *         comment: Comment
 *         delivery_info:
 *         contextId: 1
 *         ownerId: 1
 *         courierId: 1
 *         orderstatusId: 1
 *         deliveryId: 1
 *         products: '[{id: 1, quantity: 1}]'
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     OrderUpdate:
 *       type: object
 *       required:
 *         - comment
 *         - delivery_info
 *       properties:
 *         comment:
 *           type: string
 *         delivery_info:
 *           type: string
 *           description: JSON format
 *         contextId:
 *           type: string
 *           description: Context id. Association name context.
 *         ownerId:
 *           type: string
 *           description: User id. Association name owner.
 *         courierId:
 *           type: string
 *           description: User id. Association name courier.
 *         orderstatusId:
 *           type: string
 *           description: Order status id. Association name orderstatus.
 *         deliveryId:
 *           type: string
 *           description: Delivery id. Association name delivery.
 *         products:
 *           type: array
 *           description: Association name products
 *       example:
 *         comment: Comment
 *         delivery_info:
 *         contextId: 1
 *         ownerId: 1
 *         courierId: 1
 *         orderstatusId: 1
 *         deliveryId: 1
 *         products: '[{id: 1, quantity: 2}]'
 */
const Model = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  order_num: {
    type: Sequelize.STRING
  },
  summ: {
    type: Sequelize.INTEGER
  },
  comment: {
    type: Sequelize.STRING(1000)
  },
  delivery_info: {
    type: Sequelize.TEXT
  },
  modificators: {
    type: Sequelize.TEXT
  }
});

Model.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  if (values.owner) {
    delete values.owner.dataValues.password;
  }

  if (values.courier) {
    delete values.courier.dataValues.password;
  }

  return values;
};

module.exports = Model;
