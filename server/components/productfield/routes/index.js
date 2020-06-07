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
 *   name: ProductFields
 *   description: Product fields management
 */

/**
 * @swagger
 * path:
 *  /productfields:
 *    get:
 *      summary: Get all product fields
 *      tags: [ProductFields]
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
 *              slug: avatar
 *      responses:
 *        "200":
 *          description: Array product fields schema
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/ProductField'
 *      security:
 *        - basicAuth: []
 */
router.get('/', profileByApiKey, controller.findAll);

/**
 * @swagger
 * path:
 *  /productfields/find/{id}:
 *    get:
 *      summary: Get product fields by id
 *      tags: [ProductFields]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
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
 *      responses:
 *        "200":
 *          description: Product field schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ProductField'
 *      security:
 *        - basicAuth: []
 */
router.get('/find/:id', profileByApiKey, controller.findByPk);

/**
 * @swagger
 * path:
 *  /productfields/findone:
 *    get:
 *      summary: Get one product field
 *      tags: [ProductFields]
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
 *              slug: avatar
 *      responses:
 *        "200":
 *          description: Product field schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ProductField'
 *      security:
 *        - basicAuth: []
 */
router.get('/findone', profileByApiKey, controller.findOne);

/**
 * @swagger
 * path:
 *  /additonalfields/create:
 *    post:
 *      summary: Create product field
 *      tags: [ProductFields]
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
 *              $ref: '#/components/schemas/AdditionaFieldCreate'
 *      responses:
 *        "200":
 *          description: Create product field schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ProductField'
 *      security:
 *        - basicAuth: []
 */
router.post('/create', profileByAccessToken, controller.create);

/**
 * @swagger
 * path:
 *  /productfields/update/{id}:
 *    put:
 *      summary: Update product field
 *      tags: [ProductFields]
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
 *              $ref: '#/components/schemas/AdditionalFieldUpdate'
 *      responses:
 *        "200":
 *          description: Product field schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ProductField'
 *      security:
 *        - basicAuth: []
 */
router.put('/update/:id', profileByAccessToken, controller.update);

/**
 * @swagger
 * path:
 *  /productfields/update-all:
 *    put:
 *      summary: Update product field
 *      tags: [ProductFields]
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        description: Add array updated fields to fields property
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               fields:
 *                 type: string
 *      responses:
 *        "200":
 *          description: Product field schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ProductField'
 *      security:
 *        - basicAuth: []
 */
router.put('/update-all', profileByAccessToken, controller.updateAll);

/**
 * @swagger
 * path:
 *  /productfields/remove/{id}:
 *    delete:
 *      summary: Delete product field
 *      tags: [ProductFields]
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

module.exports = router;
