<template>
  <div style="margin:auto">
    <div style="margin-top: 8rem">
      <div style="width: 20rem;margin: auto">
        <h3 style="text-align:center;">wp管理系统</h3>
        <van-form :model='account' style="margin-top: 4rem;">
          <van-cell-group inset>
            <van-field
              v-model="account.username"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: account.usermessage }]"
            />
            <van-field
              v-model="account.pwd"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: account.pwdrule, message: account.pwdmessage }]"
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
import {Dialog} from 'vant'
export default {
  name: 'Login',
  data () {
    return {
      account: {
        username: '',
        pwd: '',
        usermessage: '请填写用户名',
        pwdmessage: '请填写密码',
        pwdrule: true
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
      // 调用函数  传递参数 获取结果
      requestLogin(loginParams).then((data) => {
        console.log(data)
        if (data.status === 0) {
          sessionStorage.setItem('users', JSON.stringify(data))
          this.$router.push({name: 'hello', params: data})
        } else {
          Dialog.alert({
            message: '密码错误'
          }).then(() => {
            // on close
          })
        }
      })
    }
  }
}
</script>

<style>
  body {
    background: #f6f7f9;
  }
</style>
