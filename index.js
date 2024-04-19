const express = require('express')
require('dotenv').config()
require('./dbConfig')
const app = express()
const mainRouter = require('./routers/mainRouter')
app.use(express.json())
app.use('/', mainRouter)

app.get('/send_request', (req, res)=>{
    res.send("Hi, there is running ")
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on ${process.env.PORT}`)
})
