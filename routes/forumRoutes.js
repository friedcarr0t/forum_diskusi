const express = require('express')
const router = express.Router()

const forumControllers = require('../controllers/forumControllers')

router.get('/diskusi', forumControllers.getDiskusi)
router.post('/diskusi', forumControllers.postDiskusi)

module.exports = router