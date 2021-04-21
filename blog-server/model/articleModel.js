const mongoose = require('mongoose')
const moment = require('moment')
let Schema = mongoose.Schema

//创建一个文章对象
let articleSchema = new Schema({
    label:{
        type:String
    },
    title:{
        type:String
    },
    icon:{
        type:String
    },
    content:{
        type:String
    },
    type:{
        type:String
    },
    date:{
        type:Date,
        default:() => moment(new Date()).format('YYYY-MM-DD HH:mm:ss') 
    },
    updateTime:{
        type:Date,
        default:() => moment(new Date()).format('YYYY-MM-DD HH:mm:ss') 
    }
})


module.exports = articleModel = mongoose.model('article',articleSchema)