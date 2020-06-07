const Sequelize = require('sequelize');
const sequelize = require('../../../../../core/db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     OrderStatus:
 *       type: object
 *       required:
 *         - title
 *         - color
 *       properties:
 *         id:
 *           type: string
 *           description: Id for the orderstatus, needs to be unique.
 *         title:
 *           type: string
 *           description: Slug for the orderstatus, needs to be unique.
 *         color:
 *           type: string
 *         contextId:
 *           type: object
 *           description: Association name context
 *       example:
 *         id: 1
 *         title: Paid
 *         color: #000
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     OrderStatusCreate:
 *       type: object
 *       required:
 *         - title
 *         - color
 *       properties:
 *         title:
 *           type: string
 *           description: Slug for the layout, needs to be unique.
 *         color:
 *           type: string
 *       example:
 *         title: Paid
 *         color: #000
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     OrderStatusUpdate:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *           description: Title for the orderstatus, needs to be unique.
 *       example:
 *         id: 2
 *         title: Paid
 */
const Model = sequelize.define('orderstatus', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    notEmpty: true
  },
  color: {
    type: Sequelize.STRING,
  },
});

module.exports = Model;
