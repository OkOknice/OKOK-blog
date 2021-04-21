const mongoose = require('mongoose')
const moment = require('moment')
let Schema = mongoose.Schema

let messageSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    content:{
        type:String
    },
    avatar:{
        type:String
    },
    date:{
        type:Date,
        default:() => moment(new Date()).format('YYYY-MM-DD HH:mm:ss') 
    },
})

module.exports = messageModel = mongoose.model('message',messageSchema)