<template>
<div class="list-wrap">
  <!-- 面包屑 -->
  <el-breadcrumb class="list-breadcrumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 表格 -->
  <el-table
    v-loading="loading"
    :data="tableData"
    style="width: 100%">
    <el-table-column
      type="index"
      index>
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径"
      width="180">
    </el-table-column>
    <el-table-column
      label="层级">
      <!-- 自定义表格列 -->
      <template slot-scope="scope">
        <span v-if="scope.row.level === '0'">一级</span>
        <span v-else-if="scope.row.level === '1'">二级</span>
        <span v-else-if="scope.row.level === '2'">三级</span>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  created () {
    this.loadRights()
  },
  data () {
    return {
      tableData: [],
      loading: true
    }
  },
  methods: {
    async loadRights () {
      setTimeout(async () => {
        const res = await this.$http.get('/rights/list')
        if (res.data.meta.status === 200) {
          this.tableData = res.data.data
          this.loading = false
        }
      },1000)
    }
  }
}
</script>

<style>
</style>
