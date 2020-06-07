const Sequelize = require('sequelize');
const sequelize = require('../../../../../core/db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     OrderModificator:
 *       type: object
 *       required:
 *         - id
 *         - slug
 *         - target
 *         - operator
 *         - title
 *       properties:
 *         id:
 *           type: string
 *         slug:
 *           type: string
 *         target:
 *           type: number
 *         operator:
 *           type: string
 *         title:
 *           type: string
 *       example:
 *         id: 1
 *         slug: bonus
 *         target: cart-price
 *         operator: minus
 *         title: Bonus system
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     OrderModificatorCreate:
 *       type: object
 *       required:
 *         - id
 *         - slug
 *         - target
 *         - operator
 *         - title
 *       properties:
 *         id:
 *           type: string
 *         slug:
 *           type: string
 *         target:
 *           type: number
 *         operator:
 *           type: string
 *         title:
 *           type: string
 *       example:
 *         id: 1
 *         slug: bonus
 *         target: cart-price
 *         operator: minus
 *         title: Bonus system
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     OrderModificatorUpdate:
 *       type: object
 *       required:
 *         - id
 *         - slug
 *         - target
 *         - operator
 *         - title
 *       properties:
 *         id:
 *           type: string
 *         slug:
 *           type: string
 *         target:
 *           type: number
 *         operator:
 *           type: string
 *         title:
 *           type: string
 *       example:
 *         id: 1
 *         slug: bonus
 *         target: cart-price
 *         operator: minus
 *         title: Bonus system
 */
const Model = sequelize.define('ordermodificator', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    notEmpty: true
  },
  title: Sequelize.STRING,
  target: {
    type: Sequelize.STRING
  },
  operator: Sequelize.STRING
});

module.exports = Model;
