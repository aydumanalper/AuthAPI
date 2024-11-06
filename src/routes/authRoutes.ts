// src/routes/authRoutes.ts

import express from 'express';
import { changePassword, editUserInfo, getUser, login, logout, reauth, register, removeAccount } from '../controllers/authController';
import validateRequest from '../middlewares/validateRequest';
import { changePasswordSchema, editUserInfoSchema, loginSchema, reauthSchema, registerSchema } from '../validations/authValidation';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user management
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Bad Request - Validation errors or email already in use
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Email already in use"
 *               errors:
 *                 - "\"email\" is already in use"
 *                 - "Password must be at least 6 characters"
 */


router.post('/register', validateRequest(registerSchema), register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Bad Request - Validation errors or invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Invalid email or password"
 *               errors:
 *                 - "Invalid credentials"
 */
router.post('/login', validateRequest(loginSchema), login);

/**
 * @swagger
 * /api/auth/reauth:
 *   post:
 *     summary: Reauthenticate and obtain new access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR...
 *     responses:
 *       200:
 *         description: New access token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReauthResponse'
 *       400:
 *         description: Bad Request - Refresh Token is required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Refresh Token is required"
 *               errors:
 *                 - "No refresh token provided"
 *       401:
 *         description: Unauthorized - Invalid Refresh Token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Invalid Refresh Token"
 *               errors:
 *                 - "Refresh token is expired"
 *                 - "Token signature is invalid"
 */
router.post('/reauth', validateRequest(reauthSchema), reauth);


/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout a user by invalidating the refresh token
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogoutResponse'
 *             example:
 *               success: true
 *               message: "Logged out successfully"
 *       401:
 *         description: Unauthorized - Invalid access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized: Invalid access token"
 *               errors:
 *                 - "Access token is invalid or missing"
 */
router.post('/logout', authenticate, logout);

/**
 * @swagger
 * /api/auth/remove:
 *   delete:
 *     summary: Remove the authenticated user's account
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Account removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RemoveAccountResponse'
 *             example:
 *               success: true
 *               message: "Account removed successfully"
 *       401:
 *         description: Unauthorized - Invalid or missing access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized: Invalid access token"
 *               errors:
 *                 - "Access token is invalid or missing"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "An unexpected error occurred"
 *               errors:
 *                 - "Database connection failed"
 */
router.delete('/remove', authenticate, removeAccount);

/**
 * @swagger
 * /api/auth/user:
 *   get:
 *     summary: Get the authenticated user's information
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetUserResponse'
 *             example:
 *               success: true
 *               data:
 *                 id: "60d0fe4f5311236168a109ca"
 *                 name: "John"
 *                 surname: "Doe"
 *                 birthday: "1990-01-01T00:00:00.000Z"
 *                 email: "john.doe@example.com"
 *       401:
 *         description: Unauthorized - Invalid or missing access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetUserErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized: Invalid access token"
 *               errors:
 *                 - "Access token is invalid or missing"
 */
router.get('/user', authenticate, getUser);


/**
 * @swagger
 * /api/auth/change-password:
 *   put:
 *     summary: Change the authenticated user's password
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordRequest'
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChangePasswordResponse'
 *             example:
 *               success: true
 *               message: "Password changed successfully"
 *       400:
 *         description: Bad Request - Validation errors or incorrect old password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChangePasswordErrorResponse'
 *             example:
 *               success: false
 *               message: "Incorrect old password"
 *               errors:
 *                 - "Old password does not match our records"
 *       401:
 *         description: Unauthorized - Invalid or missing access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChangePasswordErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized: Invalid access token"
 *               errors:
 *                 - "Access token is invalid or missing"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "An unexpected error occurred"
 *               errors:
 *                 - "Database connection failed"
 */
router.put('/change-password', authenticate, validateRequest(changePasswordSchema), changePassword);


/**
 * @swagger
 * /api/auth/edit-user:
 *   put:
 *     summary: Edit the authenticated user's information
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditUserInfoRequest'
 *     responses:
 *       200:
 *         description: User information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EditUserInfoResponse'
 *             example:
 *               success: true
 *               data:
 *                 id: "60d0fe4f5311236168a109ca"
 *                 name: "Jane"
 *                 surname: "Smith"
 *                 birthday: "1992-02-02T00:00:00.000Z"
 *                 email: "john.doe@example.com"
 *       400:
 *         description: Bad Request - Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EditUserInfoErrorResponse'
 *             examples:
 *               InvalidBirthday:
 *                 summary: Invalid birthday format
 *                 value:
 *                   success: false
 *                   message: "Validation errors"
 *                   errors:
 *                     - "Birthday must be a valid date"
 *               NoFieldsProvided:
 *                 summary: No fields provided
 *                 value:
 *                   success: false
 *                   message: "At least one of name, surname, or birthday must be provided"
 *                   errors:
 *                     - "At least one of name, surname, or birthday must be provided"
 *       401:
 *         description: Unauthorized - Invalid or missing access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Unauthorized: Invalid access token"
 *               errors:
 *                 - "Access token is invalid or missing"
 *       404:
 *         description: Not Found - User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "User not found"
 *               errors:
 *                 - "User does not exist"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "An unexpected error occurred"
 *               errors:
 *                 - "Database connection failed"
 */
router.put('/edit-user', 
    authenticate, 
    validateRequest(editUserInfoSchema), 
    editUserInfo
  );


export default router;
