/**
 该模块是引入数据库模块
 */

//引入数据库模块 mongoose
const mongoose = require('mongoose')
mongoose.set('useCreateIndex',true); 
mongoose.set('useFindAndModify', false)

//设置端口号
const PORT = 27017

//操作数据库
//创建一个promise实例对象
module.exports =  new Promise((resolve,reject) =>{
    //连接数据库
    mongoose.connect(`mongodb://localhost:${PORT}/my_blog`,{ useNewUrlParser: true,useUnifiedTopology: true })
    //绑定监听数据库
    mongoose.connection.once('open',() =>{
        console.log('数据库连接成功啦~~~')
    })
})