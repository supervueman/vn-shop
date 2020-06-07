const Sequelize = require('sequelize');
const sequelize = require('../../../../../core/db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     ProductField:
 *       type: object
 *       required:
 *         - slug
 *       properties:
 *         id:
 *           type: string
 *           description: Id for the product field, needs to be unique.
 *         slug:
 *           type: string
 *           description: Slug for the product field, needs to be unique.
 *         value:
 *           type: string
 *         field:
 *           type: object
 *           description: Association name field
 *         resource:
 *           type: object
 *           description: Association name resource
 *         category:
 *           type: object
 *           description: Association name category
 *       example:
 *         id: 1
 *         slug: image
 *         value: img/image.png
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     ProductFieldCreate:
 *       type: object
 *       required:
 *         - slug
 *       properties:
 *         slug:
 *           type: string
 *           description: Slug for the product field, needs to be unique.
 *       example:
 *         slug: image
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     ProductFieldUpdate:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *         slug:
 *           type: string
 *           description: Slug for the product field, needs to be unique.
 *         value:
 *           type: string
 *       example:
 *         id: 1
 *         slug: image
 *         value: img/image-2.png
 */
const Model = sequelize.define('productfield', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  slug: {
    type: Sequelize.STRING,
    notEmpty: true,
  },
  value: Sequelize.TEXT
});

module.exports = Model;
