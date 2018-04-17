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
      label="电话">
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
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
    const res = await this.$http.get('/users', {
      // 配置请求头携带身份令牌
      // headers: {
      //   Authorization: token
      // },
      // 参数
      params: {
        pagenum: 1,
        pagesize: 5
      }
    })
    // console.log(res)
    this.tableData = res.data.data.users
  },
  data () {
    return {
      tableData: [],
      searchText: ''
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
