<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-date-picker type="month" placeholder="选择月份" v-model="filters.time_code"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.table_id" placeholder="报表"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getZhs">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleImp">导入</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->

        <el-table :data="facts" highlight-current-row v-loading="loading" style="width: 100%;">
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="table_code" label="表号" width="100" sortable>
            </el-table-column>
            <el-table-column prop="table_name" label="表名" width="100">
            </el-table-column>
            <!--<el-table-column prop="table_name" label="性别" width="100" :formatter="formatSex" sortable>-->
            <!--</el-table-column>-->
            <el-table-column prop="zbfm_name" label="指标类型" width="100">
            </el-table-column>
            <el-table-column prop="zbzm_name" label="指标名称" width="100" sortable>
            </el-table-column>
            <el-table-column prop="zbzm_unit" label="单位" min-width="100">
            </el-table-column>
            <el-table-column prop="indication_value" label="指标值" min-width="100">
            </el-table-column>
            <el-table-column prop="time_name" label="报告期" min-width="100" sortable>
            </el-table-column>
            <el-table-column prop="region_code" label="单位代码" min-width="100" sortable>
            </el-table-column>
            <el-table-column prop="region_name" label="单位名称" min-width="100">
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--导入界面-->
        <!--新增界面-->
        <el-dialog title="导入" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="报告期">
                    <el-date-picker type="month" placeholder="选择月份" format="yyyyMM" v-model="addForm.time_code"></el-date-picker>
                </el-form-item>
                <el-form-item label="文件">
                    <input type="file" name="datafile" id="datafile">
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
    import {getUserList} from '../../api/api';
    import NProgress from 'nprogress'
    export default {
        data() {
            return {
                filters: {
                    time_code: ''
                },
                loading: false,
                facts: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
                },
                //新增界面数据
                addForm: {
                    time_code: ''
                }
            }
        },
        methods: {
            //性别显示转换
            formatSex: function (row, column) {
                return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getZhs();
            },
            //获取用户列表
            getZhs: function () {
                this.loading = true;
                NProgress.start();
                let url = '/zhs/page/alltime/alltable';
                if (this.page)
                    url = url.replace('page', this.page);
                if (this.filters.time_code)
                    url = url.replace('alltime', this.filters.time_code);
                if (this.filters.table_id)
                    url = url.replace('alltable', this.filters.table_id);
                this.$http.get(url).then(response => {
                    // success callback
                    this.total = response.data.total;
                    this.facts = response.data.facts;
                    this.loading = false;
                    NProgress.done();
                }, response => {
                    // error callback
                    this.loading = false;
                    NProgress.done();
                })
//				let para = {
//					name: this.filters.name
//				};
//				this.loading = true;
//				NProgress.start();
//				getUserList(para).then((res) => {
//					this.users = res.data.users;
//					this.loading = false;
//					NProgress.done();
//				});
            },
            //显示新增界面
            handleImp: function () {
                this.addFormVisible = true;
                this.addForm = {
                    time_code: ''
                };
            },
            addSubmit: function () {
                var formData = new FormData();
                if(this.addForm.time_code){
                    formData.append('time_code', this.addForm.time_code);
                }else{
                    return false;
                }
                if(document.getElementById('datafile').files[0]){
                    formData.append('datafile', document.getElementById('datafile').files[0],document.getElementById('datafile').files[0].value);
                    console.log(document.getElementById('datafile').files[0].value)
                    //filename是键，
                    //file是值（document.getElementById('file').files[0]），就是要传的文件，
                    //test.zip是要传的文件名
                    //FormData对象进行遍历：通过entries()来获取一个迭代器，然后遍历所有的数据
                }else{
                    return false;
                }
                for(var i of formData.entries()){
                    console.log(i[0]+ ', '+ i[1]);//i[0],i[1],下标为零是键，为1是值
                }
                //FormData对象进行遍历:也可以利用values()方法对值进行遍历
                for(var value of formData.values()){
                    console.log(value);
                }

                this.$refs.addForm.validate((valid) => {
                    console.log("确认提交吗");
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            NProgress.start();
                            this.$http.post('/imp',formData).then(response => {
                                // success callback
                                this.addLoading = false;
                                NProgress.done();
                                this.$notify({
                                    title: '成功',
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getZhs();
                            }, response => {
                                // error callback
                                this.addLoading = false;
                                NProgress.done();
                                let {code, message} = response.data;
                                this.$notify({
                                    title: '错误',
                                    message: '提交失败',
                                    type: 'error'
                                });
                            });

//                            let para = Object.assign({}, this.addForm);
//                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
//                            addUser(para).then((res) => {
//                                this.addLoading = false;
//                                NProgress.done();
//                                this.$notify({
//                                    title: '成功',
//                                    message: '提交成功',
//                                    type: 'success'
//                                });
//                                this.$refs['addForm'].resetFields();
//                                this.addFormVisible = false;
//                                this.getUsers();
//                            });
                        });
                    }else{
                        console.log(valid);
                    }
                });
            }
        },
        mounted() {
            //this.getZhs();
        }
    };

</script>

<style scoped>

</style>