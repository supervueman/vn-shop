const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByAccessToken = require('../../../../../middleware/profileByAccessToken');
const profileByApiKey = require('../../../../../middleware/profileByApiKey');
const validDeliveryInfo = require('../middleware/validDeliveryInfo');
const validAndCreateModificators = require('../middleware/validAndCreateModificators');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Orders management
 */

/**
 * @swagger
 * path:
 *  /orders:
 *    get:
 *      summary: Get all orders
 *      tags: [Orders]
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *        - filterParam:
 *          in: query
 *          name: filter
 *          description: See sequelize documentation https://sequelize.org/v5/manual/querying.html
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *      responses:
 *        "200":
 *          description: Array orders schema
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Order'
 *      security:
 *        - basicAuth: []
 */
router.get('/', profileByAccessToken, controller.findAll);

/**
 * @swagger
 * path:
 *  /orders/find/{id}:
 *    get:
 *      summary: Get orders by id
 *      tags: [Orders]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *        - filterParam:
 *          in: query
 *          name: filter
 *          description: See sequelize documentation https://sequelize.org/v5/manual/querying.html
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *      responses:
 *        "200":
 *          description: Order schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Order'
 *      security:
 *        - basicAuth: []
 */
router.get('/find/:id', profileByAccessToken, controller.findByPk);

/**
 * @swagger
 * path:
 *  /orders/findone:
 *    get:
 *      summary: Get one order
 *      tags: [Orders]
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *        - filterParam:
 *          in: query
 *          name: filter
 *          description: See sequelize documentation https://sequelize.org/v5/manual/querying.html
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *          example:
 *            where:
 *              order_num: VN-123/12
 *      responses:
 *        "200":
 *          description: Order schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Order'
 *      security:
 *        - basicAuth: []
 */
router.get('/findone', profileByAccessToken, controller.findOne);

/**
 * @swagger
 * path:
 *  /orders/create:
 *    post:
 *      summary: Create orders
 *      tags: [Orders]
 *      parameters:
 *        - in: header
 *          name: x-api-key
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/OrderCreate'
 *      responses:
 *        "200":
 *          description: Create order schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Order'
 *      security:
 *        - basicAuth: []
 */
router.post(
  '/create',
  profileByApiKey,
  validDeliveryInfo,
  controller.create,
  validAndCreateModificators
);

/**
 * @swagger
 * path:
 *  /orders/update/{id}:
 *    put:
 *      summary: Update order
 *      tags: [Orders]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/OrderUpdate'
 *      responses:
 *        "200":
 *          description: Order schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Order'
 *      security:
 *        - basicAuth: []
 */
router.put(
  '/update/:id',
  profileByAccessToken,
  validDeliveryInfo,
  controller.update,
  validAndCreateModificators
);

/**
 * @swagger
 * path:
 *  /orders/remove/{id}:
 *    delete:
 *      summary: Delete order
 *      tags: [Orders]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "204":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *      security:
 *        - basicAuth: []
 */
router.delete('/remove/:id', profileByAccessToken, controller.remove);

/**
 * @swagger
 * path:
 *  /orders/count:
 *    get:
 *      summary: Get orders count
 *      tags: [Orders]
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *        - filterParam:
 *          in: query
 *          name: filter
 *          description: See sequelize documentation https://sequelize.org/v5/manual/querying.html
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *          example:
 *            where:
 *              slug: base
 *      responses:
 *        "200":
 *          description: Orders count
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  count:
 *                    type: number
 *      security:
 *        - basicAuth: []
 */
router.get('/count', profileByAccessToken, controller.count);

/**
 * @swagger
 * path:
 *  /orders/remove-product:
 *    put:
 *      summary: Remove product from order
 *      tags: [Orders]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                productId:
 *                  type: string
 *      responses:
 *        "200":
 *          description: Order schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Order'
 *      security:
 *        - basicAuth: []
 */
router.put('/remove-product', profileByAccessToken, controller.removeProduct);

module.exports = router;
