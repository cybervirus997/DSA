const express = require('express')
require('dotenv').config()
const connect = require('./configs/db')
const userController = require('./controllers/user.controller')
const lectureController = require('./controllers/lecture.controller')
const app = express()

app.use(express.json())

app.use("/user",userController)
app.use("/lecture",lectureController)

app.listen(process.env.SERVER_PORT,async()=>{
      
      await connect()
      console.log(`listening to port ${process.env.SERVER_PORT}`)
})