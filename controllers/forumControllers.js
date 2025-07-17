const {db} = require('../models/db')

const getDiskusi = (req, res) => {
    db.query(`select*from diskusi`, (err, result) => {
        if(err){
            console.error('database error:', err)
            return res.status(500).json({error: err.message})
        }
        res.json(result)
    })
}

module.exports = {
    getDiskusi
}