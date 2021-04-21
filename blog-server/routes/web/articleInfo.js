const express = require('express')
const router = express.Router()
const articleModel = require('../../model/articleModel')

/**
    @param /api/recordLife/
    @desc 获取生活小记文章信息
*/

router.get('/recordLife',(req,res) =>{
    articleModel.find({
        label:'生活小记'
    }).sort({
        date:-1
    }).then(article =>{
        if(article) {
            res.send({
                status:1,
                article
            })
        }
    })
})

/**
    @param /api/itArticle/
    @desc 获取it文章信息
*/

router.get('/itArticle',(req,res) =>{
    articleModel.find({
        label:{$ne:'生活小记'}
    }).sort({
        date:-1
    }).then(article =>{
        if(article) {
            res.send({
                status:1,
                article
            })
        }
    })
})


module.exports = router