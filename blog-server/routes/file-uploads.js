/**
    文件上传接口
*/

const multer = require('multer')
const path = require('path')
const fs = require('fs')
const dirpath = path.join(__dirname,'..','public/upload')

const storage = multer.diskStorage({
    destination (req,file,cb){
        if(!fs.existsSync(dirpath)){
            fs.mkdir(dirpath,(err) =>{
                if(err) {
                    console.log(err)
                } else {
                    cb(null,dirpath)
                }
            })
        } else {
            cb(null,dirpath)
        }
    },
    filename (req,file,cb){
        var ext = path.extname(file.originalname)
        cb(null,file.fieldname + '-' + Date.now() + ext)
    }
})

const upload = multer({storage})
const uploadSingle = upload.single('image')
module.exports =  fileUpload = (router) =>{
    // 上传图片
  router.post('/img/upload', (req, res) => {
    uploadSingle(req, res, function (err) { //错误处理
      if (err) {
        return res.send({
          status: 0,
          msg: '上传文件失败'
        })
      }
      var file = req.file
      res.send({
        status: 1,
        data: {
          name: file.filename,
          url: 'http://localhost:4000/upload/' + file.filename
        }
      })

    })
  })

  // 删除图片
  router.post('/img/delete', (req, res) => {
    const {name} = req.body
    fs.unlink(path.join(dirPath, name), (err) => {
      if (err) {
        console.log(err)
        res.send({
          status: 0,
          msg: '删除文件失败'
        })
      } else {
        res.send({
          status: 1
        })
      }
    })
  })
}