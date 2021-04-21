<template>
  <div class="footer">
    <el-main class="main">
      <el-row justify="center" type="flex">
        <el-col :span="8" class="item-col">
          <div class="title">OKOK博客前台</div>
          <div class="title">
              OKOK博客后台管理
          </div>
          <div class="title">
            <a href="https://blog.csdn.net/weixin_45459876" class="out-link">CSDN</a>
          </div>
        </el-col>
        <el-col :span="8" class="item-col weside">
          <div class="item">
            <i class="el-icon-caret-right"></i>
            本站已稳定运行1天4时36分22秒
          </div>
          <div class="item">
            <i class="el-icon-caret-right"></i>
            2433131385@qq.com
          </div>
          <div class="item">
            <i class="el-icon-caret-right"></i>
            © okok.cn |
            <a class="out-link" href="http://www.beian.miit.gov.cn"
              >粤ICP备17015355号-1</a
            >
          </div>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
export default {
  name: "footter",
};
</script>

<style lang="scss" scoped>
    .footer{
        padding: 20px;
        text-align: center;
        color: #fff;
        background-color: #555;
        .main{
            width: 70%;
            margin: 0 auto;
            color: #ccc;
            .item-col{
                text-align: left;
                .title,.item{
                    margin-bottom:10px;
                }
                .out-link{
                    color:#ccc;
                    &:hover{
                        color:#fff
                    }
                }
                .weside{
                    font-size:14px;
                }
            }
        }
    }
</style>