import z from 'zod'

const docFileSchema = z.object({
  format: z.enum(['json', 'yaml'], { message: "The 'Format' param must be 'json' or 'yaml'" }).optional()
})

export default docFileSchema
