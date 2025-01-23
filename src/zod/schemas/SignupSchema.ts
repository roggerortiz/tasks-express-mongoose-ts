import PasswordHelper from '@/helpers/PasswordHelper'
import validator from 'validator'
import { z } from 'zod'

const signupSchema = z
  .object({
    first_name: z
      .string({ message: "The 'First Name' field is required" })
      .min(2, "The 'First Name' field must contain at least 2 characters"),
    last_name: z
      .string({ message: "The 'Last Name' field is required" })
      .min(2, "The 'First Name' field must contain at least 2 characters"),
    email: z
      .string({ message: "The 'Email' is required" })
      .min(5, "The 'Email' field must contain at least 5 characters")
      .email("The 'Email' field must be an email"),
    phone: z
      .string()
      .min(5, "The 'Phone' field must contain at least 5 characters")
      .refine((value) => validator.isMobilePhone(value, 'es-PE'), "The 'Phone' field must be a phone number")
      .optional(),
    username: z
      .string({ message: "The 'Username' field is required" })
      .min(2, "The 'Username' field must contain at least 2 characters"),
    password: z
      .string({ message: "The 'Password' field is required" })
      .min(8, "The 'Password' field must contain at least 8 characters")
      .max(20, "The 'Password' field must contain maximum 20 characters")
      .refine(
        (value) => PasswordHelper.validate(value),
        "The 'Password' field must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    password_confirm: z
      .string({ message: "The 'Password Confirm' field is required" })
      .min(8, "The 'Password Confirm' field must contain at least 8 characters")
      .max(20, "The 'Password Confirm' field must contain maximum 20 characters")
      .refine(
        (value) => PasswordHelper.validate(value),
        "The 'Password Confirm' field must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      )
  })
  .superRefine(({ password, password_confirm }, ctx) => {
    if (password !== password_confirm) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['password_confirm']
      })
    }
  })

export default signupSchema
