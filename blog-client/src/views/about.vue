<template>
    <div class="about">
        <el-row justify="center" type="flex">
            <el-col :span="16">
               <div class="about-content">
                    <h4 class="about-title"><i class="el-icon-star-on"></i> 关于自己</h4>
                    <div class="statement">
                        <div class="item">转行前端技术小白，多多指教</div>
                        <div class="item">座右铭：向上的路并不拥挤，而大多数人选择了安逸。</div>
                    </div>
                    <div class="statement">
                        <div class="item">Email：2433131385@qq.com</div>
                        <div class="item">QQ：2433131385</div>
                        <div class="item">CSDN：
                            <a target="_blank" href="https://blog.csdn.net/weixin_45459876">https://blog.csdn.net/weixin_45459876</a>
                        </div>
                    </div>
               </div>
                <div class="about-content">
                    <h4 class="about-title"><i class="el-icon-star-on"></i> 关于博客</h4>
                    <el-card shadow="always">
                        <dl class="dl-blog">
                            <dd>前端技术栈：Vue、Vue-Router、Element-ui、Vue-i18n、axios、swiper</dd>
                        </dl>
                    </el-card>
                </div>
                <div class="about-content">
                    <h4 class="about-title"><i class="el-icon-star-on"></i> 给我留言</h4>
                    <el-card shadow="always">
                        <el-form :model="messageForm" status-icon :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
                            <el-form-item label="姓名" prop="name">
                                <el-input type="text" v-model="messageForm.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email">
                                <el-input type="text" v-model="messageForm.email" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="留言" prop="content">
                                <el-input 
                                    type="textarea" 
                                    v-model="messageForm.content" 
                                    autocomplete="off"
                                    placeholder="请输入内容"
                                ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button class="btn" type="primary" @click="submitForm('ruleForm')">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name:'about',
    data (){
        return {
            messageForm:{
                name:'',
                email:'',
                content:''
            }
        }
    },
    methods:{
        submitForm (ruleForm){
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    this.$axios.post('/api/message/add',this.messageForm).then(() =>{
                        this.$message({
                            type:'success',
                            message:'留言成功！！！'
                        })
                        this.messageForm = {}
                    })
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .about{
        margin-top:50px;
        margin-left:90px;
        .about-content{
            margin-bottom:30px;
            .about-title{
                font-size: 16px;
                font-weight: bold;
                margin-bottom:30px;
            }
        }
        
        .statement {
            border-left: 3px solid #F56C6C;
            padding: 20px;
            background-color: #EBEEF5;
            margin-top: 20px;
            .item{
                margin-top:10px;
            }
        }
        .demo-ruleForm{
            width:400px;
            .btn{
                float: right;
            }
        }
    }
</style>