<template>
<div class="login-wrap">
  <el-form class="login-form" label-position="top" ref="form" :model="userForm" label-width="80px">
    <h2 class="heading">用户登录</h2>
    <el-form-item label="用户名">
      <el-input v-model="userForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input
      type="password"
      v-model="userForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="login-btn" type="primary" @click="login">立即登录</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      // 数据
      // 验证
      // 请求
      // 交互
      // console.log(this.userForm)
      const res = await axios.post('http://localhost:8888/api/private/v1/login', this.userForm)
      // console.log(res)
      const data = res.data
      if (data.meta.status === 200) {
        window.localStorage.setItem('admin-token', JSON.stringify(data.data))
        this.$router.push({
          name: 'home'
        })
      }
    }
  }
}
</script>

<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.login-btn {
  width: 100%;
}
</style>
