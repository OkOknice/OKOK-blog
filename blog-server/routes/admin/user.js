const express = require('express')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router({
    mergeParams: true,
})

//引入 userModel 模块
const userModel = require('../../model/userModel')

/**
    @param /api/user/test
    @desc 这是一个测试的接口
*/
router.get('/test',(req,res) =>{
    res.send({
        status:1,
        data:"测试接口成功"
    })
})


/**
    @param /api/user/register
    @desc 创建注册的接口
*/
router.post('/register',(req,res) =>{
    console.log(req.body)
    let { email,username,password,identity } = req.body
    userModel.findOne({email}).then(user =>{
        if(user) {
            res.send({
                status:0,
                msg:'该邮箱已被注册过了'
            })
        } else {
            const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'})
            let user = userModel.create({
                email,
                username,
                password,
                identity,
                avatar
            })
            res.json({user})
        }
    })
})

/**
    @param /api/user/login
    @desc 创建登录的接口
*/
router.post('/login',(req,res) =>{
    let {email,password} = req.body
    userModel.findOne({email}).then(user =>{
        //查询数据库
        if(!user){
            res.status(404).json({
                msg:"用户不存在！"
            })
        } 
        if(bcrypt.compareSync(password,user.password)) {
            //加入token
            let auth = user.identity === 'manager' ? true :false
            const rule = {
                id:user._id,
                name:user.username,
                identity:user.identity,
                avatar: user.avatar,
                auth
            }
            jwt.sign(rule,"primaryKey",{expiresIn: 3600*24*30 },(err,token) =>{
                res.send({
                    success:true,
                    token:"Bearer " + token
                })
            })
        } else {
            res.send({ 
                status:0,
                msg:"密码错误"
            })
        }
    })
})

/**
    @param /api/user/
    @desc 获取用户列表
*/

router.get('/',(req,res) =>{
    userModel.find().then(user =>{
        if(!user) {
            res.send({
                status:0,
                msg:"没有任何数据"
            })
        } else {
            res.send({
                status:1,
                data:user
            })
        }
    })
})

/**
    @param /api/user/
    @desc 获取单个用户信息
*/
router.get('/:id',(req,res) =>{
    userModel.findOne({
        _id:req.params.id
    }).then(user =>{
        if(!user) {
            return res.status(404).json({
                msg:"查无此内容信息"
            })
        }
        res.json(user)
    })
})

/**
    @param /api/user/edit/:id
    @desc 修改用户列表
*/

router.put('/edit/:id',(req,res) =>{
    let userList = {}
    let { email,username,password,identity } = req.body
    if(email) userList.email = email
    if(username) userList.username = username
    if(password) userList.password = password
    if(identity) userList.identity = identity
    userModel.findOneAndUpdate(
        {_id:req.params.id},
        {$set:userList},
        {multi: true}
    ).then(user =>{
        res.send({
            status:1,
            data:user
        })
    })
})

/**
    @param /api/user/delete/:id
    @desc 修改用户列表
*/
router.delete('/delete/:id',(req,res) =>{
    userModel.findOneAndDelete(
        {_id:req.params.id}
    ).then(user =>{
        res.send({
            status:1,
            date:user
        })
    })
})
module.exports = router
