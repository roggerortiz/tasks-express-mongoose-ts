import { z } from 'zod'
import pagerShape from '../shapes/PagerShape'

const getTasksSchema = z.object({
  ...pagerShape,
  freetext: z.string().min(2, "The 'Free Text' param must contain at least 2 characters").optional()
})

export default getTasksSchema
