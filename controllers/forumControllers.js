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

const getMahasiswa = (req, res) => {
    db.query(`select*from mahasiswa`, (err, results) => {
        if (err) {
            console.error('database error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

const postMahasiswa = (req, res) => {
    const { nim, nama } = req.body;

    if (!nim || !nama) {
        return res.status(400).json({ error: "nim dan nama wajib diisi" });
    }

    db.query(
        `insert into mahasiswa (nim, nama) values (?, ?)`,
        [nim, nama],
        (err, result) => {
            if (err) {
                console.error('database error:', err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ error: "nim sudah terdaftar" });
                }
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: "data mahasiswa berhasil disimpan" });
        }
    );
};


module.exports = {
    getDiskusi,
    postDiskusi,
    getDiskusiId,
    getMahasiswa,
    postMahasiswa
}