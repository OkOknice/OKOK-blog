<template>
    <div class="createLabel">
        <div class="title">
            新建标签
        </div>
        <el-row>
            <el-col :span="10">
                <el-form :model="createNameList" ref="createNameList" label-width="100px" class="demo-ruleForm">
                    <el-form-item
                        label="标签颜色"
                        prop="type"
                    >
                        <el-select v-model="createNameList.type" placeholder="请选择标签颜色">
                            <el-option label="蓝色"  value=""></el-option>
                            <el-option label="绿色"  value="success"></el-option>
                            <el-option label="灰色"  value="info"></el-option>
                            <el-option label="橙色"  value="warning"></el-option>
                            <el-option label="红色"  value="danger"></el-option>
                            <!-- <el-option label="this" value="this"></el-option> -->
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item
                        label="名称"
                        prop="name"
                    >
                        <el-input type="text" v-model.number="createNameList.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="btn" type="primary" @click="submitForm('createNameList')">添加</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name:'createLabel',
    data (){
        return {
            createNameList: {
                name: '',
                type:''
            }
        }
    },
    methods:{
        submitForm (formName){
            // console.log('111')
             this.$refs[formName].validate((valid) => {
                 if(valid){
                     this.$axios.post('/api/category/add',this.createNameList).then(res =>{
                         let {status,msg} = res.data
                         if(status !== 0) {
                             this.createNameList.name = ' '
                             this.$message({
                                type:"success",
                                message:'添加成功'
                            })
                         } else {
                             this.$message({
                                 type:'warning',
                                 message:msg
                             })
                         }
                         
                     })
                 }
             })
        }
    }
}
</script>

<style lang="scss" scoped>
 .createLabel{
        margin:50px 30px;
        font-size:22px;
        font-weight: bold;
        .title{
            margin-bottom:40px;
        }
        .btn{
            float: right;
        }
    }
</style>