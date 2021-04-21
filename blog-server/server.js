const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//引入数据库
const db = require('./db/index')

//使用 body-parser 中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//声明使用静态中间件
app.use(express.static('public'))

//引入路由
const user = require('./routes/admin/user')
const category = require('./routes/admin/category')
const article = require('./routes/admin/article')
const message = require('./routes/web/message')
const articleInfo = require('./routes/web/articleInfo')

db.then(res =>{
    console.log(res)
    
})
app.use('/api/user',user)
app.use('/api/category',category)
app.use('/api/article',article)
app.use('/api/message',message)
app.use('/api',articleInfo)


app.get('/',(req,res) =>{
    res.send({
        msg:'欢迎来到OKOK博客接口'
    })
})



app.listen(4000,() =>{
    console.log('服务器已经启动，请访问http://localhost:4000')
})