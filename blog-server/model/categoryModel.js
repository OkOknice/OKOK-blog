const mongoose = require('mongoose')

let Schema = mongoose.Schema

let categorySchema = new Schema({
    name:{
        type:String
    },
    type:{
        type:String
    }
})

module.exports = categoryModel = mongoose.model('category',categorySchema)