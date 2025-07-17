const express = require('express')
const dotenv = require('dotenv')
const db = require('./models/db')
const diskusiRoutes = require('./routes/forumRoutes')
const komentarRoutes = require('./routes/komentarRoutes')

const app = express()
dotenv.config()

app.use(express.json())
app.use('/', diskusiRoutes)
app.use('/', komentarRoutes)

app.listen(3000, () => {
    console.log("Service berjalan di port 3000")
})
