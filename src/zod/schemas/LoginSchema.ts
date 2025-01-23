import { z } from 'zod'

const loginSchema = z.object({
  username: z
    .string({ message: "The 'Username' field is required" })
    .min(2, "The 'Username' field must contain at least 2 characters"),
  password: z
    .string({ message: "The 'Password' field is required" })
    .min(6, "The 'Password' field must contain at least 6 characters")
})

export default loginSchema
