import { z } from 'zod'

const pagerShape: any = {
  pagesize: z
    .string()
    .transform((val) => parseInt(val))
    .pipe(
      z
        .number({ message: "The 'Page Size' param must be a number" })
        .nonnegative("The 'Page Size' param must be greater than or equal to 0")
    )
    .optional(),
  pageindex: z
    .string()
    .transform((val) => parseInt(val))
    .pipe(
      z
        .number({ message: "The 'Page Index' param must be a number" })
        .nonnegative("The 'Page Index' param must be greater than or equal to 0")
    )
    .optional(),
  sortfield: z.string().min(2, "The 'Sort Field' param must contain at least 2 characters").optional(),
  sortdirection: z.enum(['asc', 'desc'], { message: "The 'Sort Direction' param must be 'asc' or 'desc'" }).optional()
}

export default pagerShape
