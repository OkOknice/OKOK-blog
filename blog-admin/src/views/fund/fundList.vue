<template>
    <div class="fillcontain">
        <div>
            <el-form
                :inline="true"
                ref="search_data" 
                :model='search_data'
            >
                <el-form-item label="投标时间筛选:">
                    <el-date-picker
                        v-model="search_data.startTime"
                        type="datetime"
                        placeholder="选择开始时间">
                    </el-date-picker> --
                    <el-date-picker
                        v-model="search_data.endTime"
                        type="datetime"
                        placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size ="small" icon="search" @click='onScreeoutMoney'>筛选</el-button>
                </el-form-item>
                 <el-form-item class="btnRight">
                    <el-button type="primary" size ="small" icon="view" @click='onAddProfile'>添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table
                v-if="tableData.length > 0"
                :data='tableData'
                max-height="400"
                border
                fit
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="创建时间"
                    align='center'
                    sortable>
                    <template slot-scope="scope">
                        <el-icon name="time"></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="收支类型"
                    align='center'
                    >
                </el-table-column>
                <el-table-column
                    prop="desc"
                    label="收支描述"
                    align='center'
                    >
                </el-table-column>
                <el-table-column
                    prop="income"
                    label="收入"
                    align='center'
                    > 
                    <template slot-scope="scope">  
                        <span style="color:#00d053">+ {{ scope.row.income }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="expend"
                    label="支出"
                    align='center'
                    >
                    <template slot-scope="scope">  
                        <span style="color:#f56767">- {{ scope.row.expend }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="cash"
                    label="账户现金"
                    align='center'
                    >
                    <template slot-scope="scope">  
                        <span style="color:#4db3ff">{{ scope.row.cash }}</span>
                    </template>
                </el-table-column>
                 <el-table-column
                    prop="remark"
                    label="备注"
                    align='center'
                    >
                </el-table-column>
                <el-table-column
                    prop="operation"
                    align='center'
                    label="操作"
                    width="160">
                    <template slot-scope='scope'>
                        <el-button 
                            type="warning" 
                            icon='edit' 
                            size="small"
                            @click='handleEdit(scope.row)'
                        >编辑</el-button>
                        <el-button 
                            type="danger" 
                            icon='delete' 
                            size="small"
                            @click='handleDelete(scope.row)'
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row>
                <el-col :span="24">
                    <el-pagination
                        class="pagination"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pagination.page_index"
                        :page-sizes="pagination.page_sizes"
                        :page-size="pagination.page_size"
                        :layout="pagination.layout"
                        :total="pagination.total">
                    </el-pagination>
                </el-col>
            </el-row>   
        </div>
        <Dialog :dialog="dialog" :form="form" show="dialog" @update="update"></Dialog>
    </div>
</template>

<script>
import Dialog from '../../components/Dialog'
export default {
    name:'fundList',
    components:{
        Dialog
    },
    data (){
        return {
            tableData:[],
            dialog:{
                show:false,
                title:'',
                option:'edit'
            },
            form:{
                type: "",
                desc: "",
                income: "",
                expend: "",
                cash: "",
                remark: "",
                id: ""
            },
            pagination:{
                page_index: 1, // 当前位于哪页
                total: 0, // 总数
                page_size: 4, // 1页显示多少条
                page_sizes: [4, 8, 12, 16], //每页显示多少条
                layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
            },
            allTotalData:[],
            search_data: {
                startTime: "",
                endTime: ""
            },
            filterTableData: [],
        }
    },
    created (){
        this.getTableData()
    },
    methods:{
        //更新数据
        update (){
            this.getTableData()
        },
        //获得数据
        getTableData (){
            this.$axios.get('/api/profile').then(res =>{
                // this.tableData = res.data
                this.allTotalData = res.data
                this.setPagination()
            })
        },
        setPagination (){
             // 总页数
            this.pagination.total = this.allTotalData.length;
            this.pagination.page_index = 1;
            this.pagination.page_size = 4;
            // 设置默认分页数据
            this.tableData = this.allTotalData.filter((item, index) => {
                return index < this.pagination.page_size;
            });
        },
        //弹出弹框
        onAddProfile (){
            this.dialog = {
                show:true,
                title:'添加资金信息',
                option:'add'
            }
            this.form = {
                type: '',
                desc: '',
                income: '',
                expend: '',
                cash: '',
                remark: '',
                id: ''
            }
        },
        //编辑信息
        handleEdit (row){
            this.dialog = {
                show:true,
                title:'修改资金信息',
                option:'edit'
            }
            this.form = {
                type: row.type,
                desc: row.desc,
                income: row.income,
                expend: row.expend,
                cash: row.cash,
                remark: row.remark,
                id: row._id
            }
        },
        //删除信息
        handleDelete (row){
            this.$axios.delete(`/api/profile/delete/${row._id}`).then(() =>{
                this.$message({
                    message:'删除成功'
                })
                this.getTableData()
            })
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
        } ,
        //时间的筛选
        onScreeoutMoney() {
        // 筛选
        if (!this.search_data.startTime || !this.search_data.endTime) {
            this.$message({
            type: "warning",
            message: "请选择时间区间"
            });
            this.getProfile();
            return;
        }
        const stime = this.search_data.startTime.getTime();
        const etime = this.search_data.endTime.getTime();
        this.allTableData = this.filterTableData.filter(item => {
            let date = new Date(item.date);
            let time = date.getTime();
            return time >= stime && time <= etime;
        });
        // 分页数据
        this.setPagination();
        }  
    }   
}
</script>

<style lang="scss" scoped>
    .fillcontain{
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
        .btnRight{
            float: right;
        }
        .pagination{
            text-align:right;
            margin-top:20px;
        }
    }
</style>