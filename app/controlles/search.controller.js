import { con } from '../config/database'

export const search = (req, res) => {
    const query = req.query
    let condition = ''
    try {
        if (Object.keys(query).length > 0) {
            condition += 'WHERE '
            for (const key in query) {
                if (key === 'radius') {
                    const [latitude, longitude, radius] = query[key].split(',', 3)
                    condition += `ABS(latitude-${latitude}) + ABS(longitude-${longitude}) < ${radius} AND `
                } else if (key === 'amenities') {
                    condition += `LOWER(${key}) LIKE "%${query[key].toLowerCase()}%" AND `
                } else if (key === 'room_price') {
                    const between = query[key].split('-', 2)
                    condition += `${key} BETWEEN ${between[0]} AND ${between[1]} AND `
                } else {
                    condition += `LOWER(${key})="${query[key].toLowerCase()}" AND `
                }
            }
            condition += '1'
        }
        const queryStatement = `SELECT * FROM properties ${condition}`
        con().query(queryStatement, (err, result) => {
            if (err) {
                res.json({ err: err })
            } else {
                res.json(JSON.parse(JSON.stringify(result)))
            }
        })
    } catch (err) {
        res.json({ err: `Hello, I'm bug :)` })
    }
}