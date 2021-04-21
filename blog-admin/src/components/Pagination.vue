<template>
    <div class="block">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pagination.page_index"
            :page-size="pagination.page_size"
            layout="total, prev, pager, next, jumper"
            :total="pagination.total">
        </el-pagination>
    </div>
</template>

<script>
export default {
  name: "pagination",
  props:{
      allTotalData:Array
  },
  data (){
      return {
          pagination:{
              total:1
          },
          tableData:[]
      }
  },
  mounted (){
        this.setPagination()
        console.log(this.pagination)
        
  },
  methods:{
    //设置分页信息
    setPagination (){
        // 总页数
        this.pagination.total = this.allTotalData.length;
        this.pagination.page_index = 1
        this.pagination.page_size = 5
        // 设置默认分页数据
        this.tableData = this.allTotalData.filter((item, index) => {
            return index < this.pagination.page_size
        })
        this.$emit('changTableData',this.tableData)
    },
    //显示每页几条信息
    handleSizeChange (page_size){
        this.pagination.page_index = 1
        this.pagination.page_size = page_size
        this.tableData = this.allTotalData.filter((item,index) =>{
            return index < page_size
        })

    },
    //显示当前第几页
        handleCurrentChange (page){
        // 当前页
        let sortnum = this.pagination.page_size * (page - 1);
        let table = this.allTotalData.filter((item, index) => {
            return index >= sortnum;
        });
        // 设置默认分页数据
        this.tableData = table.filter((item, index) => {
            return index < this.pagination.page_size;
        });
        this.$emit('changTableData',this.tableData)
    }
  }
}
</script>

<style lang="scss" scoped>
    .block{
        margin-top:10px;
        float:right;
    }
</style>