import ResponseStatus from '@/types/enums/ResponseStatus'
import BadRequestError from '@/types/errors/BadRequestError'
import ForbiddenError from '@/types/errors/ForbiddenError'
import NotFoundError from '@/types/errors/NotFoundError'
import UnauthorizedError from '@/types/errors/UnauthorizedError'
import { ResponseError } from '@/types/response/ResponseError'
import { TokenExpiredError } from 'jsonwebtoken'
import console from 'node:console'
import { ZodError } from 'zod'

export default class ErrorHelper {
  static verify(error: Error) {
    if (error instanceof UnauthorizedError || error instanceof TokenExpiredError) {
      return { status: ResponseStatus.UNAUTHORIZED }
    }

    if (error instanceof ForbiddenError) {
      return { status: ResponseStatus.FORBIDDEN }
    }

    if (error instanceof NotFoundError) {
      return { status: ResponseStatus.NOT_FOUND }
    }

    if (error instanceof BadRequestError) {
      return { status: ResponseStatus.BAD_REQUEST, message: error.message || undefined }
    }

    if (error instanceof ZodError) {
      const errors: ResponseError[] = error.errors.map(({ path, message }) => ({ path: path.join('.'), message }))
      return { status: ResponseStatus.BAD_REQUEST, errors }
    }

    if (error.constructor.name === 'ValidationError') {
      const entries: any[] = Object.entries((error as any).errors)
      const errors: ResponseError[] = entries.map(([key, error]) => ({ path: key, message: error.message }))
      return { status: ResponseStatus.BAD_REQUEST, errors: errors }
    }

    const { stack, message } = error
    console.log({ message, stack })

    return { status: ResponseStatus.SERVER_ERROR }
  }
}
