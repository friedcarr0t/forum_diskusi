const express = require('express');
const router = express.Router();
const komentarControllers = require('../controllers/komentarControllers');

router.get('/komentar/:id_diskusi', komentarControllers.getKomentarByDiskusi);
router.post('/komentar', komentarControllers.postKomentar);

module.exports = router;
