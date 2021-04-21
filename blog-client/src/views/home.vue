<template>
    <div class="home">
        <el-row justify="center" type="flex" class="home-content">
            <el-col :span="12">
                <div class="swiper-box">
                    <swiper :options="swiperOption">
                        <swiper-slide>
                            <img src="../assets/1.jpg" alt="">
                        </swiper-slide>
                        <swiper-slide>
                            <img src="../assets/2.jpg" alt="">
                        </swiper-slide>
                        <swiper-slide>
                            <img src="../assets/3.jpg" alt="">
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                </div>
                <ListCard 
                    v-for="item in articleInfo"
                    :key="item._id"
                    :item="item"
                ></ListCard>
            </el-col>
            <el-col :span="6">
                <Tag class='home-tag'></Tag>
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
    name:'home',
    components:{
        Tag,
        LeaveMessage,
        ListCard
    },
    data (){
        return {
            swiperOption:{
                pagination:'.swiper-pagination',
                loop: true,
                clickable: true,
                paginationType: 'bullets',
                autoplay:true,
                observeParents: true,
                observer: true
            },
            articleInfo:[]
        }
    },
    mounted (){
        this.getAllarticleInfo()
    },
    methods:{
        getAllarticleInfo (){
            this.$axios.get('/api/article').then(res =>{
                // console.log(res)
                let { data } = res.data
                this.articleInfo = data
                // console.log(this.articleInfo)
            })
        }
    }
    
}
</script>

<style lang="scss" scoped>
    .home{
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
        .home-tag{
            margin-bottom:30px;
        }
    }
</style>