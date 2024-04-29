require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const workoutRoute = require('./routes/workoutRoute')

const app = express()

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT)
        console.log('connected to db and started listening to requests on port', process.env.PORT)
    })
    .catch(err => console.log(err))

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/workouts', workoutRoute)