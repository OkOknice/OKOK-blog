<template>
    <div class="contanier">
        <el-form :model="loginUser" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="loginForm">
            <div class="form-title">
                <h3 class="title">OKOK 后台管理</h3>
            </div>
            <el-form-item label="邮箱" prop="email" class="form-item">
                <el-input type="email" v-model="loginUser.email" placeholder="请输入邮箱..."></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" class="form-item">
                <el-input type="password" v-model="loginUser.password" placeholder="请输入密码..."></el-input>
            </el-form-item>
            <el-form-item class="form-item">
                <el-button type="primary" @click="submit('ruleForm')" class="from-btn">登录</el-button>
            </el-form-item>
            <el-form-item class="form-item">
                <div class="toRegister">
                    <p>还没有账号？现在<router-link to='/register'>注册</router-link></p>
                </div>
            </el-form-item>
            
        </el-form>
    </div>
</template>
<script>
import jwt_decode from 'jwt-decode'
export default {
    name:'login',
    data (){
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
        return {
            loginUser:{
                email:'',
                password:'',
            },
            rules:{
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
                ]
            }
        }
    },
    methods:{
        submit (formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('/api/user/login',this.loginUser).then(res =>{
                        // console.log(res)
                        const { token } = res.data
                        //将 token 存入 localstorage 中
                        localStorage.setItem('okokToken',token)
                        this.$message({
                            message:'登录成功！！！',
                            type:'success'
                        })
                        //解析 token 的信息
                        let decode = jwt_decode(token)
                        console.log(decode)
                        //将 token 解析的信息传入 vuex 中
                        this.$store.dispatch('set_isAuthorzation',!this.isEmpty(decode))
                        this.$store.dispatch('set_user',decode)
                        //登录成功之后跳转到首页
                        this.$router.push('index')
                    })
                } else {
                    this.$message({
                        message:'登录失败！！！',
                        type:'error'
                    })
                    return false;
                }
            });
        },
        //该方法是判断是否为空值
        isEmpty(value){
            return (
                value === undefined ||
                value === null ||
                (typeof value === "object" && Object.keys(value).length === 0) ||
                (typeof value === "string" && value.trim().length === 0)
            );
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
        .loginForm{
            width: 520px;
            max-width: 100%;
            padding: 120px 35px 0;
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
                 .toRegister{
                    text-align: right;
                    font-size: 12px;
                    color: #fff;
                    a{
                        color: #409eff;
                    }
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