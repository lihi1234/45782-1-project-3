import express, { json } from 'express'
import logger from './middlewares/error/logger';
import responder from './middlewares/error/responder';
import notFound from './middlewares/not-found';
import config from 'config'
import sequelize from './db/sequelize';
import cors from 'cors'
import authRouter from './routers/auth'
import { createAppBucketIfNotExists, testUpload } from './aws/aws';
// import multer from "multer";


// import categoriesRouter from './routers/categories'
// import productsRouter from './routers/products'

import vacationsRouter from '../src/routers/vacations'
import likesRouter from './routers/likes'
import fileUpload from 'express-fileupload';
import path from 'path';

const app = express()


const port = config.get<number>('app.port')
const appName = config.get<string>('app.name')
const secret = config.get<string>('app.secret')

console.log(`app secret is ${secret}`)

app.use(cors())

// post decypher middlewares
app.use(json())
app.use(fileUpload())

// app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")))

// load routers
app.use('/auth', authRouter)
app.use('/vacations', vacationsRouter)
app.use('/likes', likesRouter)


// not found
app.use(notFound)

// error middlewares
app.use(logger)
app.use(responder);

// synchronize database schema (not data) changes to the database
// i.e syncs our TypeScript models folder into the actual SQL Schema
// sequelize.sync({ force: true })
(async () => {
    // synchronize database schema (not data) changes to the database
    // i.e syncs our TypeScript models folder into the actual SQL Schema
    // sequelize.sync({ force: true })
    await sequelize.sync({ force: process.argv[2] === 'sync' })

    await createAppBucketIfNotExists()
    // testUpload()

    console.log(process.argv)

    app.listen(port, () => console.log(`${appName} started on port ${port}`))
})()