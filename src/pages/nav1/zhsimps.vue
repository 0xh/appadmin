<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.time_name" placeholder="报告期"></el-input>
                </el-form-item>
                <el-form-item label="报表类型">
                    <el-select v-model="filters.excel_id" placeholder="请选择报表类型">
                        <el-option label="年报" value="0"></el-option>
                        <el-option label="月报" value="1"></el-option>
                        <el-option label="重点企业" value="2"></el-option>
                        <el-option label="重点园区" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.sheet_name" placeholder="Sheet"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.table_name" placeholder="table"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getZhsImps">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleImp">导入</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleLoad">加载</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->

        <el-table :data="facts" highlight-current-row v-loading="loading" style="width: 100%;">
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="time_name" label="报告期" width="100" sortable>
            </el-table-column>
            <el-table-column prop="month_id" label="month_id" width="100" sortable>
            </el-table-column>
            <el-table-column prop="excel_id" label="excel" width="100" :formatter="formatExcel" sortable>
            </el-table-column>
            <el-table-column prop="sheet_name" label="sheet" width="100">
            </el-table-column>
            <el-table-column prop="sheet_id" label="sheet_id" width="100">
            </el-table-column>
            <el-table-column prop="table_name" label="table_name" width="100">
            </el-table-column>
            <el-table-column prop="ori_table_id" label="ori_table_id" width="100">
            </el-table-column>
            <el-table-column prop="region_name" label="单位名称" min-width="100">
            </el-table-column>
            <el-table-column prop="zzjg_id" label="zzjg_id" min-width="100">
            </el-table-column>
            <el-table-column prop="zbzm_name" label="主指标" min-width="100">
            </el-table-column>
            <el-table-column prop="assistant_code" label="assistant_code" width="100">
            </el-table-column>
            <el-table-column prop="zbfm_name" label="副指标" width="100">
            </el-table-column>
            <el-table-column prop="indication_id" label="indication_id" min-width="100">
            </el-table-column>
            <el-table-column prop="indication_value_str" label="指标值" min-width="100">
            </el-table-column>

        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--导入界面-->
        <el-dialog title="导入" v-model="impFormVisible" :close-on-click-modal="false">
            <el-form :model="impForm" label-width="80px" :rules="impFormRules" ref="impForm">
                <el-form-item label="报表类型">
                    <el-select v-model="impForm.excel_id" placeholder="请选择报表类型">
                        <el-option label="年报" value="0"></el-option>
                        <el-option label="月报" value="1"></el-option>
                        <el-option label="重点企业" value="2"></el-option>
                        <el-option label="重点园区" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文件">
                    <input type="file" name="datafile" id="datafile">
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="impForm.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="impFormVisible = false">取消</el-button>
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
                impFormVisible: false,//新增界面是否显示
                addLoading: false,
                impFormRules: {
                    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
                },
                //新增界面数据
                impForm: {
                    name: '',
                    excel_id: ''
                }
            }
        },
        methods: {
            //性别显示转换
            formatExcel: function (row, column) {
                return row.excel_id == 0 ? '年报' : row.excel_id == 1 ? '月报' : row.excel_id == 2 ? '重点企业' : row.excel_id == 3 ? '重点园区' : '未知';
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getZhsImps();
            },
            //获取用户列表
            getZhsImps: function () {
                this.loading = true;
                NProgress.start();
                let url = '/zhsImps/page/alltime/alltable';
                if (this.page)
                    url = url.replace('page', this.page);
                if (this.filters.time_name)
                    url = url.replace('alltime', this.filters.time_name);
                if (this.filters.excel_id)
                    url = url.replace('alltable', this.filters.excel_id);
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
                this.impFormVisible = true;
                this.impForm = {
                    name: '',
                    excel_id: ''
                };
            },
            //显示新增界面
            handleLoad: function () {
                this.loading = true;
                NProgress.start();
                let url = '/load';
                this.$http.get(url).then(response => {
                    // success callback
                    this.total = response.data.total;
                    this.$notify({
                        title: '成功',
                        message: '加载成功',
                        type: 'success'
                    });
                    this.loading = false;
                    NProgress.done();
                    this.getZhsImps();
                }, response => {
                    // error callback
                    this.loading = false;
                    NProgress.done();
                })
            },
            addSubmit: function () {
                var formData = new FormData();
                if(this.impForm.excel_id){
                    formData.append('excel_id', this.impForm.excel_id);
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

                this.$refs.impForm.validate((valid) => {
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
                                this.$refs['impForm'].resetFields();
                                this.impFormVisible = false;
                                this.getZhsImps();
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