/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User profile management
 */

/**
 * @swagger
 * /api/v1/me:
 *   get:
 *     summary: Get user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 * 
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user's unique identifier
 *                 fullname:
 *                   type: string
 *                   description: The user's full name
 *                 email:
 *                   type: string
 *                   description: The user's email address
 *                 currency:
 *                   type: string
 *                   description: The user's preferred currency
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/me:
 *   put:
 *     summary: Update user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 description: The user's full name
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               currency:
 *                 type: string
 *                 description: The user's preferred currency
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user's unique identifier
 *                 fullname:
 *                   type: string
 *                   description: The user's full name
 *                 email:
 *                   type: string
 *                   description: The user's email address
 *                 currency:
 *                   type: string
 *                   description: The user's preferred currency
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */