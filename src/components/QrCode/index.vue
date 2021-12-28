<template>
  <el-dialog :title="typeName + '支付'" :visible.sync="dialogVisible" width="420px" class="openBox" @close="$emit('close')">
    <div style="text-align: center;">
      应支付金额
      <span style="font-size: 25px;color: orange">￥{{ amount }}</span>
    </div>
    <div v-if="dialogVisible" class="myLoading" ref="qrCodeUrl"></div>
    <div slot="footer" class="dialog-footer">
      请在3分钟之内完成支付
    </div>
  </el-dialog>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  props: ['visible', 'url', 'amount', 'typeName'],
  name: "index",
  data() {
    return {
      dialogVisible: this.visible,
      timeStart: 180
    }
  },
  watch: {
    'visible'() {
      this.dialogVisible = this.visible
      this.timeStart = 180
      if(this.dialogVisible) {
        this.createImgUrl()
        this.timeCount()
      }
    }
  },
  methods: {
    // 获取二维码
    createImgUrl() {
      this.$nextTick(()=>{
        new QRCode(this.$refs['qrCodeUrl'], {
          text: this.url,
          width: 256,
          height: 256,
          colorDark: '#000000', //前景色
          colorLight: '#ffffff',  //背景色
          correctLevel: QRCode.CorrectLevel.Q
        })
      })
    },
    timeCount() {
      let tt
      let timeStep = -1;
      this.timeStart += timeStep;
      if(this.timeStart < 0){
        //倒计时为0时执行xxxx方法
        this.$emit('close')
        clearInterval(tt)
      } else {
        tt = setTimeout(()=> {
          this.timeCount()
        },1000);
      }
    }
  }
}
</script>

<style scoped land="scss">
.dialog-footer{
  text-align: center;
}
.myLoading{
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>