const express = require('express')
const cors = require("cors")
const app = express();
const mongoose = require('mongoose')
require("dotenv").config()

const url = process.env.MONGO_URL
mongoose.connect(url)
    .then(console.log("mongoDb server started"))
    .catch("error occured")

const coursesRouter = require('./routes/courses.route')

app.use(cors())
app.use(express.json())
app.use('/api/courses', coursesRouter)
app.all('*', (req, res, next) => {
    res.json({status: "ERROR", data: {msg:"Not Found Url"}}).status(404)
})
app.use((error,req,res,next) => {
    return res.status(error.statusCode || 500).json({status: error.status || "ERROR", data: {msg:error.message}, code:  error.code || 500})
})


app.listen(process.env.PORT || 4000, () => {
    console.log("app is listening on port ", process.env.PORT || 4000);
})

