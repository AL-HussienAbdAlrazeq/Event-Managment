import express from 'express'
import 'dotenv/config'
import { dbConnection } from './database/DB.Connection.js'
import eventRouter from './src/modules/events/event.routes.js'
import { globalError } from './src/middleware/globalError.js'
import authRouter from './src/modules/auth/auth.routes.js'
const app = express()
const port = process.env.HOST||3000
app.use(express.json())
app.use('/events' , eventRouter)
app.use('/auth' , authRouter)


app.use(globalError)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))