<template>
  <div>
    <div style="width: 80%;margin: auto">
      <div style="margin-top: 2rem">
        <h3 style="text-align:center;">请假工单</h3>
        <van-form :model='account' style="margin-top: 2rem;">
          <van-cell-group inset style="box-shadow: 0 8px 12px #ebedf0;">
            <van-field
              v-for="(item,index) in agencyMatters" :key="index"
              v-model="item.vl"
              :name="item.name"
              :label="item.name"
              :placeholder="item.name"
              :rules="[{ required: true, message: account.usermessage }]"
              @focus="inputFocus(item,index)"
              :readonly="item.readonly"
            />
          </van-cell-group>
        </van-form>
        <div style="height: 1rem"></div>
        <div style="padding-top: 1rem;display:flex;justify-content: space-around">
          <van-button plain round  type="info" @click="submitForm" style="width: 40%;box-shadow: 0 8px 12px #ebedf0;">
            保存
          </van-button>
          <van-button plain round  type="primary" @click="submitForm" style="width: 40%;box-shadow: 0 8px 12px #ebedf0;">
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

        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'agencyMatters',
  data () {
    return {
      account: {
        username: '',
        pwd: '',
        usermessage: '请填写用户名',
        pwdmessage: '请填写密码',
        pwdrule: true
      },
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2099, 10, 1),
      currentDate: new Date(), // 年月日选择器默认时间
      showPicker: false,
      isDatePickerShow: false, // 是否拉起年月日选择器
      agencyItem: {}, // 当前选择的元素信息

      agencyMatters: [{ name: '请假人', order: 0, type: 1, vl: '某某', readonly: false },
        { name: '开始时间', order: 1, type: 3, vl: '2022-03-22', readonly: true },
        { name: '结束时间', order: 2, type: 4, vl: '2022-03-23 00:00', readonly: true },
        { name: '原因', order: 3, type: 1, vl: '没有原因', readonly: true },
        { name: '审批人', order: 4, type: 5, vl: this.value, readonly: true }]
    }
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
    submitForm () {
      // var params = {}
      // 入参--提交
      console.log('agencyMatters==>>>', this.agencyMatters)
    },
    onConfirm (value) {
      this.showPicker = false
      console.log(value)
      this.agencyItem.vl = value
    },
    dateConfirm (value) {
      this.isDatePickerShow = false
      console.log(this.getDateYS(value))
      console.log(this.getDateYD(value))
      console.log(this.getDateYS(new Date()))
      this.agencyItem.vl = this.getDateYS(value)
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
