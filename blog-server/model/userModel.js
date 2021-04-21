const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
let Schema = mongoose.Schema;

//创建user的约束对象
let usersSchema = new Schema({
    email:{
        type:String,
        required:true,//必须填写
        unique:true//唯一字段
    },
    username:{
        type:String
    },
    password:{
        type:String,
        required:true,
        set (val){
            return bcrypt.hashSync(val,10)
        }
    },
    identity:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    avatar:{
        type:String
    } 
})

module.exports = userModel = mongoose.model('user',usersSchema)