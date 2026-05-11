/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard endpoints
 */

/**
 * @swagger
 * /api/v1/dashboard/summary:
 *   get:
 *     summary: Get dashboard summary
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     
 *     responses:
 *       200:
 *         description: Dashboard summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_income:
 *                   type: number
 *                   description: Total income for the dashboard
 *                 total_expenses:
 *                   type: number
 *                   description: Total expenses for the dashboard
 *                 net_income:
 *                   type: number
 *                   description: Net income for the dashboard
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
