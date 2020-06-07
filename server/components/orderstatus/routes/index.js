const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByAccessToken = require('../../../../../middleware/profileByAccessToken');
const profileByApiKey = require('../../../../../middleware/profileByApiKey');

/**
 * @swagger
 * tags:
 *   name: OrderStatuses
 *   description: Order statuses management
 */

/**
 * @swagger
 * path:
 *  /orderstatuses:
 *    get:
 *      summary: Get all order statuses
 *      tags: [OrderStatuses]
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
 *              title: Paid
 *      responses:
 *        "200":
 *          description: Array order statuses schema
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/OrderStatus'
 *      security:
 *        - basicAuth: []
 */
router.get('/', profileByApiKey, controller.findAll);

/**
 * @swagger
 * path:
 *  /orderstatuses/find/{id}:
 *    get:
 *      summary: Get order statuses by id
 *      tags: [OrderStatuses]
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
 *          example:
 *            where:
 *              title: Paid
 *      responses:
 *        "200":
 *          description: Order status schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/OrderStatus'
 *      security:
 *        - basicAuth: []
 */
router.get('/find/:id', profileByApiKey, controller.findByPk);

/**
 * @swagger
 * path:
 *  /orderstatuses/findone:
 *    get:
 *      summary: Get one order status
 *      tags: [OrderStatuses]
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
 *              title: Paid
 *      responses:
 *        "200":
 *          description: Order status schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/OrderStatus'
 *      security:
 *        - basicAuth: []
 */
router.get('/findone', profileByApiKey, controller.findOne);

/**
 * @swagger
 * path:
 *  /orderstatuses/create:
 *    post:
 *      summary: Create order status
 *      tags: [OrderStatuses]
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/OrderStatusCreate'
 *      responses:
 *        "200":
 *          description: Create order status schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/OrderStatus'
 *      security:
 *        - basicAuth: []
 */
router.post('/create', profileByAccessToken, controller.create);

/**
 * @swagger
 * path:
 *  /orderstatuses/update/{id}:
 *    put:
 *      summary: Update order status
 *      tags: [OrderStatuses]
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
 *              $ref: '#/components/schemas/OrderStatusUpdate'
 *      responses:
 *        "200":
 *          description: Order status schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/OrderStatus'
 *      security:
 *        - basicAuth: []
 */
router.put('/update/:id', profileByAccessToken, controller.update);

/**
 * @swagger
 * path:
 *  /orderstatuses/remove/{id}:
 *    delete:
 *      summary: Delete order status
 *      tags: [OrderStatuses]
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
 *  /orderstatuses/count:
 *    get:
 *      summary: Get order statuses count
 *      tags: [OrderStatuses]
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
 *              title: Paid
 *      responses:
 *        "200":
 *          description: Order status count
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
router.get('/count', profileByApiKey, controller.count);

module.exports = router;
