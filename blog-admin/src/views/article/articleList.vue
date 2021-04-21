<template>
  <div class="articleList">
    <el-row>
      <el-col :span="24">
        <div class="title">文章列表</div>
        <el-table :data="articleList" style="width: 100%" border>
          <el-table-column label="ID"  align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row._id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="文章类别" align="center">
              <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.label}}</span>
            </template>
          </el-table-column>
          <el-table-column label="文章标题" align="center">
              <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="创建时间" align="center">
            <template scope="scope">
              {{ scope.row.date | date("YYYY-MM-DD HH:mm:ss") }}
            </template>
          </el-table-column>
          <el-table-column prop="date" label="最后更新时间" align="center" sortable>
            <template scope="scope">
              {{ scope.row.updateTime ? formatDateTime(scope.row.updateTime) : scope.row.date  }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center"  v-if="user.auth">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <Pagination 
          @changTableData="changTableData" 
          :allTotalData="allTotalData" 
          v-if="allTotalData.length>0"
        ></Pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Pagination from '../../components/Pagination'
export default {
  name: "articleList",
  components:{
    Pagination
  },
    data (){
      return {
            articleList:[],
            articleForm: {
              label: "",
              title: "",
              content: "",
              icon:''
            },
            allTotalData:[]
        }
    },
    computed:{
      user (){
        return this.$store.state.user
      }
    },
    mounted (){
        this.getArticleList()
        this.changTableData()
    },
    methods:{
        //获取所有文章列表
        getArticleList (){
            this.$axios.get('/api/article',this.articleList).then(res =>{
                console.log(res)
                let {data} = res.data
                this.allTotalData = data
            })
        },
        //编辑文章信息
        handleEdit (row){
          //将 row._id 进行传参到路由
          this.$router.push(`/article/editArticle/${row._id}`)
          console.log(row)
        },
        //删除文章信息
        handleDelete (row){
          // console.log(row)
          this.$confirm("是否确定要删除这篇文章?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() =>{
            this.$axios.delete(`/api/article/delete/${row._id}`).then(() =>{
              this.$message({
                type:'success',
                message:'删除成功'
              })
              this.getArticleList()
            })
            
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
        });
          
        },
        changTableData (tableData){
        // console.log(tableData)
        this.articleList = tableData
      },
      formatDateTime (inputTime) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' '+ h + ':' + minute + ':' + second;
      }
    }
};
</script>

<style lang="scss" scoped>
    .articleList{
        padding:30px 50px;
        .title{
            font-size:20px;
            font-weight: bold;
            margin-bottom:30px;
        }
    }
</style>