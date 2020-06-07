const Sequelize = require('sequelize');
const sequelize = require('../../../../../core/db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     ProductModificator:
 *       type: object
 *       required:
 *         - id
 *         - slug
 *         - operator
 *         - title
 *       properties:
 *         id:
 *           type: string
 *         slug:
 *           type: string
 *         operator:
 *           type: string
 *         title:
 *           type: string
 *       example:
 *         id: 1
 *         slug: bonus
 *         operator: minus
 *         title: Add cheeze
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     ProductModificatorCreate:
 *       type: object
 *       required:
 *         - id
 *         - slug
 *         - operator
 *         - title
 *       properties:
 *         id:
 *           type: string
 *         slug:
 *           type: string
 *         operator:
 *           type: string
 *         title:
 *           type: string
 *       example:
 *         id: 1
 *         slug: bonus
 *         operator: minus
 *         title: Add cheeze
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     ProductModificatorUpdate:
 *       type: object
 *       required:
 *         - id
 *         - slug
 *         - operator
 *         - title
 *       properties:
 *         id:
 *           type: string
 *         slug:
 *           type: string
 *         operator:
 *           type: string
 *         title:
 *           type: string
 *       example:
 *         id: 1
 *         slug: bonus
 *         operator: minus
 *         title: Add cheeze
 */
const Model = sequelize.define('productmodificator', {
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
  operator: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Model;
