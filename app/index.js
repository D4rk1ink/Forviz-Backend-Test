import express from './config/express'
import * as database from './config/database'
import * as constants from './constants'
import * as searchController from './controlles/search.controller'

export class Server {

    constructor () {
        this.app = null
    }

    static bootstrap () {
        new Server().start()
    }

    start () {
        this.app = express()
        this.setDatabase()
        this.setRoutes()
        this.app.listen(constants.PORT, () => {
            console.log('START SERVERR')
        })
    }

    setDatabase () { 
        database.connent()
        // database.initData()
    }

    setRoutes () {
        this.app.get('/', (req, res) => {
            res.json({ 'me': 'D@rkL!nk' })
        })
        this.app.get('/search', searchController.search)
        this.app.use((req, res) => {
            res
                .status(404)
                .json({ err: 'API not fond :(' })
        })
    }
}
