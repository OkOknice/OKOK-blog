<template>
  <div class="userInfo-container">
    <el-row>
      <el-col :span="8" :xs="24">
        <el-card class="box-card-left">
          <div slot="header" class="clearfix">
            <span>我的信息</span>
          </div>
          <div class="text item">
            <div class="box-center">
              <img :src="user.avatar" alt="" />
            </div>
            <div class="box-center">
              <div class="user-name text-center">{{user.name}}</div>
              <div class="user-role text-center text-muted">{{user.identity === 'manager' ? '管理者' : '普通用户'}}</div>
              <div class="user-role text-center text-muted">电子商务专业</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16" :xs="24">
        <el-card class="box-card-right">
          <div slot="header" class="clearfix">
            <span>我的项目经历</span>
          </div>
          <div class="block">
            <el-timeline>
              <el-timeline-item timestamp="2021/4/12" placement="top">
                <el-card>
                  <h4 class="title">更新 项目时间</h4>
                  <p>{{user.name}} 提交于 2021/4/12 20:46</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2021/4/12" placement="top">
                <el-card>
                  <h4 class="title">更新 项目时间</h4>
                  <p>{{user.name}} 提交于 2021/4/3 20:46</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2021/4/12" placement="top">
                <el-card>
                  <h4 class="title">更新 项目时间</h4>
                  <p>{{user.name}} 提交于 2021/4/2 20:46</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    name:'userInfo',
    computed:{
        user(){
            return this.$store.state.user
        }
    }
};
</script>

<style lang="scss" scoped>
.userInfo-container {
  .box-card-left {
    margin-top: 50px;
    margin-left: 50px;
    .item {
      margin-bottom: 20px;
      .box-center {
        width: 100px;
        height: 100px;
        margin: 0 auto;
        display: table;
        padding-top: 10px;
        img {
            border-radius: 50%;
          width: 100%;
          height: 100%;
        }
        .text-center {
          text-align: center;
        }
        .user-role {
          padding-top: 10px;
          font-weight: 400;
          font-size: 14px;
        }
        .user-name {
          font-weight: bold;
        }
      }
      .next-title {
        margin-top: 20px;
        color: #606266;
        margin-left: 4px;
        .next-bro {
          font-size: 14px;
          font-weight: bold;
          padding: 15px 0;
        }
      }
    }
    .text-muted {
      color: #777;
    }
  }
  .box-card-right {
    margin: 50px;
    .block{
        color:#777;
        .title{
            margin-bottom:15px;
            color:#777;
        }
    }
  }
}
</style>