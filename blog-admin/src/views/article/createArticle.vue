<template>
  <div class="createArticle">
    <el-row>
      <el-col>
        <div>
          <h1 class="title">{{id ? "编辑" : "新建"}}文章</h1>
        </div>
        <el-form ref="form" :model="articleForm" label-width="80px" size="mini">
          <el-form-item label="所属分类">
            <el-select v-model="articleForm.label" placeholder="请选择标签分类">
              <el-option
                v-for="item in labelList"
                :key="item._id"
                :label="item.name"
                :value="item.name"
              ></el-option>
              <!-- <el-option label="this" value="this"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item
              label="标签颜色"
              prop="type"
          >
              <el-select v-model="articleForm.type" placeholder="请选择标签颜色">
                  <el-option label="蓝色"  value=""></el-option>
                  <el-option label="绿色"  value="success"></el-option>
                  <el-option label="灰色"  value="info"></el-option>
                  <el-option label="橙色"  value="warning"></el-option>
                  <el-option label="红色"  value="danger"></el-option>
                  <!-- <el-option label="this" value="this"></el-option> -->
              </el-select>
          </el-form-item>
          <el-form-item label="文章标题" size="mini">
            <el-input v-model="articleForm.title" class="input"></el-input>
          </el-form-item>
          <el-form-item label="缩略图" class="upload">
            <el-upload 
                action="/api/article/img/upload" 
                list-type="picture-card" 
                auto-upload
                :show-file-list="false"
                :http-request="upLoad"
                class="avatar-uploader"
            >
                <img
                    v-if="articleForm.icon"
                    class="el-upload-list__item-thumbnail avatar"
                    :src="articleForm.icon"
                    alt=""
                />
                <i class="el-icon-plus avatar-uploader-icon" v-else></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="详情">
            <div>
              <mavon-editor
                v-model="articleForm.content"
                code_style="monokai-sublime"
                :ishljs="true"
                ref="md"
                @imgAdd="$imgAdd"
              ></mavon-editor>
            </div>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "createArticle",
  data() {
    return {
      articleForm: {},
      labelList: [],
      id:''
    };
  },
  mounted() {
    this.getLabelList();
    // console.log(this.$route.params.id)
    //获取路由参数
    this.id = this.$route.params.id
    this.id && this.getArticleInfo()
  }, 
  methods: {
    //获得文章信息
    getArticleInfo (){
      this.$axios.get(`/api/article/${this.id}`).then(res =>{
        // console.log(res)
        this.articleForm = res.data
      })
    },
    //将缩略图的照片上传到服务器
    upLoad (f){
        let formData = new FormData()
        formData.append('image',f.file)
        this.$axios.post(f.action,formData).then(res =>{
             let { data } = res.data;
             console.log(data.url)
             this.articleForm.icon = data.url
        })
    },
    //提交文章信息
    onSubmit() {
      //判断提交的信息是否为空
      if(!this.articleForm.content || this.articleForm.content.trim() === ''){
        this.$message({
              type: "warning",
              message: "内容不能为空",
        });
        return
      } else {
         if (this.id) {//有id则是修改信息
          this.$axios.put(`/api/article/edit/${this.id}`,this.articleForm).then(() =>{
              this.$message({
                type: "success",
                message: "修改成功",
              });
              this.$router.push('/article/articleList')
          })
        } else {//没有新增信息
          this.$axios.post("/api/article/add", this.articleForm).then(() => {
            this.$message({
              type: "success",
              message: "保存成功",
            });
            this.$router.push('/article/articleList')
          });
        }
      }
     
    },
    //获取标签列表
    getLabelList() {
      this.$axios.get("/api/category").then((res) => {
        let { category } = res.data;
        this.labelList = category;
      });
    },
    //将富文本中的图片上传到服务器
    $imgAdd(pos, $file) {
      const formData = new FormData();
      formData.append("image", $file);
      this.$axios.post("/api/article/img/upload", formData).then((res) => {
        console.log(res);
        let { data } = res.data;
        this.$refs.md.$img2Url(pos, data.url);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
    .createArticle {
        padding: 30px 50px;
        .title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 30px;
        }
        .input {
            width: 400px;
            height: 50px;
        }
    }
</style>