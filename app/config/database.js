import fs from 'fs'
import path from 'path'
import mysql from 'mysql'
import * as constants from '../constants'

let dbCon = null

export const connent = () => {
    dbCon = mysql.createConnection({
        host: constants.DB_HOST,
        user: constants.DB_USERNAME,
        password: constants.DB_PASSWORD,
        database: constants.DB_NAME
    })
    dbCon.connect()
}

export const initData = () => {
    dbCon.query('SELECT COUNT(*) FROM properties', (err) => {
        if (!err) return
        const file = fs.readFileSync(path.resolve(__dirname, 'property_data.sql'))
            .toString()
            .replace(/(\r\n|\n|\r)/gm," ")
        dbCon.query(file, (err) => {
            console.log(err)
        })
    })
}

export const con = () => {
    return dbCon
}