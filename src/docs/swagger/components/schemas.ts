// src/docs/swagger/components/schemas.ts

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - birthday
 *         - email
 *         - password
 *         - confirmPassword
 *       properties:
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
 *         password:
 *           type: string
 *           format: password
 *           example: password123
 *         confirmPassword:
 *           type: string
 *           format: password
 *           example: password123
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: password123
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: 60d0fe4f5311236168a109ca
 *             name:
 *               type: string
 *               example: John
 *             surname:
 *               type: string
 *               example: Doe
 *             email:
 *               type: string
 *               example: john.doe@example.com
 *             accessToken:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR...
 *     ReauthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR...
 *     LogoutResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Logged out successfully
 *     RemoveAccountResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Account removed successfully
 *     ChangePasswordRequest:
 *       type: object
 *       required:
 *         - oldPassword
 *         - newPassword
 *         - confirmNewPassword
 *       properties:
 *         oldPassword:
 *           type: string
 *           format: password
 *           example: oldPassword123
 *         newPassword:
 *           type: string
 *           format: password
 *           example: newPassword456
 *         confirmNewPassword:
 *           type: string
 *           format: password
 *           example: newPassword456
 *
 *     ChangePasswordResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Password changed successfully"
 *
 *     ChangePasswordErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Incorrect old password"
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Old password does not match our records"]
 *     EditUserInfoRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Jane"
 *         surname:
 *           type: string
 *           example: "Smith"
 *         birthday:
 *           type: string
 *           format: date
 *           example: "1992-02-02"
 *
 *     EditUserInfoResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: "60d0fe4f5311236168a109ca"
 *             name:
 *               type: string
 *               example: "Jane"
 *             surname:
 *               type: string
 *               example: "Smith"
 *             birthday:
 *               type: string
 *               format: date-time
 *               example: "1992-02-02T00:00:00.000Z"
 *             email:
 *               type: string
 *               format: email
 *               example: "john.doe@example.com"
 *
 *     EditUserInfoErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Validation errors"
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Birthday must be a valid date", "At least one of name, surname, or birthday must be provided"]
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "An error occurred"
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Error detail 1", "Error detail 2"]
 */
