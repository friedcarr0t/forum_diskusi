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

const getDiskusiId = (req, res) => {
    const {id} = req.params
    
    db.query(`select*from diskusi where id = ?`,
        [id], (err, result) => {
            if(err){
                console.error('Database error', err);
                return res.status(500).json({error: "masalah database atau koneksi"})
            }
            if(result.length === 0){
                return res.status(404).json({error: "data tidak ditemukan"});
            } else {
                return res.status(200).json(result[0]);
            }
        }
    )
}

module.exports = {
    getDiskusi,
    postDiskusi,
    getDiskusiId
}