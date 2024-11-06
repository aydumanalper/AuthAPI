// src/docs/swagger/components/schemas.ts

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - birthday
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           example: 60d0fe4f5311236168a109ca
 *         name:
 *           type: string
 *           example: John
 *         surname:
 *           type: string
 *           example: Doe
 *         birthday:
 *           type: string
 *           format: date
 *           example: 1990-01-01
 *         email:
 *           type: string
 *           format: email
 *           example: john.doe@example.com
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           $ref: '#/components/schemas/User'
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR...
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Invalid email or password
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *           example: ["\"email\" is required", "Password must be at least 6 characters"]
 */
