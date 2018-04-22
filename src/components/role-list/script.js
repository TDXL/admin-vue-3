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
    }
  }
}
