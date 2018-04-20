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
          { min: 3, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 10, max: 18, message: '长度在 10 到 18 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
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

    /**
     * 处理添加用户
     */

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

          // 关闭对话框
          this.dialogFormVisible = false

          // 重新加载用户列表
          this.loadUsersByPage(this.currentPage, this.pageSize)

          // 清空表单
          for (let key in this.userForm) {
            this.userForm[key] = ''
          }
        }
      })
      // resetForm ('addUserForm') {
      //   this.$refs['addUserForm'].resetFields()
      // }
    },

    /**
     * 处理删除用户
     */

    async handleDeleteUser (user) {
      // console.log(user)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`/users/${user.id}`)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadUsersByPage(this.currentPage)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
