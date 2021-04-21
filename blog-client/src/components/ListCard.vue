<template>
    <div class="listCard">
        <div class="content-box" v-if="item.label === '生活小记'">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span class="title">{{item.title}}</span>
                </div>
                <div class="content">
                    <p>{{item.content}}</p>
                </div>
                <div class="content-bottom">
                    <div class="left">
                        <div class="time item">
                            <i class="el-icon-time"></i>
                            <span>{{item.updateTime | date("YYYY-MM-DD")}}</span>
                        </div>
                        <div class="label">
                            <img class="tag" src="../assets/tag.png" /> :
                            <el-tag :type="item.type">{{item.label}}</el-tag>
                        </div>
                    </div>
                    <div class="right" @click="$router.push(`/articleDetail/${item._id}`)">
                        <el-tag>阅读全文<i class="el-icon-arrow-right"></i></el-tag>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="content-box" v-else>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span class="title">{{item.title}}</span>
                </div>
                <div class="content article">
                    <div class="content-tag">
                        <div class="time item">
                            <i class="el-icon-time"></i> :
                            <span>{{item.updateTime | date("YYYY-MM-DD")}}</span>
                        </div>
                        <div class="label">
                            <img class="tag" src="../assets/tag.png" /> :
                            <el-tag :type="item.type">{{item.label}}</el-tag>
                        </div>
                    </div>
                    <div class="content-center">
                        <div class="content-img">
                            <img :src="item.icon" alt="">
                        </div>
                        <div class="article-box">
                            <div class="article-content">
                                <p class="passage">{{item.content}}</p>
                            </div>
                            <div class="article-btn" @click="$router.push(`/articleDetail/${item._id}`)">
                                <el-tag>阅读全文<i class="el-icon-arrow-right"></i></el-tag>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    name:'listCard',
    props:{
        item:{
            type:Object
        }
    }
}
</script>

<style lang="scss" scoped>
    .listCard{
        .content-box{
            margin-right:50px;
            margin-bottom: 20px;
            transition:all .5s;
            .title{
                font-size:20px;
                font-weight: bold;
            }
            .content-tag{
                margin-bottom:10px;
                .label{
                    display: inline-block;
                    margin-left:20px;
                    .tag{
                        width:18px;
                        height:18px;
                    }
                }
            }
            
            .content{
                margin-bottom: 20px;
                border-bottom: 1px solid #eee;
                line-height: 30px;
                p{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    // 多行省略号样式
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                }
                
            }
            .content-bottom{
                display:flex;
                justify-content: space-between;
                .left{
                    display: flex;
                    align-items: center;
                }
                .item{
                    font-size:14px;
                    color:#bbb;
                    display: inline-block;
                    span{
                        margin-left:10px;
                    }
                }
                .author{
                    margin-left:20px;
                }
                .comment{
                    margin-left:20px;
                }
                .right{
                    cursor: pointer;
                    font-size: 16px;
                }
            }
            .article{
                display: flex;
                flex-direction: column;
                border:none;
                .content-tag{
                    display: flex;
                    .label{
                        margin-left:15px;
                    }
                    span{
                        margin-left:10px;
                    }
                    .item{
                        font-size:16px;
                    }
                    .label{
                        .tag{
                            display: inline-block;
                            width:18px;
                            height:18px;
                        }
                    }
                }
                .content-center{
                    flex:1;
                    display: flex;
                    .content-img{
                        width:250px;
                        height:150px;
                        img{
                            width:100%;
                            height:100%;
                        }
                    }
                    .article-box{
                        flex:1;
                        display:flex;
                        flex-direction: column;
                        margin-left:8px;
                        .article-content{
                            .passage{
                                color:#aaa;
                            }
                        }
                        .article-btn{
                            text-align: right;
                            font-size:16px;
                            cursor: pointer;
                        }
                    }
                }
            }
            &:hover{
                box-shadow: 0 15px 30px #00000033;
                transform: translate3d(0, -2px, 0);
            }
        }
    }
</style>