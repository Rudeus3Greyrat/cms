<template>
  <div class="navbar-container">
    <!-- <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
               @toggleClick="toggleSideBar" /> -->
    <div class="nav-handle-block fl d-flex ai-center pr-5 text">控制台</div>
    <div class="nav-handle-block fr d-flex ai-center pr-5">
      <el-button type="warning" size="small" round style="background:#fff;color:#666;
font-weight: 700;" @click="toDocumentCenter">文档中心</el-button>
      <el-dropdown style="margin-left:20px">
        <span class="el-dropdown-link pointer">
          <span class="itemname">{{email}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item style="margin-bottom:20px;pointer-events: none;">
            <div style="width:60px;height:60px;border-radius:100%;overflow:hidden" class="fl">
              <img style="width:100%;height:100%;" src="@/assets/images/avatar.png" alt="无">
            </div>
            <div style="margin-left:20px;" class="fl">
              {{email}}
            </div>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout" style="height:50px;margin-top:0px">
            <div style="width:30px;height:30px;padding-top:15px" class="fl">
              <img style="width:25px;" src="../../../assets/images/logout.png" alt="无">
            </div>
            <div style="margin-left:10px;padding-top:10px" class="fl">
              退出
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="setDialog" v-if="isDeadLine">
      <div class="setDialog-title">
        SecretKey到期更换通知
      </div>
      <div class="setDialog-content">
        <div class="desc">
          您创建的应用SecretKey已到期，为了保障您的调用和资金安全，请尽快登录控制台-应用管理中更新秘钥。
        </div>
        <div>
          <el-checkbox v-model="isAcceptRisk">已知风险，不再弹出</el-checkbox>
        </div>
      </div>
      <div class="setDialog-footer">
        <el-button @click="ignoreRisk">已知风险并忽略</el-button>
        <el-button type="primary" @click="changeRisk">马上去更换</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      isDeadLine: false,
      isAcceptRisk: false
    }
  },
  computed: {
    ...mapGetters(['sidebar','email']),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
    },
    toDocumentCenter() {
      window.open(`${process.env.VUE_APP_REDIRECT_URL}/document?id=extra1`)
    },
    toMessage() {
      if(this.$route.path !== '/insertEmail') {
        this.$router.push('/insertEmail')
      }
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.hamburger-container {
  line-height: 46px;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
.nav-handle-block {
  height: 100%;
}
.text{
  color: #666666;
  padding-left: 20px;
  font-weight: 500;
}
.itemname {
  margin-right: 10px;
  font-weight: bold;
}
.setDialog {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 400px;
  height: 300px;
  z-index: 999;
  background-color: #fff;
  border: 1px solid #1e88f5;
  .setDialog-title {
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    color: #fff;
    background-color: #1e88f5;
  }
  .setDialog-content {
    height: 200px;
    padding: 10px 15px;
    .desc {
      line-height: 30px;
      margin-bottom: 60px;
    }
  }
  .setDialog-footer {
    display: flex;
    justify-content: space-around;
  }
}
/deep/.el-badge__content.is-fixed.is-dot {
  right: 0px!important;
}
</style>
