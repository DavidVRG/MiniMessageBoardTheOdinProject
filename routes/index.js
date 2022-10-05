const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Message = require('../model/message')

router.get('/', async (req, res) => {
    res.render('index')
})

router.get('/messages', async (req, res) => {
    const messages = await Message.find({})
    res.send(messages)
})

router.post('/', async (req, res) => {
    const message = await new Message({message: req.body.message,name:req.body.name})
    
    if(message.name !== '' && message.message !== ''){
        const newMessage = await message.save();
        res.redirect('/')
    }else{
        res.render('index', {
            errorMessage: 'Empty input field!'
        })
    }

})

module.exports = router;