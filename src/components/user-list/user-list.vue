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
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="success" plain>成功按钮</el-button>
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
      :current-page="currentPage"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalSize">
    </el-pagination>
</div>
</template>

<script>
// import axios from 'axios'
// import http from '@/assets/js/http'
// import {getToken} from '@/assets/js/auth'

export default {
  async created () {
    // const {token} = JSON.parse(window.localStorage.getItem('user-info'))
    // const token = getToken()
    this.loadUsersByPage(1)
  },
  data () {
    return {
      tableData: [],
      searchText: '',
      totalSize: 0,
      currentPage: 1,
      pageSize: 1
    }
  },
  methods: {
    handleSizeChange (pageSize) {
      // console.log(`每页 ${val} 条`)
      // 每页大小改变后，默认加载第一页
      this.loadUsersByPage(1, pageSize)
      this.currentPage = 1
      this.pageSize = pageSize
      // console.log(this.currentPage)
    },
    handleCurrentChange (currentPage) {
      // console.log(`当前页: ${val}`)
      this.loadUsersByPage(currentPage, this.pageSize)
      this.currentPage = currentPage
      // console.log(this.currentPage)
    },
    async loadUsersByPage (page, pageSize = 1) {
      const res = await this.$http.get('/users', {
        // 参数
        params: {
          pagenum: page,
          pagesize: pageSize
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
