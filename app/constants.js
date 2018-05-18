import * as dotenv from 'dotenv'
import * as process from 'process'

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

if (process.env.NODE_ENV === 'dev') {
    dotenv.config({ path: '.env' })
} else if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: '.test.env' })
}

export const PORT = process.env.PORT
export const DB_NAME = process.env.DB_NAME
export const DB_HOST = process.env.DB_HOST
export const DB_USERNAME = process.env.DB_USERNAME
export const DB_PASSWORD = process.env.DB_PASSWORD