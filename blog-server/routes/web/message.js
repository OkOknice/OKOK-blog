let express = require('express')
let router = express.Router()
let gravatar = require('gravatar')

let messageModel = require('../../model/messageModel')

/**
    @params /api/message/add
    @desc 添加用户的留言 
*/
router.post('/add',(req,res) =>{
    let { name,content,email } = req.body
    const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'})
    let message = messageModel.create({
        name,
        content,
        avatar,
        email
    })
    res.send({
        status:1,
        message
    })
})

/**
    @params /api/message/
    @desc 获取用户的留言 
*/
router.get('/',(req,res) =>{
    messageModel.find().sort({
        date:-1
    }).then(message =>{
        if(!message){
            res.send({
                status:0,
                msg:'查无此数据'
            })
        } else {
            res.send({
                status:1,
                message
            })
        }
    })
})

module.exports = router