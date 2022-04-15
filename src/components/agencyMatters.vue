<template>
  <div>
    <div style="width: 80%;margin: auto">
      <div style="margin-top: 2rem">
        <h3 style="text-align:center;">{{ this.workName }}</h3>
        <van-form style="margin-top: 2rem;">
          <van-cell-group inset style="box-shadow: 0 8px 12px #ebedf0;">
            <van-field
              v-for="(item,index) in agencyMatters" :key="index"
              v-model="item.vl"
              :name="item.name"
              :label="item.name"
              :placeholder="item.name"
              :rules="[{ required: true, message: item.name }]"
              @focus="inputFocus(item,index)"
              :readonly="item.readonly == 1 ? true: false"
            />
            <van-field
              v-model="this.childpermUser.username"
              :name="this.childwork.workname"
              :label="this.childwork.workname"
              :placeholder="this.childwork.workname"
              :rules="[{ required: true, message: this.childwork.workname }]"
              @focus="childshowPicker = true"
              :readonly="true"
              v-if="this.childflag === 'Y'"
            />
            <van-field
              v-model="this.permUser.username"
              name="审批人"
              label="审批人"
              placeholder="审批人"
              :rules="[{ required: true, message: '审批人' }]"
              @focus="showPicker = true"
              :readonly="true"
            />
          </van-cell-group>
        </van-form>
        <div style="height: 1rem"></div>
        <div style="padding-top: 1rem;display:flex;justify-content: space-around">
          <van-button plain round  type="info" @click="submitForm(0)" style="width: 40%;box-shadow: 0 8px 12px #ebedf0;">
            保存
          </van-button>
          <van-button plain round  type="primary" @click="submitForm(1)" style="width: 40%;box-shadow: 0 8px 12px #ebedf0;">
            提交
          </van-button>
        </div>
        <van-popup v-model="isDatePickerShow" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          title="年月日时分"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="dateConfirm"
          @cancel="isDatePickerShow = false"
        />
        </van-popup>
        <van-popup v-model="isDatePickerShowMore" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="年月日时分"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="dateConfirmD"
            @cancel="isDatePickerShowMore = false"
          />
        </van-popup>

        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
        <van-popup v-model="childshowPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="childcolumns"
            @confirm="childonConfirm"
            @cancel="childshowPicker = false"
          />
        </van-popup>
      </div>
    </div>
  </div>
</template>
<script>
// import {Dialog} from 'vant'
// import {workTitle} from '@/api/ssth'

// import {sumbitWorkOrder, workTitle} from '@/api/ssth'
import {Dialog} from 'vant'
import axios from 'axios'
import {workTitle} from '@/api/ssth'

export default {
  name: 'agencyMatters',
  data: function () {
    return {
      users: {},
      columns: [],
      childcolumns: [],
      childshowPicker: false,
      childpermUsers: [],
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2099, 10, 1),
      currentDate: new Date(), // 年月日选择器默认时间
      showPicker: false,
      isDatePickerShow: false, // 是否拉起年月日选择器
      isDatePickerShowMore: false,
      agencyItem: {}, // 当前选择的元素信息
      agencyMatters: [],
      twpid: '',
      workName: '',
      permUsers: [],
      permUser: {},
      appLevel: 0,
      childflag: 'N',
      childpermUser: {},
      childwork: {}

      // agencyMatters: [{ name: '请假人', order: 0, type: 1, vl: '某某', readonly: false },
      //   { name: '开始时间', order: 1, type: 3, vl: '2022-03-22', readonly: true },
      //   { name: '结束时间', order: 2, type: 4, vl: '2022-03-23 00:00', readonly: true },
      //   { name: '原因', order: 3, type: 1, vl: '没有原因', readonly: true },
      //   { name: '审批人', order: 4, type: 5, vl: this.value, readonly: true }]
    }
  },
  activated () {
    this.users = JSON.parse(window.sessionStorage.getItem('users'))
    this.twpid = this.$route.query.twpid
    this.workName = this.$route.query.workName
    console.log(this.users)
    workTitle({twp_id: this.twpid, userid: this.users.body.userid}).then((data) => {
      console.log(data)
      if (data.status === 0) {
        this.agencyMatters = data.body.workTitle
        this.permUsers = data.body.permUser
        this.columns = []
        this.childflag = data.body.childflag
        for (let i = 0; i < this.permUsers.length; i++) {
          this.columns.push(this.permUsers[i].uuid + '--' + this.permUsers[i].name)
        }
        if (this.childflag === 'Y') {
          this.childpermUsers = data.body.permChild
          this.childwork = data.body.childWork
          for (let i = 0; i < this.childpermUsers.length; i++) {
            this.childcolumns.push(this.childpermUsers[i].uuid + '--' + this.childpermUsers[i].name)
          }
        }
      } else {
        Dialog.alert({
          message: '异常'
        }).then(() => {
          // on close
        })
      }
    })
  },
  methods: {
    // input触发时判断
    inputFocus (item, index) {
      console.log('inputFocus==>>')
      this.agencyItem = item
      // item.vl = 'a'
      if (item.type === 3) {
        // 日期选择器
        this.isDatePickerShow = true
      } else if (item.type === 4) {
        // 时间选择器
        this.isDatePickerShowMore = true
      } else if (item.type === 5) {
        this.showPicker = true
      }
    },
    submitForm (status) {
      // var params = {}
      // 入参--提交
      // eslint-disable-next-line camelcase
      let workparams = {userId: this.users.body.userid,
        twpId: this.twpid,
        status: status,
        workConts: this.agencyMatters,
        permUserID: this.permUser.userid,
        appLevel: this.appLevel,
        childpermUserID: this.childpermUser.userid,
        childflag: this.childflag}
      console.log('work_params==>>>', workparams)
      axios({
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        method: 'post',
        url: '/work/sumbitWorkOrder',
        data: JSON.stringify(workparams)
      }).then((data) => {
        console.log(data.data)
        if (data.data.status === 0) {
          Dialog.alert({
            message: '提交成功'
          }).then(() => {
            // on close
            this.$router.push({name: 'hello'})
          })
        } else {
          Dialog.alert({
            message: '提交失败'
          }).then(() => {
            // on close
          })
        }
      })
    },
    childonConfirm (value) {
      this.childshowPicker = false
      console.log(value)
      this.childpermUser = {userid: value.split('--')[0], username: value.split('--')[1]}
      console.log(this.childpermUser)
    },
    onConfirm (value) {
      this.showPicker = false
      console.log(value)
      this.permUser = {userid: value.split('--')[0], username: value.split('--')[1]}
      console.log(this.permUser)
    },
    dateConfirm (value) {
      this.isDatePickerShow = false
      this.agencyItem.vl = this.getDateYS(value)
    },
    dateConfirmD (value) {
      this.isDatePickerShowMore = false
      this.agencyItem.vl = this.getDateYD(value)
    },
    timeAdd0 (str) {
      var arr = str + ''
      if (arr.length <= 1) {
        arr = '0' + arr
      }
      return arr
    },
    getDateYS (date) {
      return this.timeAdd0(date.getFullYear()) + '-' +
        this.timeAdd0((date.getMonth() + 1)) + '-' + this.timeAdd0((date.getDate())) +
        ' ' + this.timeAdd0((date.getHours())) + ':' + this.timeAdd0((date.getMinutes()))
    },
    getDateYD (date) {
      return this.timeAdd0(date.getFullYear()) + '-' +
        this.timeAdd0((date.getMonth() + 1)) + '-' + this.timeAdd0((date.getDate()))
    }
  }
}
</script>
<style>
body {
  background: #f6f7f9;
}
</style>
