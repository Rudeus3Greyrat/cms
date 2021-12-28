<template>
  <el-row>
    <el-date-picker
        v-model="time"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
    </el-date-picker>
    <el-radio-group v-model="timerange" style="margin-left:20px;">
      <el-radio-button v-if="type === 'today'" label="今天"></el-radio-button>
      <el-radio-button v-if="type === 'yesterday'" label="昨天"></el-radio-button>
      <el-radio-button label="近7天"></el-radio-button>
      <el-radio-button label="近30天"></el-radio-button>
      <el-radio-button label="近一年"></el-radio-button>
      <el-radio-button label="全部"></el-radio-button>
    </el-radio-group>
  </el-row>
</template>
<script>
let moment = require("moment")
export default {
  props: {
    type: {
      type: String,
      default: 'yesterday'
    }
  },
  data() {
    return {
      time: [],
      timerangeList: []
    }
  },
  watch: {
    time(val, oldVal) {
      this.$emit('setTime',val, oldVal)
    }
  },
  computed: {
    timerange: {
      get() {
        let str = ''
        if (this.time[0] === this.timerangeList[4] && this.time[1] === this.timerangeList[1]) {
          str = '近一年'
        } else if (this.time[0] === this.timerangeList[0] && this.time[1] === this.timerangeList[1]) {
          str = '今天'
        } else if (this.time[0] === this.timerangeList[1] && this.time[1] === this.timerangeList[1]) {
          str = '昨天'
        } else if (this.time[0] === this.timerangeList[2] && this.time[1] === this.timerangeList[1]) {
          str = '近7天'
        } else if (this.time[0] === this.timerangeList[3] && this.time[1] === this.timerangeList[1]) {
          str = '近30天'
        } else if (this.time[0] === "2020-01-01" && this.time[1] === moment(new Date()).format('YYYY-MM-DD')) {
          str = '全部'
        }
        return str
      },
      set(payload) {
        if(payload === '近一年') {
          this.time = [this.timerangeList[4], this.timerangeList[1]]
        } else if(payload === '今天') {
          this.time = [this.timerangeList[0], this.timerangeList[1]]
        } else if(payload === '昨天') {
          this.time = [this.timerangeList[1], this.timerangeList[1]]
        } else if(payload === '近7天') {
          this.time = [this.timerangeList[2], this.timerangeList[1]]
        } else if(payload === '近30天') {
          this.time = [this.timerangeList[3], this.timerangeList[1]]
        } else if(payload === '全部'){
          this.time = ["2020-01-01", moment(new Date()).format('YYYY-MM-DD')]
        }
      }
    }
  },
  mounted() {
    const today= moment().format('YYYY-MM-DD');
    const lastYearDay = moment().subtract(365, 'days').format('YYYY-MM-DD');
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const weekday = moment().subtract(7, 'days').format('YYYY-MM-DD');
    const monthday = moment().subtract(30, 'days').format('YYYY-MM-DD');
    const allDay = ''
    this.timerangeList = [today,yesterday,weekday,monthday,lastYearDay, allDay]
    this.time = [weekday,yesterday]
  },
}
</script>
