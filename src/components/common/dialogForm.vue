<template>
  <el-dialog
    :title="title"
    :visible.sync="visibleSync"
    :append-to-body="true"
    width="720px"
    class="form-dialog"
  >
    <el-form
      ref="formData"
      :model="model"
      :rules="rules"
      :inline="true"
      label-width="88px"
      label-position="left"
      size="mini"
    >
      <slot name="form" />
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="large" @click="formSubmit">提交</el-button>
      <el-button type="info" size="large" @click="visibleSync = false">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
/**
 * @param {String} title 标题
 * @param {Boolean} visible 显示控制
 * @param {String} model 绑定模板
 * @param {String} rules 校验规则
 * @event submit 提交点击时触发
 * @event close 关闭时触发
 */
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    },
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      visibleSync: false
    }
  },
  watch: {
    visibleSync() {
      if (this.visibleSync === false) {
        this.$emit('close')
      }
    },
    visible() {
      if (this.visible === true) {
        this.visibleSync = true
      } else {
        this.visibleSync = false
      }
    }
  },
  methods: {
    formSubmit() {
      const validate = this.$refs.formData.validate
      this.$emit('submit', validate)
    },
    resetFields() {
      this.$refs['formData'].resetFields()
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
