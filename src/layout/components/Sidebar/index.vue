<template>
  <div>
    <div class="nameNav" v-if="!isCollapse" @click="toFaceIndex">
        <!-- <img src="@/assets/images/open-logo.png" alt style="width:30px;margin-right:12px;" /> -->
        <img src="@/assets/images/logo-text.png" alt style="width:203px;" />
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg" :text-color="variables.menuText" :unique-opened="false"
               :active-text-color="variables.menuActiveText" :collapse-transition="false" mode="vertical">
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
    <div class="bottombj"></div>
    <div class="bottomNav">
      <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
               @toggleClick="toggleSideBar" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import Hamburger from '@/components/Hamburger'
import variables from '@/styles/layout.scss'
import { constantRoutes } from '@/router'

export default {
  components: { SidebarItem, Hamburger },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes(){
      return constantRoutes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      return meta.sidebar || route.path; //*解决子页面不选中父级菜单
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    toFaceIndex() {
      window.open(`${process.env.VUE_APP_REDIRECT_URL}`)
    }
  }
}
</script>

<style lang="scss">
.nameNav {
  width:256px;
  height:60px;
  font-size:20px;
  color:#fff;
  font-weight: bolder;
  font-family: Microsoft Yahei;
  box-sizing: border-box;
  padding: 15px 18px;
  // background-color: #4584f7;

  // background: linear-gradient(360deg, #589FFB 0%, #3C78F5 100%);
  background: #3C78F5;
  box-shadow: 1px 0px 3px 0px rgba(0, 21, 41, 0.12);
}
.bottomNav {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 45px;
  padding-top: 10px;
  box-sizing: border-box;
  color: #fff;
  background: rgb(69, 132, 247);
  border-top: 1px solid #60a2f8;
}
.bottombj {
  width: 183px;
  height: 150px;
  position: absolute;
  bottom: 200px;
  background: url(./bgsider.png);
  pointer-events: none;
}
.hamburger-container{
  color: #fff;
}
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
    // padding-top: 20px;
    // background: #4584f7;
  }

  .el-scrollbar__view {
    height: 100%;
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}

/deep/.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
/deep/.el-submenu .el-menu .nest-menu{
  .el-submenu__title{
    padding-left: 50px!important;
  }
  .el-menu--inline {
    .el-menu-item{
      padding-left: 80px!important;
      padding-right: 35px!important;
    }
  }
}
</style>
