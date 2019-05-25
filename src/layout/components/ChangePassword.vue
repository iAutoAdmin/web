<template>
  <div id="ChangePassword">
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ChangePassword",
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    /* 方法 */
    handleClose() {}
  },
  components: {
    /* 复用组件名称 */
  },
  mounted: function() {
    /* 初始化数据 */

    console.log(1);
  },
  watch: {
    /* 监听 */
  }
};
</script>

<style lang='scss'>
#ChangePassword {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 400px;
  border: 4px solid #000;
  z-index: 99999999;
  .el-dialog__wrapper {
    width: 100%;
    height: 100%;
    .el-dialog {
      margin: 0 !important;
      width: 100% !important;
      height: 100% !important;
    }
  }
}
</style>
