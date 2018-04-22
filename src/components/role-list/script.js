export default {
  created () {
    this.loadRoles()
  },
  data () {
    return {
      roleList: [],
      addRoleDialog: false,
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      editRoleDialog: false,
      editRoleForm: {
        roleId: '',
        roleName: '',
        roleDesc: ''
      }
    }
  },
  methods: {
    async loadRoles () {
      const res = await this.$http.get('/roles')
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.roleList = data
      }
    },

    /**
     * 添加角色
     * 点击事件
     * 弹出对话框
     * 布局对话框
     * 初始化表单对话成员，将表单对象绑定到对话框表单
     * 提交表单 为确定按钮注册点击事件
     * 发起添加角色请求
     * 根据服务器响应做交互处理
     */

    async handleAddRole () {
      const res = await this.$http.post('/roles', this.addRoleForm)
      const {data, meta} = res.data
      if (meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加角色成功'
        })
      }

      // 关闭弹出框
      this.addRoleDialog = false

      // 清空弹出框
      for (let key in this.addRoleForm) {
        this.addRoleForm[key] = ''
      }

      // 重新加载
      this.loadRoles()
    },

    /**
     * 删除角色
     */

    async handleRemoveRole (role) {

      this.$confirm('确定删除该角色吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`/roles/${role.id}`)
          const {data, meta} = res.data
          if (meta.status === 200) {
            this.$message({
              type: 'success',
              message: '删除角色成功'
            })
            this.loadRoles()
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    /**
     * 编辑角色
     */
    async showEditRoleDialog (role) {
      // this.editRoleForm = role
      // 根据id查询角色
      const res = await this.$http.get(`/roles/${role.id}`)
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.editRoleForm = data
        this.editRoleDialog = true
      }
    },
    async handleEditRole () {
      const res = await this.$http.put(`roles/${this.editRoleForm.roleId}`, this.editRoleForm)
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: '更新角色成功'
        })
        this.editRoleDialog = false
        this.loadRoles()
      }
    }
  }
}
