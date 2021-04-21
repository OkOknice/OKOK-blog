<template>
    <div class="contanier">
        <el-form :model="registerUser" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="registerForm">
            <div class="form-title">
                <h3 class="title">OKOK 后台管理</h3>
            </div>
            <el-form-item label="用户名" prop="username" class="form-item">
                <el-input type="text" v-model="registerUser.username" placeholder="请输入用户名..."></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" class="form-item">
                <el-input type="email" v-model="registerUser.email" placeholder="请输入邮箱..."></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" class="form-item">
                <el-input type="password" v-model="registerUser.password" placeholder="请输入密码..."></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="rePassword" class="form-item">
                <el-input type="password" v-model="registerUser.rePassword" placeholder="请确认密码..."></el-input>
            </el-form-item>
            <el-form-item label="选择身份" class="form-item">
                <el-select placeholder="请选择" v-model="registerUser.identity">
                    <el-option class="title" value="manager" label="管理者"></el-option>
                    <el-option class="title" value="user" label="普通用户"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="form-item">
                <el-button type="primary" @click="submit('ruleForm')" class="from-btn">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name:'register',
    data (){
        let checkUserName = (rule,value,callback) =>{
            if(!value) {
                return callback(new Error('用户名不能为空'))
            } else {
                callback()
            }
        }
        let checkEmail = (rule,value,callback) =>{
            if(!value) {
                return callback(new Error('邮箱不能为空'))
            } else {
                callback()
            }
        }
        let checkPassword = (rule,value,callback) =>{
            if(!value) {
                return callback(new Error('请输入密码'))
            } else {
                callback()
            }
        }
        let checkRePassword =  (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.registerUser.password) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        }
        return {
            registerUser:{
                user_name:'',
                email:'',
                password:'',
                rePassword:'',
                identity:''
            },
            value:'',
            rules:{
                username:[
                    {
                        requires:true,
                        validator:checkUserName,
                        trigger: 'blur'
                    }
                ],
                email:[
                    {   
                        requires:true,
                        validator:checkEmail,
                        trigger: 'blur'
                    },
                    {
                        type:'email',
                        message:'请输入正确的邮箱地址',
                        trigger: 'blur'
                    }
                ],
                password:[
                    {
                        requires:true,
                        validator:checkPassword,
                        trigger: 'blur'
                    }
                ],
                rePassword:[
                    {
                        requires:true,
                        validator:checkRePassword,
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods:{
        submit (formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('/api/user/register',this.registerUser).then(res =>{
                        console.log(res)
                        this.$message({
                            message:'注册成功！',
                            type:'success'
                        })
                    })
                    //注册成功之后跳转到登录页面
                    this.$router.push('/login')
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .contanier{
        width:100%;
        min-height:100%;
        background:#2d3a4b;
        overflow: hidden;
        .registerForm{
            width: 520px;
            max-width: 100%;
            padding: 100px 35px 0;
            margin: 0 auto;
            overflow: hidden;
            .form-item{
                padding-right:70px;
                .title{
                    color:#606266
                }
                .from-btn{
                    width:100%;
                    height:100%;
                }
            }
            .form-title{
                .title{
                    font-size: 26px;
                    color: #eee;
                    margin: 0px auto 40px auto;
                    text-align: center;
                    font-weight: bold;
                }
            }
        }
        
    }
</style>