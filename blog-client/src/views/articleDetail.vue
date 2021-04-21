<template>
    <div class="article-detail">
        <el-row justify="center" type="flex">
            <el-col :span="12">
                <div class="detail-box">
                    <div class="banner">
                        <img :src="articleDetail.icon" alt="">
                    </div>
                    <hr>
                    <div class="content-box">
                        <div class="title">
                            <h2>{{articleDetail.title}}</h2>
                        </div>
                        <div class="tag">
                            <div class="time">
                                <i class="el-icon-time"></i> :
                                <span>{{articleDetail.updateTime | date("YYYY-MM-DD")}}</span>
                            </div>
                            <div class="label">
                                <img class="img" src="../assets/tag.png" /> :
                                <el-tag :type="articleDetail.type">{{articleDetail.label}}</el-tag>
                            </div>
                        </div>
                        <div class="content">
                            <mavon-editor
                                class="md"
                                :value="articleDetail.content"
                                :subfield = "false"
                                :defaultOpen = "'preview'"
                                :toolbarsFlag = "false"
                                :editable="false"
                                :scrollStyle="true"
                                :ishljs = "true"
                            ></mavon-editor>
                        </div>
                    </div>
                </div>
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
export default {
    name:'articleDetail',
    components:{
        Tag,
        LeaveMessage
    },
    data (){
        return {
            articleDetail:{},
            id:''
        }
    },
    mounted (){
        this.id = this.$route.params.id
        this.id && this.getArticleDetail(),
        
        console.log(this.id)
    },
    methods:{
        getArticleDetail (){
            this.$axios.get(`/api/article/${this.id}`).then(res =>{
                // console.log(res)
                this.articleDetail = res.data
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .article-detail{
        // margin-left:50px;
        .detail-box{
            margin-right:30px;
            .banner{
                width:100%;
                height:280px;
                margin-bottom:30px;
                img{
                    width:100%;
                    height:100%;
                }
            }
            .content-box{
                margin-top:20px;
                .title{
                    h2{
                        font-size:26px;
                        font-weight:bold;
                        text-align: center;
                        color:#aaa;
                    }
                }
                .tag{
                    display:flex;
                    justify-content: center;
                    align-items: center;
                    margin:15px 0px;
                    .label{
                        display: inline-block;
                        margin-left:20px;
                        .img{
                            width:18px;
                            height:18px;
                        }
                    }
                }
                .content{
                    line-height: 25px;
                }
            }
        }
        
        .home-tag{
            margin-bottom:30px;
        }
    }
</style>