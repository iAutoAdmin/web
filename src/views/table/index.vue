<template>
  <div id="container">
    <div id="username" :model="username">{{ username }}</div>
    <div class="panel-head">
      <h4 class="panel-title">用户列表</h4>
      <div class="panel-ctrl">
        <el-button type="primary" class="pan-btn blue-btn" @click="addUser"><i class="el-icon-circle-plus" /> 新增用户</el-button>
      </div>
    </div>
    <el-table
      ref="tablePage"
      v-loading="loading"
      :data="tableData"
      border
      stripe
    >
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="60"
      />
      <el-table-column
        property="id"
        label="ID"
        align="center"
        width="120"
      />
      <el-table-column
        property="username"
        label="用户名"
        align="center"
      />
      <el-table-column
        property="name"
        label="姓名"
        align="center"
      />
      <el-table-column
        property="phone"
        label="电话"
        align="center"
      />
      <el-table-column
        property="email"
        label="邮箱"
        align="center"
      />
      <el-table-column
        property="is_active"
        label="登录状态"
        align="center"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.is_active">登录</div>
          <div v-else>未登录</div>
        </template>
      </el-table-column>
      <el-table-column
        property="last_login"
        label="登陆日期"
        align="center"
      />
    </el-table>

    <div class="block">
      <el-pagination
        :total="total"
        layout="total, prev, pager, next, jumper"
        :current-page="1"
        :page-size="50"
        @size-change="handleSizeChange"
      />
    </div>

    <el-dialog
      v-loading="loadingDialog"
      :title="titleFlag"
      :visible.sync="stageDialogVisible"
      :append-to-body="true"
      width="720px"
      class="form-dialog"
    >
      <el-form
        ref="formData"
        :model="formData"
        label-width="120px"
        class="search-form"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="formData.username" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model.trim="formData.name" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model.trim="formData.phone" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="large" @click="formClose">取 消</el-button>
        <el-button type="primary" size="large" @click="formSubmit('formData')">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { users, create } from '@/api/table'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号码或座机号码'))
      } else {
        if (this.isPoneAvailable(value) || this.isTelAvailable(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的手机号码或座机号码'))
        }
      }
    }
    return {
      api: users,
      stageDialogVisible: false,
      radio: '1',
      page: 1,
      // username: '',
      total: 0,
      titleFlag: 'AutoAdmin',
      dialogType: '',
      loading: false,
      loadingDialog: false,
      formData: {
        'username': '',
        'name': null,
        'phone': null
      },
      tableData: [{
        'id': '',
        'username': '',
        'name': null,
        'phone': null,
        'email': '',
        'is_active': false,
        'last_login': ''
      }],
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['username'])
  },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    // 判断是否为手机号
    isPoneAvailable(pone) {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(pone)) {
        return false
      } else {
        return true
      }
    },
    // 判断是否为电话号码
    isTelAvailable(tel) {
      var myreg = /^0\d{2,3}-?\d{7,8}$/
      if (!myreg.test(tel)) {
        return false
      } else {
        return true
      }
    },
    // 分页改变
    handleSizeChange(pageSize) {
      this.page = pageSize
      this.getData()
    },
    // 点击 -- 新增用户
    addUser() {
      this.stageDialogVisible = true
      this.titleFlag = '新增用户'
      this.dialogType = 'insert'
      const that = this
      setTimeout(() => {
        that.$refs.formData.resetFields()
      }, 50)
    },
    // 新增弹框 -- 取消
    formClose() {
      this.stageDialogVisible = false
      const that = this
      setTimeout(() => {
        that.$refs.formData.resetFields()
      }, 50)
    },
    // 新增弹框 -- 新增保存
    formSubmit(formData) {
      // const data = this.formData
      this.$refs[formData].validate((valid) => {
        if (valid) {
          if (this.dialogType === 'insert') {
            const DATA = this.formData
            create(DATA).then((res) => {
              if (res.code === 200) {
                this.$alert('新增成功！', '提示')
                this.$refs.tablePage.refresh()
              } else {
                this.$alert('新增失败', '提示')
              }
              this.stageDialogVisible = false
            })
          } else {
            /* const updataData = {
            }
            update(updataData).then((res) => {
              this.stageDialogVisible = false
              if (res.code === 200) {
                this.$alert('编辑成功！', '提示')
                this.$refs.tablePage.refresh()
              } else {
                this.$alert('编辑失败', '提示')
              }
            }) */
          }
        }
      })
    },
    getData() {
      const DATA = {
        page: this.page,
        username: this.username
      }
      this.loading = true
      users(DATA).then((res) => {
        if (res.count >= 0) {
          this.tableData = res.results
          this.total = res.count
          this.loading = false
        }
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#container {
  padding-top: 20px;
  #username {
    display: none;
  }
  .panel-head {
    display: flex;
    padding-right: 20px;
    justify-content: space-between;
    align-items: center;
    height: 50px;
  }
}
</style>
