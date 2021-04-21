<template>
  <div class="createUser">
    <el-row>
      <el-col :span="10">
        <div>
          <h1 class="title">{{id ? "编辑" : "添加"}}用户</h1>
        </div>
        <el-form ref="form" :model="userForm" label-width="80px" size="mini">
          <el-form-item label="选择身份" class="form-item">
                <el-select placeholder="请选择" v-model="userForm.identity">
                    <el-option class="title" value="manager" label="管理者"></el-option>
                    <el-option class="title" value="user" label="普通用户"></el-option>
                </el-select>
            </el-form-item>
          <el-form-item label="用户名" size="mini">
            <el-input v-model="userForm.username" class="input"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" size="mini">
            <el-input v-model="userForm.email" class="input"></el-input>
          </el-form-item>
          <el-form-item label="密码" size="mini">
            <el-input v-model="userForm.password" class="input"></el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button class="btn" type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "createUser",
  data() {
    return {
      userForm: {},
      id:''
    };
  },
  mounted() {
    // console.log(this.$route.params.id)
    this.id = this.$route.params.id
    this.id && this.getUserInfo()
  },
  methods: {
      //提交用户信息
      onSubmit (){
          if(this.id){
              this.$axios.put(`/api/user/edit/${this.id}`,this.userForm).then(() =>{
                this.$message({
                    type: "success",
                    message: "修改成功",
                });
                this.$router.push('/admin/userList')
            })
          } else {
              this.$axios.post('/api/user/register',this.userForm).then((res) =>{
                console.log(res)
                let { status } = res.data
                if(status !== 0 ){
                    this.$message({
                    type:'success',
                    message:'添加成功'
                    })
                    this.$router.push('/admin/userList')
                } else {
                    this.$message({
                        type:'error',
                        message:'该用户已存在'
                    })
                }
            })
          }
      },
      //根据id获取用户信息，数据回显
      getUserInfo (){
          this.$axios.get(`/api/user/${this.id}`).then(res =>{
              console.log(res)
              this.userForm = res.data
          })
      }
  }
};
</script>

<style lang="scss" scoped>
    .createUser {
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
        .btn{
            float:right;
        }
    }
</style>