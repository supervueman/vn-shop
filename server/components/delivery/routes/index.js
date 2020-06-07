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
 *   name: Deliveries
 *   description: Deliveries management
 */

/**
 * @swagger
 * path:
 *  /deliveries:
 *    get:
 *      summary: Get all deliveries
 *      tags: [Deliveries]
 *      parameters:
 *        - in: header
 *          name: x-api-key
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
 *              cost: 100
 *      responses:
 *        "200":
 *          description: Array deliveries schema
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Delivery'
 *      security:
 *        - basicAuth: []
 */
router.get('/', profileByApiKey, controller.findAll);

/**
 * @swagger
 * path:
 *  /deliveries/find/{id}:
 *    get:
 *      summary: Get delivery by id
 *      tags: [Deliveries]
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
 *              cost: 100
 *      responses:
 *        "200":
 *          description: Delivery schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Delivery'
 *      security:
 *        - basicAuth: []
 */
router.get('/find/:id', profileByApiKey, controller.findByPk);

/**
 * @swagger
 * path:
 *  /deliveries/findone:
 *    get:
 *      summary: Get one delivery
 *      tags: [Deliveries]
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
 *              cost: 100
 *      responses:
 *        "200":
 *          description: Delivery schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Delivery'
 *      security:
 *        - basicAuth: []
 */
router.get('/findone', profileByApiKey, controller.findOne);

/**
 * @swagger
 * path:
 *  /deliveries/create:
 *    post:
 *      summary: Create delivery
 *      tags: [Deliveries]
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
 *              $ref: '#/components/schemas/DeliveryCreate'
 *      responses:
 *        "200":
 *          description: Create delivery schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Delivery'
 *      security:
 *        - basicAuth: []
 */
router.post('/create', profileByAccessToken, controller.create);

/**
 * @swagger
 * path:
 *  /deliveries/update/{id}:
 *    put:
 *      summary: Update delivery
 *      tags: [Deliveries]
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
 *              $ref: '#/components/schemas/DeliveryUpdate'
 *      responses:
 *        "200":
 *          description: Delivery schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Delivery'
 *      security:
 *        - basicAuth: []
 */
router.put('/update/:id', profileByAccessToken, controller.update);

/**
 * @swagger
 * path:
 *  /deliveries/remove/{id}:
 *    delete:
 *      summary: Delete delivery
 *      tags: [Deliveries]
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
 *  /deliveries/count:
 *    get:
 *      summary: Get deliveries count
 *      tags: [Deliveries]
 *      parameters:
 *        - in: header
 *          name: x-api-key
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
 *          description: Deliveries count
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
