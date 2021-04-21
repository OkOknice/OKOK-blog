const express = require('express')
const router = express.Router()

const categoryModel = require('../../model/categoryModel')


/**
    @param /api/category/
    @desc 显示的所有标签列表
*/
router.get('/',(req,res) =>{
    categoryModel.find().then(category =>{
        if(!category) {
            res.send({
                status:0,
                msg:"没有任何数据"
            })
        }
        res.send({
            status:1,
            category
        })
    })
})

/**
    @param /api/category/add
    @desc 添加的标签列表
*/
router.post('/add',(req,res) =>{
    let { name,type } = req.body
    categoryModel.findOne({name}).then(category =>{
        if(category){
            res.send({
                status:0,
                msg:'标签已被创建'
            })
        } else {
            let category = categoryModel.create({name,type})
            res.send({
                status:1,
                data:category
            })
        }
    })
    
})

/**
    @param /api/category/edit/:id
    @desc 编辑的标签列表
*/
router.put('/edit/:id',(req,res) =>{
    let nameList = {}
    let { name } = req.body
    if(name) nameList.name = name
    categoryModel.findOneAndUpdate(
        {_id:req.params.id},
        {$set:nameList},
        {new:true}
    ).then(category =>{
        res.send({
            status:1,
            data:category
        })
    })
})

/**
    @param /api/category/delete/:id
    @desc 删除的标签列表
*/
router.delete('/delete/:id',(req,res) =>{
    categoryModel.findOneAndDelete(
        {_id:req.params.id}
    ).then(category =>{
        res.send({
            status:1,
            date:category
        })
    })
})
module.exports = router