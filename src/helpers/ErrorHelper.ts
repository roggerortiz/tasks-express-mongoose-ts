import ResponseStatus from '@/types/enums/ResponseStatus'
import BadRequestError from '@/types/errors/BadRequestError'
import ForbiddenError from '@/types/errors/ForbiddenError'
import NotFoundError from '@/types/errors/NotFoundError'
import UnauthorizedError from '@/types/errors/UnauthorizedError'
import console from 'console'
import { TokenExpiredError } from 'jsonwebtoken'
import { ZodError } from 'zod'

export default class ErrorHelper {
  static verify(error: Error) {
    if (error instanceof UnauthorizedError || error instanceof TokenExpiredError) {
      return { status: ResponseStatus.UNAUTHORIZED }
    }

    if (error instanceof ForbiddenError) {
      return { status: ResponseStatus.FORBIDDEN, message: 'Token was not provided' }
    }

    if (error instanceof NotFoundError) {
      return { status: ResponseStatus.NOT_FOUND, message: error.message || undefined }
    }

    if (error instanceof BadRequestError) {
      return { status: ResponseStatus.BAD_REQUEST, message: error.message || undefined }
    }

    if (error instanceof ZodError) {
      const errors = error.errors.map(({ path, message }) => ({ path: path.join('.'), message }))
      return { status: ResponseStatus.BAD_REQUEST, errors }
    }

    const { stack, message } = error
    console.log({ message, stack })

    return { status: ResponseStatus.SERVER_ERROR }
  }
}
