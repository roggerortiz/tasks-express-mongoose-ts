import validator from 'validator'
import { z } from 'zod'

const idSchema = z.object({
  id: z
    .string({ message: "The 'ID' field is required" })
    .refine((value) => validator.isMongoId(value), "The 'ID' field must be an Mongo Object ID")
})

export default idSchema
