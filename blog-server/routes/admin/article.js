const express = require('express')
const router = express.Router()
const moment = require('moment')
const articleModel = require('../../model/articleModel')


/**
    @param /api/article/
    @desc 显示的所有文章列表
*/
router.get('/',(req,res) =>{
    articleModel.find().sort({
        date:-1
    }).then(article =>{
        if(!article) {
            res.send({
                status:0,
                msg:"没有任何数据"
            })
        }
        res.send({
            status:1,
            data:article
        })
    })
})

/**
    @router /api/article/:id
    @desc 获取单个文章信息的接口
 */
    router.get('/:id',(req,res) =>{
        articleModel.findOne({
            _id:req.params.id
        }).then(article =>{
            if(!article) {
                return res.status(404).json({
                    msg:"查无此内容信息"
                })
            }
            res.json(article)
        })
    })

/**
    @param /api/article/add
    @desc 添加文章列表
*/
router.post('/add',(req,res) =>{
    let { title,content,icon,label,type } = req.body
    let article = articleModel.create({
        label,
        title,
        content,
        icon,
        type
    })
    res.send({
        status:1,
        data:article
    })
})

/**
    @param /api/article/edit/:id
    @desc 编辑的标签列表
*/
router.put('/edit/:id',(req,res) =>{
    let articleList = {}
    let { title,content,icon,label,type } = req.body
    if(title) articleList.title = title
    if(content) articleList.content = content
    if(icon) articleList.icon = icon
    if(label) articleList.label = label
    if(type) articleList.type = type 
    articleList.updateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    articleModel.findOneAndUpdate(
        {_id:req.params.id},
        {$set:articleList,},
        {multi: true},
        // {new:true}
    ).then(article =>{
        res.send({
            status:1,
            data:article
        })
    })
})

/**
    @param /api/article/delete/:id
    @desc 删除的文章列表
*/
router.delete('/delete/:id',(req,res) =>{
    articleModel.findOneAndDelete(
        {_id:req.params.id}
    ).then(article =>{
        res.send({
            status:1,
            date:article
        })
    })
})

require('../file-uploads')(router)
module.exports = router