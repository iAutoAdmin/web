<template>
  <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
  <el-dialog
    id="ChangePassword"
    title="修改密码"
    :visible.sync="dialogFormVisible"
    @click="isDialogFormVisible()"
  >
    <el-form :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" auto-complete="off"><!-- 用户名 --></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" auto-complete="off"><!-- 密码 --></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name" auto-complete="off"><!-- 姓名 --></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone" auto-complete="off"><!-- 手机号 --></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isDialogFormVisible()">取 消</el-button>
      <el-button type="primary" @click="submit()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ChangePassword',
  props: {
    isUpdatePasswordDom: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        username: '',
        password: '',
        name: '',
        phone: ''
      }
    }
  },
  // components: {
  //   /* 复用组件名称 */
  // },
  watch: {
    /* 监听 */
    isUpdatePasswordDom: function(val) {
      this.dialogFormVisible = val
    },
    dialogFormVisible: function(val) {
      if (val === false) {
        this.$emit('update:isUpdatePasswordDom', false)
      }
    }
  },
  mounted: function() {
    /* 初始化数据 */
  },
  methods: {
    /* 方法 */
    submit() {
      this.$emit('update:isUpdatePasswordDom', false)
    },
    isDialogFormVisible() {
      this.$emit('update:isUpdatePasswordDom', false)
    }
  }
}
</script>

<style lang='scss'>
#ChangePassword {
  // width: 800px;
}
</style>
