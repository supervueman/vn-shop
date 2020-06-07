const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByAccessToken = require('../../../../../middleware/profileByAccessToken');

/**
 * @swagger
 * tags:
 *   name: OrderModificator
 *   description: OrderModificator management
 */

/**
 * @swagger
 * path:
 *  /ordermodificators-layer:
 *    get:
 *      summary: Get all order modificators layer
 *      tags: [OrderModificator]
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
 *          description: Array order modificators schema
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/OrderModificator'
 *      security:
 *        - basicAuth: []
 */
router.get('/', profileByAccessToken, controller.findAll);

/**
 * @swagger
 * path:
 *  /ordermodificators-layer/find/{id}:
 *    get:
 *      summary: Get order modificator by id
 *      tags: [OrderModificator]
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
 *          description: Order modificator schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/OrderModificator'
 *      security:
 *        - basicAuth: []
 */
router.get('/find/:id', profileByAccessToken, controller.findByPk);

/**
 * @swagger
 * path:
 *  /ordermodificators-layer/findone:
 *    get:
 *      summary: Get one order
 *      tags: [OrderModificator]
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
 *          description: Order modificator schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/OrderModificator'
 *      security:
 *        - basicAuth: []
 */
router.get('/findone', profileByAccessToken, controller.findOne);

/**
 * @swagger
 * path:
 *  /ordermodificators-layer/create:
 *    post:
 *      summary: Create order modificator
 *      tags: [OrderModificator]
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
 *              $ref: '#/components/schemas/OrderModificatorCreate'
 *      responses:
 *        "200":
 *          description: Create order modificator schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/OrderModificator'
 *      security:
 *        - basicAuth: []
 */
router.post('/create', profileByAccessToken, controller.create);

/**
 * @swagger
 * path:
 *  /ordermodificators-layer/update/{id}:
 *    put:
 *      summary: Update order modificator
 *      tags: [OrderModificator]
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
 *              $ref: '#/components/schemas/OrderModificatorUpdate'
 *      responses:
 *        "200":
 *          description: Order modificator schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/OrderModificator'
 *      security:
 *        - basicAuth: []
 */
router.put('/update/:id', profileByAccessToken, controller.update);

/**
 * @swagger
 * path:
 *  /ordermodificators-layer/remove/{id}:
 *    delete:
 *      summary: Delete order modificator
 *      tags: [OrderModificator]
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
 *  /ordermodificators-layer/count:
 *    get:
 *      summary: Get order modificators count
 *      tags: [OrderModificator]
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
 *          description: Order modificators count
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

module.exports = router;
