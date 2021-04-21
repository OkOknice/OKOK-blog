<template>
  <div class="userList">
    <el-row>
      <el-col :span="24">
        <div class="title">用户管理列表</div>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column label="ID" width="400" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row._id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户名称" align="center">
            <template slot-scope="scope">
              <el-popover>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.username }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="用户邮箱" align="center">
            <template slot-scope="scope">
              <el-popover>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.email }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="用户身份" align="center">
            <template slot-scope="scope">
              <el-popover>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.identity }}</el-tag>
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
  </div>
</template>

<script>
import Pagination from '../../components/Pagination'
export default {
  name: "labelList",
  components:{
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
          pagination:{},
          allTotalData:[]
    }
  },
  mounted (){
      this.getUserList(),
      this.changTableData()
  },
  methods:{
      //获取用户列表信息
      getUserList (){
          this.$axios.get('/api/user').then(res =>{
              console.log(res)
              let { data } = res.data
              this.allTotalData = data
          })
      },
      changTableData (tableData){
        // console.log(tableData)
        this.tableData = tableData
      },
      //编辑用户列表信息
      handleEdit (row){
          console.log(row)
          this.$router.push(`/user/editUser/${row._id}`)
      },
      //删除用户列表信息
      handleDelete (row){
          this.$confirm("是否确定要删除这篇文章?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() =>{
            this.$axios.delete(`/api/user/delete/${row._id}`).then(() =>{
              this.$message({
                type:'success',
                message:'删除成功'
              })
              this.getUserList()
            })
            
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
    .userList{
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