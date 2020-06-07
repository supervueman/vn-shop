const Sequelize = require('sequelize');
const sequelize = require('../../../../../core/db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - slug
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: Id for the resource, needs to be unique.
 *         slug:
 *           type: string
 *           description: Slug for the resource, needs to be unique.
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         content:
 *           type: string
 *         published:
 *           type: boolean
 *         level:
 *           type: number
 *         lang:
 *           type: string
 *         article:
 *           type: string
 *         price:
 *           type: number
 *         weight:
 *           type: number
 *         count:
 *           type: number
 *         size:
 *           type: string
 *         popular:
 *           type: boolean
 *         new:
 *           type: boolean
 *         in_stock:
 *           type: boolean
 *         menuindex:
 *           type: number
 *         productfields:
 *           type: array
 *           description: Association name productfields. See https://sequelize.org/v5/manual/associations.html
 *         context:
 *           type: object
 *           description: Association name context
 *         parent:
 *           type: object
 *           description: Association name parent
 *         layout:
 *           type: object
 *           description: Association name layout
 *         resourcetype:
 *           type: object
 *           description: Association name resourcetype
 *         translations:
 *           type: array
 *           description: Association name translations
 *         children:
 *           type: array
 *           description: Association name children
 *       example:
 *         id: 2
 *         slug: product_1
 *         title: Product 1
 *         description: My new product
 *         content: My new product
 *         published: true
 *         level: 1
 *         lang: en
 *         menuindex: 2
 *         price: 1000
 *         popular: true
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     ProductCreate:
 *       type: object
 *       required:
 *         - slug
 *         - title
 *       properties:
 *         slug:
 *           type: string
 *           description: Slug for the product, needs to be unique.
 *         title:
 *           type: string
 *       example:
 *         slug: product_1
 *         title: Product 1
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     ProductUpdate:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         slug:
 *           type: string
 *           description: Slug for the product, needs to be unique.
 *         title:
 *           type: string
 *       example:
 *         title: Product 2
 *         price: 2000
 */
const Model = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  slug: {
    type: Sequelize.STRING,
    notEmpty: true
  },
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  content: Sequelize.TEXT,
  article: Sequelize.STRING,
  price: Sequelize.INTEGER,
  weight: Sequelize.INTEGER,
  count: Sequelize.INTEGER,
  size: Sequelize.STRING,
  popular: Sequelize.BOOLEAN,
  new: Sequelize.BOOLEAN,
  in_stock: Sequelize.BOOLEAN,
  published: Sequelize.BOOLEAN,
  level: Sequelize.INTEGER,
  lang: Sequelize.STRING,
  menuindex: Sequelize.INTEGER,
  modificators: Sequelize.TEXT,
  image: Sequelize.STRING
});

Model.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  if (values.user) {
    delete values.user.dataValues.password;
  }

  return values;
};

module.exports = Model;
