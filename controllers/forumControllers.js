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

const postDiskusi = (req, res) => {
    const {nim, judul, isi} = req.body
    if(!nim || !judul || !isi){
        return res.status(400).json({error: "semua field harus diisi"})
    }
    db.query(`insert into diskusi (nim, judul, isi) values (?, ?, ?)`,
        [nim, judul, isi], (err, result) => {
            if(err){
                console.error('database error:', err)
                return res.status(500).json({error: err.message})
            }
            res.status(201).json({message: "topik diskusi sudah disimpan ke database"})
        }
    )
}



module.exports = {
    getDiskusi,
    postDiskusi
}