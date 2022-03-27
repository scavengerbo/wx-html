<template>
  <div style="margin-top: 0.5rem">
    <div style="width: 100%;margin: auto">
        <van-search v-model="value" placeholder="请输入搜索关键词" @search="onSearch(value)"/>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
<!--          <van-cell v-for="item in list" :key="item" :title="item" />-->
          <van-cell v-for="(item, index) in list" :key="index" :title="item.workName" is-link title-style="text-align:left;"
                    style="margin-top: 0.5rem;padding-top: 0.5rem" inset=true @click="agencyMatters(item.twp_id)"
                    value="发起"/>
        </van-list>
    </div>
  </div>
</template>
<script>
import {workList} from '@/api/ssth'
import {Dialog} from 'vant'

export default {
  name: 'workList',
  data: function () {
    return {
      list: [],
      loading: false,
      finished: false,
      value: '',
      workList: [],
      users: {},
      loginParams: {}
    }
  },
  activated () {
    // window.alert(111)
    this.initData()
  },
  methods: {
    initData () {
      this.users = JSON.parse(window.sessionStorage.getItem('users'))
      // this.users = this.$route.params
      console.log(this.users)
    },
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      let workParams = {cid: this.users.body.cid, userid: this.users.body.userid, de_id: this.users.body.de_id}
      workList(workParams).then((data) => {
        console.log(data)
        if (data.status === 0) {
          this.workList = data.body
          this.list = data.body

          // 加载状态结束
          this.loading = false

          // 数据全部加载完成
          this.finished = true
        } else {
          Dialog.alert({
            message: '异常'
          }).then(() => {
            // on close
          })
        }
      })
    },
    agencyMatters (item) {
      console.log(item)
      this.$router.push({path: '/agencyMatters', query: {twpid: String(item)}})
    },
    onSearch (val) {
      this.list = []
      if (val === '') {
        this.list = this.workList
      } else {
        for (let i = 0; i <= this.workList.length; i++) {
          if (this.workList[i].workName.indexOf(val) !== -1) {
            this.list.push(this.workList[i])
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
