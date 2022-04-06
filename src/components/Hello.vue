<template>
  <div style="width: 20rem;margin: auto">
    <div>
      <h3 style="font-family: 新宋体">Hi {{this.users.body.cname}}</h3>
    </div>
    <div>
      <span style="font-family: 新宋体">{{this.users.body.username}}</span>
    </div>
    <van-cell title="代办事项" is-link :value="users.body.agencyMatters.length" title-style="text-align:left;" style="margin-top: 2rem" inset=true @click="agencyMatters"/>
    <div style="margin-top: 2rem">
      <van-grid :border="false" :column-num="3" square >
        <van-grid-item style="border-right: 1.5px solid #DFE9FB">
          <van-icon size="2rem" name="share-o" />
          <span style="margin-top: 1rem">我发起的</span>
        </van-grid-item>
        <van-grid-item style="border-right: 1.5px solid #DFE9FB;border-left: 1.5px solid #DFE9FB">
          <van-icon size="2rem" name="sign" />
          <span style="margin-top: 1rem">我处理的</span>
        </van-grid-item>
        <van-grid-item style="border-left: 1.5px solid #DFE9FB">
          <van-icon size="2rem" name="orders-o" />
          <span style="margin-top: 1rem">草稿</span>
        </van-grid-item>
      </van-grid>
    </div>
    <div style="background: white;margin-top: 1rem;padding-left: 0.5rem;padding-top: 0.5rem">
      <div style="width: 80%;">
        <h4>常用</h4>
        <van-grid :border="false" :column-num="3" square >
          <van-grid-item @click="workList">
            <van-icon size="2rem" name="add" />
            <span style="margin-top: 1rem">发起工单</span>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'hello',
  data: function () {
    return {
      users: {},
      tdd: ['我发起的', '抄送', '我处理的', '草稿']
    }
  },
  activated () {
    this.initData()
  },
  methods: {
    initData () {
      this.users = JSON.parse(window.sessionStorage.getItem('users'))
      // this.users = this.$route.params
      console.log(this.users)
    },
    agencyMatters () {
      this.$router.push({name: 'ApprovalList'})
      // requestLogin().then((data) => {
      //   console.log(data)
      //   console.log(data.status)
      //   if (data.status === 0) {
      //     this.$router.push({name: 'hello', params: data})
      //   } else {
      //     Dialog.alert({
      //       message: '密码错误'
      //     }).then(() => {
      //       // on close
      //     })
      //   }
      // })
    },
    workList () {
      this.$router.push({name: 'workList'})
    }
  }
}
</script>

<style>
  body {
    background: #f6f7f9;
  }
</style>
