<template>
    <div class="setLabel">
        <el-dialog 
            title=" 编辑标签"
            :visible.sync="isShow.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body="false"
        >
            <el-row>
                <el-col :span="18">
                    <el-form :model="editNameList" ref="editNameList" label-width="100px" class="demo-ruleForm">
                        <el-form-item
                            label="名称"
                            prop="name"
                        >
                            <el-input type="text" v-model="editNameList.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="btn" type="primary" @click="submitForm('editNameList')">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:'setLabel',
    props:{
        isShow:{
            type:Object
        },
        editNameList:{
            type:Object
        }
    },
    methods:{
        submitForm (formName){
            // console.log('111')
             this.$refs[formName].validate((valid) => {
                 if(valid){
                     this.$axios.put('/api/category/edit/' + this.editNameList._id,this.editNameList).then(res =>{
                         console.log(res)
                         this.$message({
                             type:"success",
                             message:'修改成功'
                         })
                        
                     })
                     console.log(this.isShow)
                     this.isShow.show = false
                     this.$emit('updateList')
                 }
             })
             
        }
    }
}
</script>

<style lang="scss" scoped>
    .setLabel{
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