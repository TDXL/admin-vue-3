<template>
<div class="user-list-wrap">
  <!-- 面包屑 -->
  <el-row>
    <el-col :span="24">
      <el-breadcrumb class="user-list-breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
  <!-- 搜索框 -->
  <el-row class="user-list-search">
    <el-col :span="8">
      <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
        <el-button
        slot="append"
        icon="el-icon-search"
        @click="handleSearch"></el-button>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button
      type="success"
      plain
      @click="dialogFormVisible = true">成功按钮</el-button>
    </el-col>
  </el-row>
  <!-- 列表 -->
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="180">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话"
      width="180">
    </el-table-column>
    <el-table-column
      label="用户状态"
      width="100">
      <template slot-scope="scope">
        <!-- <el-tag
          :type="scope.row.tag === '家' ? 'primary' : 'success'"
          close-transition>{{scope.row.tag}}</el-tag> -->
        <!-- scope.row 可以拿到当前遍历行对象 -->
        <el-switch
          @change="(val) => {handleStateChange(val, scope.row)}"
          v-model="scope.row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[3, 5, 8, 10]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalSize">
  </el-pagination>
  <!-- 添加用户对话框 -->
  <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
    <el-form
    :model="userForm"
    :rules="addUserFormRules"
    ref="addUserForm"
    class="demo-addUserFormRules">
      <el-form-item label="用户名" prop="username" label-width="120px">
        <el-input v-model="userForm.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="120px">
        <el-input v-model="userForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" label-width="120px">
        <el-input v-model="userForm.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="mobile" label-width="120px">
        <el-input v-model="userForm.mobile" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAddUser">确 定</el-button>
    </div>
</el-dialog>
</div>
</template>

<script>
// import axios from 'axios'
// import http from '@/assets/js/http'
// import {getToken} from '@/assets/js/auth'

export default {
  async created () {
    this.loadUsersByPage(1)
  },
  data () {
    return {
      tableData: [],
      searchText: '',
      totalSize: 0,
      currentPage: 1,
      pageSize: 5,
      dialogFormVisible: false,
      userForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addUserFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSizeChange (pageSize) {
      // 每页大小改变后，默认加载第一页
      this.loadUsersByPage(1, pageSize)
      this.currentPage = 1
      this.pageSize = pageSize
    },
    handleCurrentChange (currentPage) {
      this.loadUsersByPage(currentPage, this.pageSize)
      // this.currentPage = currentPage
    },
    handleSearch () {
      this.loadUsersByPage(1)
    },
    async handleStateChange (state, user) {
      const {id: userId} = user
      const data = await this.$http.put(`/users/${userId}/state/${state}`)
      if (data.status === 200) {
        this.$message({
          type: 'success',
          message: `用户状态${state ? '启用' : '禁用'}成功`
        })
      }
    },
    async handleAddUser () {
      // console.log(this.userForm)
      this.$refs['addUserForm'].validate(async (valid) => {
        if (!valid) {
          return false
        }
        const res = await this.$http.post('/users', this.userForm)
        console.log(res)
        if (res.data.meta.status === 201) {
          this.$message({
            type: 'success',
            message: '添加用户成功'
          })
          this.dialogFormVisible = false
          this.loadUsersByPage(this.currentPage, this.pageSize)
        }
      })
      // resetForm ('addUserForm') {
      //   this.$refs['addUserForm'].resetFields()
      // }
    },

    async loadUsersByPage (page, pageSize = this.pageSize) {
      const res = await this.$http.get('/users', {
        // 参数
        params: {
          pagenum: page,
          pagesize: pageSize,
          query: this.searchText
        }
      })
      // console.log(res)
      const {users, total} = res.data.data

      this.tableData = users
      this.totalSize = total
    }
  }
}
</script>

<style>
.user-list-breadcrumb {
  line-height: 3;
}
.user-list-search {
  margin-bottom: 10px;
}
</style>
