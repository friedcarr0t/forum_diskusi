const express = require('express')
const router = express.Router()

const forumControllers = require('../controllers/forumControllers')

router.get('/diskusi', forumControllers.getDiskusi)
router.post('/diskusi', forumControllers.postDiskusi)
router.get('/diskusi/:id', forumControllers.getDiskusiId)

module.exports = router