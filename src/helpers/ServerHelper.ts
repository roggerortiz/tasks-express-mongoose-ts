import DocController from '@/controllers/DocController'
import errorHandler from '@/middlewares/errorHandler'
import queryParams from '@/middlewares/queryParams'
import secureRedirect from '@/middlewares/secureRedirect'
import router from '@/routes/index.js'
import NodeEnv from '@/types/enums/NodeEnv'
import DocValidator from '@/validators/DocValidator'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import console from 'node:console'
import swaggerUi from 'swagger-ui-express'
import EnvHelper from './EnvHelper'
import SwaggerHelper from './SwaggerHelper'

export default class ServerHelper {
  static isDebug() {
    return EnvHelper.NODE_ENV === NodeEnv.DEVELOPMENT
  }

  static url() {
    if (!this.isDebug()) {
      return EnvHelper.SERVER_HOST
    }

    return `http://localhost:${EnvHelper.PORT}`
  }

  static listen(app: express.Express) {
    app.enable('trust proxy')
    app.use(secureRedirect)

    app.use(cors())
    app.use(helmet())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use(queryParams)
    app.get('/', (_, res: express.Response) => res.redirect('/docs'))
    app.use('/docs', DocValidator.file, swaggerUi.serve, DocController.get, swaggerUi.setup(SwaggerHelper.docs()))
    app.use('/api/v1', router)
    app.use(errorHandler)

    app.listen(EnvHelper.PORT)
    console.log(`Server ready: ${this.url()}/docs`)
  }
}
