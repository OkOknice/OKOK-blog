<template>
    <div class="recordLife">
        <el-row justify="center" type="flex" class="home-content">
            <el-col :span="12">
                <ListCard
                    v-for="item in recordArticleList"
                    :key="item._id"
                    :item="item"
                ></ListCard>
            </el-col>
            <el-col :span="6">
                <Tag class='recordLife-tag'></Tag>
                <LeaveMessage></LeaveMessage>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Tag from '../components/Tag'
import LeaveMessage from '../components/LeaveMessage'
import ListCard from '../components/ListCard'
export default {
    name:'itArticle',
    components:{
        Tag,
        LeaveMessage,
        ListCard
    },
    data (){
        return {
            recordArticleList:[]
        }
    },
    mounted (){
        this.getRecordArticle()
    },
    methods:{
        getRecordArticle (){
            this.$axios.get('/api/recordLife').then(res =>{
                // console.log(res)
                let { article } = res.data
                this.recordArticleList = article
            })
        }
    }
    
}
</script>

<style lang="scss" scoped>
    .recordLife{
        margin-top:50px;
        .swiper-box{
            margin-right:50px;
            margin-bottom:20px;
            img{
                display: inline-block;
                width:100%;
                height: 260px;
            }
        }
        .recordLife-tag{
            margin-bottom:30px;
        }
    }
</style>