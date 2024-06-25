const express = require('express')
const app = express()
app.use(express.json())
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
app.use(cors())

const port = process.env.PORT




app.use('/api', require('./Routers/AuthRoutes'))


app.listen(port, () => {
    console.log('Server is Live')
})