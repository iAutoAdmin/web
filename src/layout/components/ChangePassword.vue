<template>
  <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
  <el-dialog
    id="ChangePassword"
    title="修改密码"
    :visible.sync="dialogFormVisible"
    @click="isDialogFormVisible()"
  >
    <el-form
      ref="formData"
      :model="formData"
      label-width="120px"
      :rules="rules"
    >
      <el-form-item label="新密码">
        <el-input v-model.trim="formData.password" auto-complete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="phone">
        <el-input v-model.trim="formData.phone" auto-complete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isDialogFormVisible()">取 消</el-button>
      <el-button type="primary" @click="submit('formData')">确 定</el-button>
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
    var verifyPassword = (rule, value, callback) => {
      if (value === this.password) {
        callback()
      } else {
        callback(new Error('两次密码不一致 !'))
      }
    }
    return {
      dialogFormVisible: false,
      formData: {
        password: '',
        phone: ''
      },
      rules: {
        phone: [
          { required: true, validator: verifyPassword, trigger: 'blur' }
        ]
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
    submit(formName) {
      this.$refs[formName].validate((valid) => {

      });
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
