<template>
  <div :class="classObj" class="app-wrapper">
    <div class="wrapper-nav">
      <div class="nav-logo">
        <span>AutoAdmin</span>
      </div>
      <div class="nav-menu">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <span class="nav-username">{{ username }}</span>
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
              <el-dropdown-item>个人信息</el-dropdown-item>
            </a>
            <a href="javascript:;" @click="updatePassword()">
              <el-dropdown-item>修改密码</el-dropdown-item>
            </a>
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="wrapper-main">
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
      <sidebar class="sidebar-container" />
      <div :class="{hasTagsView:needTagsView}" class="main-container">
        <div :class="{'fixed-header':fixedHeader}">
          <tags-view v-if="needTagsView" />
          <navbar />
        </div>
        <app-main />
        <right-panel v-if="showSettings">
          <settings />
        </right-panel>
      </div>
    </div>
    <changePassword :is-update-password-dom.sync="isUpdatePassword" />
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { mapState, mapActions, mapGetters } from 'vuex'
import { Navbar, Sidebar, AppMain, Settings, TagsView } from './components'
import changePassword from './components/ChangePassword'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    changePassword,
    RightPanel,
    Settings,
    TagsView
  },
  mixins: [ResizeMixin],
  props: {
    isUpdatePasswordDom: Boolean
  },
  data() {
    return {
      isUpdatePassword: false
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    ...mapGetters(['username']),
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    ...mapActions(['resetToken', 'getInfo']),
    updatePassword() {
      this.isUpdatePassword = true
    },
    logout() {
      this.$store.dispatch('user/resetToken')
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.wrapper-nav {
  height: 50px;
  margin-bottom: 2px;
  background-color: #304156;
  .nav-logo{
    float:left;
    font-size: 30px;
    line-height: 50px;
    padding-left: 20px;
    color:white;
  }
  .nav-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 0px;
        position: relative;
        font-size: 20px;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -14px;
          top: 20px;
          font-size: 14px;
          color:#fff;
        }
      }
    }
  }
  .nav-username {
    float: right;
    min-width: 100px;
    padding-right: 10px;
    text-align: right;
    font-weight: 700;
    line-height: 50px;
    color: #fff;
  }
}

.wrapper-main {
  height: calc(100% - 52px);
  overflow-y: auto;
}

.fixed-header {
  position: fixed;
  top: 52px;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
