const { db } = require('../models/db');

const getKomentarByDiskusi = (req, res) => {
    const { id_diskusi } = req.params;

    db.query(
        `select komentar.id, komentar.isi, komentar.nim, mahasiswa.nama 
         from komentar 
         join mahasiswa on komentar.nim = mahasiswa.nim 
         where komentar.id_diskusi = ? 
         order by komentar.id asc`,
        [id_diskusi],
        (err, result) => {
            if (err) {
                console.error('database error:', err);
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        }
    );
};

const postKomentar = (req, res) => {
    const { id_diskusi, nim, isi } = req.body;

    if (!id_diskusi || !nim || !isi) {
        return res.status(400).json({ error: "semua field harus diisi" });
    }

    db.query(
        `insert into komentar (id_diskusi, nim, isi) values (?, ?, ?)`,
        [id_diskusi, nim, isi],
        (err, result) => {
            if (err) {
                console.error('database error:', err);
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: "komentar berhasil ditambahkan ke database" });
        }
    );
};

module.exports = {
    getKomentarByDiskusi,
    postKomentar
};
