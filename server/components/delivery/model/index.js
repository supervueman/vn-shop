const Sequelize = require('sequelize');
const sequelize = require('../../../../../core/db');


/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Delivery:
 *       type: object
 *       required:
 *         - slug
 *         - title
 *         - cost
 *         - schema
 *       properties:
 *         id:
 *           type: string
 *           description: Id for the layout, needs to be unique.
 *         slug:
 *           type: string
 *           description: Slug for the layout, needs to be unique.
 *         title:
 *           type: string
 *         cost:
 *           type: number
 *         country:
 *           type: string
 *         city:
 *           type: string
 *         region:
 *           type: string
 *         district:
 *           type: string
 *         street:
 *           type: string
 *         house:
 *           type: string
 *         apartment:
 *           type: string
 *         fullAddress:
 *           type: string
 *         schema:
 *           type: string
 *           description: JSON format
 *         contextId:
 *           type: object
 *           description: Association name context
 *       example:
 *         id: 1
 *         slug: smr-delivery
 *         title: Delivery by Samara
 *         cost: 100
 *         country: Russia
 *         city: Samara
 *         region: Samarskaya oblast
 *         district: Samarsky
 *         street: Samarskaya
 *         house: 10
 *         apartment: 23
 *         schema: '{"phone": {"title": "Phone"}}'
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     DeliveryCreate:
 *       type: object
 *       required:
 *         - slug
 *         - title
 *         - cost
 *         - schema
 *       properties:
 *         slug:
 *           type: string
 *           description: Slug for the layout, needs to be unique.
 *         title:
 *           type: string
 *         cost:
 *           type: string
 *         schema:
 *           type: string
 *           description: JSON format
 *       example:
 *         slug: smr-delivery
 *         title: Delivery by Samara
 *         cost: 100
 *         schema: '{"phone": {"title": "Phone"}}'
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     DeliveryUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         cost:
 *           type: number
 *       example:
 *         title: msk-delivery
 *         cost: 200
 */
const Model = sequelize.define('delivery', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  slug: {
    type: Sequelize.STRING,
    unique: true,
    notEmpty: true
  },
  title: {
    type: Sequelize.STRING
  },
  cost: {
    type: Sequelize.INTEGER
  },
  country: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  region: {
    type: Sequelize.STRING
  },
  district: {
    type: Sequelize.STRING
  },
  street: {
    type: Sequelize.STRING
  },
  house: {
    type: Sequelize.STRING
  },
  apartment: {
    type: Sequelize.STRING
  },
  fullAddress: {
    type: Sequelize.STRING
  },
  schema: {
    type: Sequelize.TEXT,
    allowNull: false
  },
});

Model.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  if (values.manager) {
    delete values.manager.dataValues.password;
  }

  return values;
};

module.exports = Model;
