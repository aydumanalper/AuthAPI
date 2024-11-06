import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  surname: Joi.string().min(2).max(30).required(),
  birthday: Joi.date().less('now').required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .messages({ 'any.only': 'Confirm password must match password' }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const reauthSchema = Joi.object({
  refreshToken: Joi.string().required(),
});


export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().min(6).required().messages({
    'string.empty': 'Old password is required',
    'string.min': 'Old password must be at least 6 characters',
  }),
  newPassword: Joi.string().min(6).required().messages({
    'string.empty': 'New password is required',
    'string.min': 'New password must be at least 6 characters',
  }),
  confirmNewPassword: Joi.any()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({ 
      'any.only': 'Confirm new password must match new password',
      'any.required': 'Confirm new password is required'
    }),
});


export const editUserInfoSchema = Joi.object({
  name: Joi.string().min(1).max(50).optional().messages({
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least 1 character',
    'string.max': 'Name cannot exceed 50 characters',
  }),
  surname: Joi.string().min(1).max(50).optional().messages({
    'string.empty': 'Surname cannot be empty',
    'string.min': 'Surname must be at least 1 character',
    'string.max': 'Surname cannot exceed 50 characters',
  }),
  birthday: Joi.date().iso().optional().messages({
    'date.base': 'Birthday must be a valid date',
    'date.format': 'Birthday must be in ISO format',
  }),
}).or('name', 'surname', 'birthday').messages({
  'object.missing': 'At least one of name, surname, or birthday must be provided',
});