<template>
  <div class="approval-list">
    <van-search v-model="value"
                placeholder="请输入搜索关键词" />
    <div class="filter">
      <van-dropdown-menu>
        <van-dropdown-item v-model="dropMenuValue"
                           :options="option1" />
        <van-dropdown-item v-model="dropMenuValue2"
                           :options="option2" />
      </van-dropdown-menu>
      <div class="num">数量：<span>{{approvalList.length}}</span></div>
    </div>
    <main>

      <van-collapse v-model="activeNames">
        <van-collapse-item :name="approval.voucher"
                           :key="approval.voucher + approvalIndex"
                           v-for="(approval, approvalIndex) in approvalList">
          <!-- 自定义折叠头部模板 -->
          <template #title>
            <div>
              <h1>
                <span>{{approval.title}}</span>
                <van-tag :type="approval.approvalStatus |getStatusType">{{approval.approvalStatus |getStatusText}}</van-tag>
              </h1>
              <div><span class="label">单据：</span>{{approval.voucher}}</div>
            </div>
          </template>
          <!-- 折叠内容 -->
          <div class="collapse-content">
            <div class="content-item">
              <div class="label">申请人</div>
              <div class="value">{{approval.applicant}}</div>
            </div>
            <div class="content-item">
              <div class="label">申请时间</div>
              <div class="value">{{approval.applyTime}}</div>
            </div>
            <div class="content-item">
              <div class="label">公司</div>
              <div class="value">{{approval.company}}</div>
            </div>
            <div class="content-item">
              <div class="label">部门</div>
              <div class="value">{{approval.department}}</div>
            </div>
            <div class="content-item">
              <div class="detail" @click="approvalWork(approval)">详情</div>
            </div>
            <div class="content-item" v-if="approval.applyInstruction!=''">
              <div class="detail" @click="childWorkList(approval)">{{approval.applyInstruction}}</div>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </main>
  </div>
</template>

<script>
import {myWorkList} from '../api/ssth'

export default {
  name: 'myWorkList',
  data: function () {
    return {
      dropMenuValue: 0, // 默认排序
      dropMenuValue2: 0, // 审批状态
      option1: [
        { text: '默认排序', value: 0 },
        { text: '创建时间', value: 1 },
        { text: '审批时间', value: 2 }
      ],
      option2: [
        { text: '审批状态', value: 0 },
        { text: '待审批', value: 1 },
        { text: '审批中', value: 2 },
        { text: '已审批', value: 3 },
        { text: '打回', value: 4 }
      ],
      users: {},
      value: '', // 搜索关键字
      approvalList: [
        // {
        //   id: 1,
        //   title: '资产领用申请',
        //   voucher: 'RQ132123123123',
        //   applicant: '刘大波1',
        //   applyTime: '2019-07-17',
        //   company: '北京数字认证',
        //   department: '密码设备产品',
        //   applyInstruction: '申请说明1111',
        //   approvalStatus: 0
        // }
      ], // 审批列表数据
      activeNames: [], // 绑定的被打开的折叠面板
      approval: {}
    }
  },
  activated () {
    this.users = JSON.parse(window.sessionStorage.getItem('users'))
    console.log(this.users)
    myWorkList({userid: this.users.body.userid}).then((data) => {
      console.log(data)
      if (data.status === 0) {
        this.approvalList = data.body
      }
    })
  },
  methods: {
    approvalWork (approval) {
      this.approval = approval
      this.$router.push({name: 'myWork', params: {approval: JSON.stringify(this.approval)}})
    },
    childWorkList (approval) {
      this.approval = approval
      this.$router.push({name: 'childWorkList', params: {approval: JSON.stringify(this.approval)}})
    }
  },
  filters: {
    getStatusType (status) {
      switch (status) {
        case '0':
          return 'warning'
        case '1':
          return 'primary'
        case '2':
          return 'primary'
        case '3':
          return 'warning'
        case '4':
          return 'warning'
        case '5':
          return 'success'
      }
    },
    getStatusText (status) {
      switch (status) {
        case '0':
          return '草稿'
        case '1':
          return '审批中'
        case '2':
          return '审批中'
        case '3':
          return '删除'
        case '4':
          return '打回'
        case '5':
          return '审批结束'
      }
    }
  }
}
</script>

<style>
.approval-list {
  height: 100%;
  display: flex;
  flex-flow: column;
  background-color: #f4f4f4;
}

.approval-list .filter {
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 2px 12px rgb(100 101 102 / 12%);
}

.approval-list .filter .van-dropdown-menu {
  flex: 1;
}

.approval-list .filter .van-dropdown-menu__bar {
  box-shadow: none;
}

.approval-list .filter .num {
  width: 100px;
  text-align: center;
}

.approval-list main {
  overflow-y: scroll;
}

.approval-list .van-collapse-item {
  margin: 10px 0;
}
.approval-list .van-collapse-item h1 {
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  font-size: 14px;
}
.approval-list .van-collapse-item .collapse-content {
  display: flex;
  flex-wrap: wrap;
}

.approval-list .van-collapse-item .collapse-content .content-item {
  width: 50%;
  margin: 10px 0;
}

.approval-list .label {
  font-size: 12px;
  color: #ccc;
}
.approval-list .value {
  color: #000;
}

.approval-list .detail {
  color: rgb(51, 177, 255);
}
</style>
