const express = require('express')
const router = express.Router()

const forumControllers = require('../controllers/forumControllers')

router.get('/diskusi', forumControllers.getDiskusi)

module.exports = router