<template>
  <div class="approval-list">
    <main>
      <div style="padding-top: 1rem;padding-bottom: 1rem;background-color: white">
      <h3 style="text-align: center">{{this.approval.title}}</h3>
      </div>
      <van-collapse v-model="activeNames">
        <van-collapse-item :name="approvalIndex"
                           :key="approvalIndex"
                           v-for="(approval, approvalIndex) in approvalList" :disabled="approval.workmsg === '' ? true: false">
          <template #title>
            <div>
              <h1>
                <span>{{approval.usersmsg.username}}</span>
                <van-tag :type="approval.usersmsg.result |getStatusType">{{approval.usersmsg.result |getStatusText}}</van-tag>
              </h1>
              <div><span class="label">时间：{{approval.usersmsg.createTime}}</span></div>
            </div>
          </template>
          <van-form>
            <!--                            style="box-shadow: 0 8px 12px #ebedf0;"-->
            <van-cell-group inset>
              <van-field
                v-for="(item,index) in approval.workmsg" :key="index"
                v-model="item.vl"
                :name="item.name"
                :label="item.name"
                :placeholder="item.name"
                :rules="[{ required: true, message: item.name }]"
                :readonly="item.readonly == 1 ? true: false"
              />
              <div v-if="approval.workflag === 'W'">
                <div v-if="approval.permflag === 'Y'">
                  <van-field
                    v-model="permResult"
                    name="审批结果"
                    label="审批结果"
                    placeholder="审批结果"
                    :rules="[{ required: true, message: '审批结果' }]"
                    @focus="permShowPicker = true"
                    :readonly="true"
                  />
                  <div v-if="permResult === '通过'">
                    <van-field
                      v-model="permUser.username"
                      name="下一级审批人"
                      label="下一级审批人"
                      placeholder="下一级审批人"
                      :rules="[{ required: true, message: '下一级审批人' }]"
                      @focus="showPickerM(approval)"
                      :readonly="true"
                    />
                  </div>
                </div>
                <van-button plain round  type="primary" style="width: 100%;margin-top: 0.5rem" @click="submit(approval)">
                  提交
                </van-button>
              </div>
            </van-cell-group>
          </van-form>
        </van-collapse-item>
      </van-collapse>
    </main>
  </div>
</template>

<script>
import {myWork} from '../api/ssth'
import axios from 'axios'
import {Dialog} from 'vant'

export default {
  name: 'myWork',
  data: function () {
    return {
      value: '',
      activeNames: [],
      users: {},
      approval: {},
      approvalList: [{}]
    }
  },
  activated () {
    this.users = JSON.parse(window.sessionStorage.getItem('users'))
    this.approval = JSON.parse(this.$route.params.approval)
    // this.users.body.userid  this.approval.voucher this.approval.approcalLevel
    // eslint-disable-next-line standard/object-curly-even-spacing
    let param = {approvalStatus: this.approval.approvalStatus, voucher: this.approval.voucher, twp_id: this.approval.twp_id}
    myWork(param).then((data) => {
      console.log(data)
      if (data.status === 0) {
        this.approvalList = data.body
      }
    })
    // this.approval.appResult = '-1'
    // this.approvalList = [{approval: this.approval,
    //   agencyMatters: [{ name: '请假人', order: 0, type: 1, vl: '某某', readonly: 1 },
    //     { name: '开始时间', order: 1, type: 3, vl: '2022-03-22', readonly: 1 },
    //     { name: '结束时间', order: 2, type: 4, vl: '2022-03-23 00:00', readonly: 1 },
    //     { name: '原因', order: 3, type: 1, vl: '没有原因', readonly: 1 }]}]
    // console.log(this.approvalList)
  },
  methods: {
    showPickerM (approval) {
      console.log(approval.permUser)
      for (let i = 0; i < approval.permUser.length; i++) {
        this.columns.push(approval.permUser[i].uuid + '--' + approval.permUser[i].name)
      }
      this.showPicker = true
    },
    onConfirm (value) {
      this.showPicker = false
      console.log(value)
      this.permUser = {userid: value.split('--')[0], username: value.split('--')[1]}
      console.log(this.permUser)
    },
    peronConfirm (value) {
      this.permShowPicker = false
      this.permResult = value
    },
    submit (approval) {
      let param = {'approval': approval, 'permResult': this.permResult === '通过' ? 1 : 2, 'permUser': this.permUser}
      console.log(param)
      axios({
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        method: 'post',
        url: '/work/sumbitPerm',
        data: JSON.stringify(param)
      }).then((data) => {
        console.log(data.data)
        if (data.data.status === 0) {
          Dialog.alert({
            message: '提交成功'
          }).then(() => {
            // on close
          })
        } else {
          Dialog.alert({
            message: '提交失败'
          }).then(() => {
            // on close
          })
        }
      })
    }
  },
  filters: {
    getStatusType (status) {
      switch (status) {
        case '0':
          return 'primary'
        case '1':
          return 'success'
        case '2':
          return 'warning'
        case '-1':
          return 'success'
        case '3':
          return 'warning'
      }
    },
    getStatusText (status) {
      switch (status) {
        case '0':
          return '审批中'
        case '1':
          return '审批通过'
        case '2':
          return '审批打回'
        case '-1':
          return '发起工单'
        case '3':
          return '填写工单'
      }
    }
  }
}
</script>

<style scoped>
.approval-list {
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
  color: rgb(160, 255, 51);
}
</style>
