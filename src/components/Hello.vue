<template>
  <div style="width: 20rem;margin: auto">
    <div style="margin-top: 3rem;display:flex;align-items:center">
      <img style="width: 3rem;height: 3rem;border-radius: 50%" :src="defaultimg">
      <div style="margin-left: 0.4rem">
        <h3 style="font-family: 新宋体">Hi,{{this.users.body.cname}} {{this.users.body.username}}</h3>
        <div style="margin-top: 0.4rem">
          <span style="font-family: 新宋体;font-size: 13px;color: #969595">第一时间清理代办可以有效提升流程效率</span>
        </div>
      </div>
    </div>
<!--    <div style="margin-top: 0.5rem">-->
<!--      <span style="font-family: 新宋体">{{this.users.body.username}}</span>-->
<!--    </div>-->
<!--    <van-icon name="envelop-o" />-->
    <van-cell title="代办事项" is-link :value="users.body.agencyMatters.length" title-style="text-align:left;" style="margin-top: 2rem" inset=true @click="agencyMatters">
      <template #title>
        <div style="display:flex;align-items：center">
          <van-icon name="envelop-o" size="1.5rem" color="#1989fa"/>
          <span style="margin-left: 0.2rem">代办事项</span>
        </div>
      </template>
    </van-cell>
    <div style="margin-top: 1rem">
      <van-grid :border="false" :column-num="3" square >
        <van-grid-item style="border-right: 1.5px solid #f6f7f9" @click="myWorkList">
          <van-icon size="2rem" name="share-o" color="#1989fa"/>
          <span style="margin-top: 1rem;font-size: 14px">我发起的</span>
        </van-grid-item>
        <van-grid-item style="border-right: 1.5px solid #f6f7f9;border-left: 1.5px solid #f6f7f9">
          <van-icon size="2rem" name="sign" color="#1989fa"/>
          <span style="margin-top: 1rem;font-size: 14px">我处理的</span>
        </van-grid-item>
        <van-grid-item style="border-left: 1.5px solid #f6f7f9">
          <van-icon size="2rem" name="orders-o" color="#1989fa"/>
          <span style="margin-top: 1rem;font-size: 14px">草稿</span>
        </van-grid-item>
      </van-grid>
    </div>
    <div style="background: white;margin-top: 1rem;padding-left: 0.5rem;padding-top: 0.5rem">
      <div style="width: 80%;">
        <h4>常用</h4>
        <van-grid :border="false" :column-num="3" square >
          <van-grid-item @click="workList">
            <van-icon size="2rem" name="add-o" color="#1989fa"/>
            <span style="margin-top: 1rem;font-size: 14px">发起工单</span>
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
      tdd: ['我发起的', '抄送', '我处理的', '草稿'],
      defaultimg: require('@/assets/cat.jpeg')
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
    },
    workList () {
      this.$router.push({name: 'workList'})
    },
    myWorkList () {
      this.$router.push({name: 'myWorkList'})
    }
  }
}
</script>

<style>
  body {
    background: #f6f7f9;
  }
</style>
