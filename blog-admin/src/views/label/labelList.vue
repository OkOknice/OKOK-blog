<template>
  <div class="labelList">
    <el-row>
      <el-col :span="24">
        <div class="title">标签列表</div>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column label="ID" width="400" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row._id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="分类名称" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.name }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" v-if="user.auth">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row)"
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
    <SetLabel :isShow="isShow" :editNameList="editNameList" @updateList="updateList"></SetLabel>
  </div>
</template>

<script>
import Pagination from '../../components/Pagination'
import SetLabel from '../../components/SetLabel'
export default {
  name: "labelList",
  components:{
      SetLabel,
      Pagination
  },
  computed:{
    user (){
      return this.$store.state.user
    }
  },
  data (){
      return {
          tableData:[],
          isShow:{
              show:false
          },
          editNameList:{},
          pagination:{},
          allTotalData:[]
    }
  },
  mounted (){
      this.getCategoryList() 
      this.changTableData()
  },
  methods:{
      //修改完数据数据只有重新刷新
      updateList (){
          this.getCategoryList()
      },
      //获取标签列表
      getCategoryList (){
          this.$axios.get('/api/category').then(res =>{
            //   console.log(res)
            let {category} = res.data
            // this.tableData = category
            this.allTotalData = category
            // console.log(this.allTotalData)
            // this.setPagination()
          })
      },
      changTableData (tableData){
        // console.log(tableData)
        this.tableData = tableData
      },
      //编辑标签列表
      handleEdit (row){
          this.editNameList = {
              _id:row._id,
              name:row.name
          }
          this.isShow.show = true
      },
      //删除标签列表
      handleDelete (row){
          this.$confirm("是否确定要删除这篇文章?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() =>{
            this.$axios.delete(`/api/category/delete/${row._id}`).then(() =>{
              this.$message({
                  type:'success',
                  message:'删除成功'
              })
              
            })
            this.getCategoryList()
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
        });
          
      }
  }
};
</script>

<style lang="scss" scoped>
    .labelList{
        padding:30px 50px;
        .title{
            font-size:22px;
            font-weight: bold;
            margin-bottom:30px;
        }
        .block{
          margin-top:10px;
          float:right;
        }
    }
</style>