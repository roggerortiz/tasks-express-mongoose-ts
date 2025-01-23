import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import errorHandler from './middlewares/errorHandler'
import queryParams from './middlewares/queryParams'
import secureRedirect from './middlewares/secureRedirect'
import router from './routes'

const app = express()

app.enable('trust proxy')
app.use(secureRedirect)

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(queryParams)
app.use('/api/v1', router)
app.use(errorHandler)

export default app
