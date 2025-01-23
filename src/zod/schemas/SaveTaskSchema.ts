import { z } from 'zod'

const saveTaskSchema = z.object({
  title: z
    .string({ message: "The 'Title' field is required" })
    .min(2, "The 'First Name' field must contain at least 2 characters"),
  description: z
    .string({ message: "The 'Description' field is required" })
    .min(2, "The 'First Name' field must contain at least 2 characters")
    .optional(),
  important: z.boolean({ message: "The 'Important' field is required" }).optional().default(false)
})

export default saveTaskSchema
