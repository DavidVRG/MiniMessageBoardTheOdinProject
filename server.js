/* ENV CONFIG */
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

/* REQUIRES */
const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')

/* ROUTES */
const indexRouter = require('./routes/index')


/* BASIC SETS */
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayout)
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

/* MONGOOSE/MONGODB */
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => {console.log('MongoDB connected!')})


/* USE ROUTES */
app.use('/', indexRouter)



app.listen(process.env.PORT || 3000)