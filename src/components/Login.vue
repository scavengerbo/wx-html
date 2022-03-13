<template>
  <div style="margin:auto">
    <div style="margin-top: 8rem">
      <div style="width: 20rem;margin: auto">
        <h3>wp管理系统</h3>
        <van-form :model='account' style="margin-top: 4rem">
          <van-cell-group inset>
            <van-field
              v-model="account.username"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
              v-model="account.pwd"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
          </van-cell-group>
          <div style="margin: 16px;">
            <van-button round block type="primary" @click="handleLogin">
              提交
            </van-button>
          </div>
        </van-form>
      </div>

    </div>
  </div>

</template>

<script>
// 引入ssth.js  好调用里面的接口
import {requestLogin} from '../api/ssth'
export default {
  name: 'Login',
  data () {
    return {
      account: {
        username: '',
        pwd: ''
      }
    }
  },
  methods: {
    register () {
      this.$router.push({
        name: 'register',
        params: {
        }
      })
    },
    handleLogin () {
      let loginParams = {name: this.account.username, passwd: this.account.pwd}
      // let test = 'testlogin'
      // 调用函数  传递参数 获取结果
      console.log(loginParams)
      requestLogin(loginParams).then((data) => {
        console.log(data)
        console.log(typeof data.body)
        if (data.body) {
          this.$router.push({name: 'hello', params: loginParams})
        }
        // let userList = data.data
        // console.log(userList)

        // if (userList.length !== 0) {
        //   // 登录成功
        //   //  console.log(userList[0].userName)
        //   // sessionStorage.setItem('users', JSON.stringify(userList[0]))
        //   // 用vue路由跳转到后台主界面
        //   this.$router.push({path: '/hello', query: loginParams})
        // } else {
        //   this.$message({
        //     message: '登录失败',
        //     type: 'error'
        //   })
        // }
      })
    }
  }
}
</script>

<style>
  body {
    background: #DFE9FB;
  }
</style>
