<template>
  <div style="width: 20rem;margin: auto">
    <h3>Hi {{this.users.name}}</h3>
    <van-cell title="代办事项" is-link value="26" style="margin-top: 2rem"/>
    <div style="margin-top: 2rem">
      <van-grid :border="false" :column-num="3" square >
        <van-grid-item style="border-right: 1.5px solid #DFE9FB">
          <van-icon name="share-o" />
          <span style="margin-top: 1rem">我发起的</span>
        </van-grid-item>
        <van-grid-item style="border-right: 1.5px solid #DFE9FB;border-left: 1.5px solid #DFE9FB">
          <van-icon name="sign" />
          <span style="margin-top: 1rem">我处理的</span>
        </van-grid-item>
        <van-grid-item style="border-left: 1.5px solid #DFE9FB">
          <van-icon name="orders-o" />
          <span style="margin-top: 1rem">草稿</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import {insertText, selectContent} from '../api/ssth'

export default {
  name: 'hello',
  data: function () {
    return {
      users: {},
      textarea: '',
      checkList: ['复选框 A', '复选框 C'],
      content: {
        userid: '',
        content: '',
        contenttype: []
      },
      tdd: ['我发起的', '抄送', '我处理的', '草稿'],
      contentList: [
        {
          'id': '1',
          'username': 'admin',
          'createtime': '2019-12-27 15:13:12',
          'content': '哈哈哈',
          'forward': '122',
          'comm': '122',
          'good': '122'
        },
        {
          'id': '2',
          'username': 'admin11',
          'createtime': '2019-12-27 15:13:12',
          'content': '哈哈哈11',
          'forward': '122',
          'comm': '122',
          'good': '122'
        }
      ],
      total: 0,
      disabledflag: false
    }
  },
  activated () {
    // window.alert(111)
    this.initData()
  },
  methods: {
    initData () {
      // this.users = JSON.parse(window.sessionStorage.getItem('users'))
      this.users = this.$route.params
      console.log('11111111111111111111111111')
      console.log(this.users)
      // console.log(this.users.name)
    },
    selectContent () {
      selectContent(this.users).then((data) => {
        console.log(data)
        this.contentList = data.data
      })
    },
    insertText () {
      if (this.textarea.replace(/\s/g, '').length === 0) {
        this.$message({
          message: '内容不能为空',
          type: 'warning'
        })
      } else {
        this.content.userid = this.users.id
        this.content.content = this.textarea
        this.content.contenttype = this.checkList
        insertText(this.content).then((data) => {
          console.log(data)
          if (data.data === 1) {
            this.$message({
              message: '发表成功',
              type: 'success'
            })
            this.selectContent()
          } else {
            this.$message({
              message: '发表失败',
              type: 'error'
            })
          }
        })
      }
    }
  }
}
</script>

<style>
  body {
    background: #DFE9FB;
  }
  .ifr-search{
    min-height: 149px;
    background-color: #ffffff;
    margin-top: 10px;
    padding: 21px 18px 0 18px;
    font-size: 12px;
    color: #555;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.06);
  }
  #app {
    margin-top: 2%;
  }
</style>
