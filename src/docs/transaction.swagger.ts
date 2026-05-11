/**
 * @swagger
 * tags:
 *   name: Transaction
 *   description: Transaction endpoints
 */

/**
 * @swagger
 * /api/v1/transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transactions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique identifier for the transaction
 *                   amount:
 *                     type: number
 *                     description: Amount of the transaction
 *                   transaction_type:
 *                     type: string
 *                     example: expense
 *                     description: Type of transaction
 *                   description:
 *                     type: string
 *                     example: Bought food
 *                     description: Description of the transaction
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: 2026-05-11
 *                     description: Transaction date
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Amount of the transaction
 *               transaction_type:
 *                 type: string
 *                 example: expense
 *                 description: Type of transaction
 *               description:
 *                 type: string
 *                 example: Bought food
 *                 description: Description of the transaction
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-05-11
 *                 description: Transaction date
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique identifier for the transaction
 *                 amount:
 *                   type: number
 *                   description: Amount of the transaction
 *                 transaction_type:
 *                   type: string
 *                   example: expense
 *                   description: Type of transaction
 *                 description:
 *                   type: string
 *                   example: Bought food
 *                   description: Description of the transaction
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: 2026-05-11
 *                   description: Transaction date
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/transactions/{id}:
 *   get:
 *     summary: Get a transaction by ID
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Unique identifier for the transaction
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique identifier for the transaction
 *                 amount:
 *                   type: number
 *                   description: Amount of the transaction
 *                 transaction_type:
 *                   type: string
 *                   example: expense
 *                   description: Type of transaction
 *                 description:
 *                   type: string
 *                   example: Bought food
 *                   description: Description of the transaction
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: 2026-05-11
 *                   description: Transaction date
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal server error
 */ 

/**
 * @swagger
 * /api/v1/transactions/{id}:
 *   patch:
 *     summary: Update a transaction by ID
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Unique identifier for the transaction
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Amount of the transaction
 *               transaction_type:
 *                 type: string
 *                 example: expense
 *                 description: Type of transaction
 *               description:
 *                 type: string
 *                 example: Bought food
 *                 description: Description of the transaction
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-05-11
 *                 description: Transaction date
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique identifier for the transaction
 *                 amount:
 *                   type: number
 *                   description: Amount of the transaction
 *                 transaction_type:
 *                   type: string
 *                   example: expense
 *                   description: Type of transaction
 *                 description:
 *                   type: string
 *                   example: Bought food
 *                   description: Description of the transaction
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: 2026-05-11
 *                   description: Transaction date
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction by ID
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Unique identifier for the transaction
 *         required: true
 *         schema:
 *           type: string
 *     
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal server error
 */