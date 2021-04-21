<template>
    <div class="leaveMessage">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <img class="card-icon" src="../assets/lianjie.png" />
                <span class="leaveMessage-title">最新留言</span>
            </div>
            <div 
                class="leaveMessage-content"
                v-for="item in messageList"
                :key="item._id"
            >
                <div class="avatar">
                    <img src="../assets/logo.png" alt="">
                </div>
                <div class="content-box">
                    <div class="content-header">
                        <div class="username">{{item.name}}</div>
                        <div class="time">{{item.date | date("YYYY-MM-DD")}}</div>
                    </div>
                    <div class="content">
                        {{item.content}}
                    </div>
                </div>
            </div> 
         </el-card>
    </div>
</template>

<script>
export default {
    name:'leaveMessage',
    data (){
        return {
            messageList:[]
        }
    },
    mounted (){
        this.getMessageList()
    },
    methods:{
        getMessageList (){
            this.$axios.get('/api/message').then(res =>{
                // console.log(res)
                let { message } = res.data
                this.messageList = message.splice(0,message.length)
                // console.log(this.messageList)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .leaveMessage{
        transition:all .5s;
        .card-icon{
            width: 20px;
            height: 20px;
            margin-right: 10px;
        }
        .leaveMessage-title{
            font-size:16px;
            font-weight: bold;
        }
        .leaveMessage-item{
            margin-right:15px;
            margin-bottom:10px;
        }
        .leaveMessage-content{
            margin-top:15px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ccc;
            .avatar{
                width:25px;
                height:25px;
                margin-right:15px;
                border-radius: 50%;
                img{
                    width:100%;
                    height:100%;
                }
            }
            .content-box{
                flex: 1;
                display: flex;
                flex-direction: column;
                .content-header{
                    display: flex;
                    justify-content: space-between;
                    .username{
                        font-weight: bold;
                    }
                    .time{
                        font-size:12px;
                        color:#ccc
                    }
                }
                .content{
                    flex:1;
                    margin-top:15px;
                    margin-bottom:10px;
                    width:100%;
                    height:50px;
                    line-height: 20px;
                }
            }
        }
        &:hover{
            box-shadow: 0 15px 30px #00000033;
            transform: translate3d(0, -2px, 0);
        }
    }
</style>