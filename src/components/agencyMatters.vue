<template>
  <div style="margin:auto">
    <div style="width: 80%;margin: auto">
      <div>
        <h3>请假工单</h3>
        <van-form :model='account' style="margin-top: 2rem">
          <van-cell-group inset>
            <van-field
              v-for="(item,index) in agencyMatters" :key="index"
              v-model="item.vl"
              :name="item.name"
              :label="item.name"
              :placeholder="item.name"
              :rules="[{ required: true, message: account.usermessage }]"
              @focus="inputFocus(item)"
            />
          </van-cell-group>
        </van-form>
        <div style="margin: 16px;">
          <van-button round block type="primary" @click="handleLogin">
            提交
          </van-button>
        </div>
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          title="选择完整时间"
          :min-date="minDate"
          :max-date="maxDate"
          v-show="isDatePickerShow"
          @confirm="isDatePickerShow=false"
        />

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
      result: '',
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(), // 年月日选择器默认时间
      showPicker: false,
      isDatePickerShow: false, // 是否拉起年月日选择器
      isDatePickerShowMore: false, // 是否拉起时间选择器
      datePickerValue: '', // 年月日选择器选中的值
      currentDateMore: new Date(), // 时间选择器默认时间
      datePickerValueMore: '', // 时间选择器选中的值
      userForm: {}, // 最后提交的表单--注册触发--暂时未使用
      agencyItem: {}, // 当前选择的元素信息

      agencyMatters: [{ name: '请假人', order: 0, type: 1, vl: '某某' },
        { name: '开始时间', order: 1, type: 3, vl: '2022-03-22' }, { name: '结束时间', order: 2, type: 4, vl: '2022-03-23 00:00' }, { name: '原因', order: 3, type: 1, vl: '没有原因' }]
    }
  },
  created () {
    // 设置年月日选择器默认值
    this.datePickerValue = this.timeAdd0(new Date().getFullYear()) + '-' + this.timeAdd0((new Date().getMonth() + 1)) + '-' + this.timeAdd0((new Date().getDate()))
    // 设置时间选择器默认值
    this.datePickerValueMore = this.timeAdd0(new Date().getFullYear()) + '-' + this.timeAdd0((new Date().getMonth() + 1)) + '-' + this.timeAdd0((new Date().getDate())) + ' ' + this.timeAdd0((new Date().getHours())) + ':' + this.timeAdd0((new Date().getMinutes()))
  },
  mounted () {
    // 可以在这查询agencyMatters
  },
  methods: {
    // 年月日选择器 赋值
    onDatePickerConfirm (columnsValue) {
      this.agencyItem.vl = this.$refs.datePicker.getFormatDate('yyyy-MM-dd')
    },
    // 时间选择器 赋值
    onDatePickerConfirmMore (columnsValue) {
      this.agencyItem.vl = this.$refs.datePickerMore.getFormatDate('yyyy-MM-dd hh:mm')
    },
    // input触发时判断
    inputFocus (item) {
      console.log('inputFocus==>>')
      this.agencyItem = item
      if (item.type === 3) {
        // 日期选择器
        this.isDatePickerShow = true
      } else if (item.type === 4) {
        // 时间选择器
        this.isDatePickerShowMore = true
      } else {
        this.showPicker = true
      }
    },
    // 注册
    submitForm () {
      // var params = {}
      // 入参--提交
      console.log('agencyMatters==>>>', this.agencyMatters)
    },
    testaa () {
      console.log(this.currentDate)
    },
    onConfirm (value) {
      console.log(value)
    }
  },
  computed: {
    // 日期格式规范
    timeAdd0: function () {
      return function (str) {
        var arr = str + ''
        if (arr.length <= 1) {
          arr = '0' + arr
        }
        return arr
      }
    }
  }
}
</script>
<style>
body {
  background: #DFE9FB;
}
</style>
