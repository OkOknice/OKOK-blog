<template>
    <div class="tag">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <img class="card-icon" src="../assets/biaoqian.png" />
                <span class="tag-title">标签名称</span>
            </div>
            <div class="tag-content">
                <el-tag 
                    class="tag-item"
                    v-for="(item,index) in labelList"
                    :key="index"
                    :type="item.type"
                >{{item.name}}</el-tag>
            </div>
         </el-card>
    </div>
</template>

<script>
export default {
    name:'tag',
    data (){
        return {
            labelList:[]
        }
    },
    mounted (){
        this.getLabelList()
    },
    methods:{
        getLabelList(){
            this.$axios.get('/api/category').then(res =>{
                let {category} = res.data
                this.labelList = category
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .tag{
        transition:all .5s;
        .card-icon{
            width: 20px;
            height: 20px;
            margin-right: 10px;
        }
        .tag-title{
            font-size:16px;
            font-weight: bold;
        }
        .tag-item{
            margin-right:15px;
            margin-bottom:10px;
        }
        &:hover{
            box-shadow: 0 15px 30px #00000033;
            transform: translate3d(0, -2px, 0);
        }
    }
</style>