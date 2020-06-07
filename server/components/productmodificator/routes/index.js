const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByAccessToken = require('../../../../../middleware/profileByAccessToken');

/**
 * @swagger
 * tags:
 *   name: ProductModificator
 *   description: ProductModificator management
 */

/**
 * @swagger
 * path:
 *  /productmodificators:
 *    get:
 *      summary: Get all product modificators
 *      tags: [ProductModificator]
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
 *          description: Array product modificators schema
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/ProductModificator'
 *      security:
 *        - basicAuth: []
 */
router.get('/', profileByAccessToken, controller.findAll);

/**
 * @swagger
 * path:
 *  /productmodificators/find/{id}:
 *    get:
 *      summary: Get product modificator by id
 *      tags: [ProductModificator]
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
 *          description: Product modificator schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ProductModificator'
 *      security:
 *        - basicAuth: []
 */
router.get('/find/:id', profileByAccessToken, controller.findByPk);

/**
 * @swagger
 * path:
 *  /productmodificators/findone:
 *    get:
 *      summary: Get one product
 *      tags: [ProductModificator]
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
 *          description: Product modificator schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ProductModificator'
 *      security:
 *        - basicAuth: []
 */
router.get('/findone', profileByAccessToken, controller.findOne);

/**
 * @swagger
 * path:
 *  /productmodificators/create:
 *    post:
 *      summary: Create product modificator
 *      tags: [ProductModificator]
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
 *              $ref: '#/components/schemas/ProductModificatorCreate'
 *      responses:
 *        "200":
 *          description: Create product modificator schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ProductModificator'
 *      security:
 *        - basicAuth: []
 */
router.post('/create', profileByAccessToken, controller.create);

/**
 * @swagger
 * path:
 *  /productmodificators/update/{id}:
 *    put:
 *      summary: Update product modificator
 *      tags: [ProductModificator]
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
 *              $ref: '#/components/schemas/ProductModificatorUpdate'
 *      responses:
 *        "200":
 *          description: Product modificator schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ProductModificator'
 *      security:
 *        - basicAuth: []
 */
router.put('/update/:id', profileByAccessToken, controller.update);

/**
 * @swagger
 * path:
 *  /productmodificators/remove/{id}:
 *    delete:
 *      summary: Delete product modificator
 *      tags: [ProductModificator]
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
 *  /productmodificators/count:
 *    get:
 *      summary: Get product modificators count
 *      tags: [ProductModificator]
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
 *          description: Product modificators count
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
