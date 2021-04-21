<template>
    <div class="it-article">
        <el-row justify="center" type="flex" class="home-content">
            <el-col :span="12">
                <ListCard
                    v-for="item in itArticleList"
                    :key="item._id"
                    :item="item"
                ></ListCard>
            </el-col>
            <el-col :span="6">
                <Tag class='it-article-tag'></Tag>
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
            itArticleList:[]
        }
    },
    mounted (){
        this.getItArticleList()
    },
    methods:{
        getItArticleList (){
            this.$axios.get('/api/itArticle/').then(res =>{
                let { article } = res.data
                this.itArticleList = article
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .it-article{
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
        .it-article-tag{
            margin-bottom:30px;
        }
    }
</style>