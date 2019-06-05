<template>
  <div id="container" style="height:100%;">
    <div id="username" style="display:none" :model="username">{{ username }}</div>
    <div class="panel-head">
      <span class="panel-title">用户列表</span>
      <div class="panel-ctrl">
        <button-ctrl @click="addUser">新增用户</button-ctrl>
      </div>
    </div>
    <el-table
      ref="tablePage"
      v-loading="loading"
      :data="tableData"
      stripe
      style="width: 100%;max-height: 350px;"
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
          <div v-if="scope.row.is_active">登录状态</div>
          <div v-else>未登录状态</div>
        </template>
      </el-table-column>
      <el-table-column
        property="last_login"
        label="登陆日期"
        align="center"
      />
    </el-table>
    <div class="pagination-wrap">
      <span class="demonstration">显示总数：{{ total }} 条 </span>
      <el-pagination
        style="width:auto;float:right"
        :total="total"
        layout="next, pager, prev"
        small
        @current-change="handleSizeChange"
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
        :inline="true"
        label-width="88px"
        label-position="left"
        size="mini"
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
        <!-- <el-form-item label="登录状态" prop="is_active">
          <el-radio-group v-model="formData.is_active">
            <el-radio :label="1">已登录</el-radio>
            <el-radio :label="2">未登录</el-radio>
          </el-radio-group>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="large" @click="formSubmit('formData')">提交</el-button>
        <el-button type="info" size="large" @click="formClose">关闭</el-button>
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
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        if (value === this.username) {
          callback()
        } else {
          callback(new Error('请输入正确的用户名'))
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
      titleFlag: '新增用户',
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
          // message: '请输入用户名',
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        phone: [
          // { required: true, message: '请输入电话', trigger: 'blur' }
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
<style lang="stylus" scoped>
#container{
  margin-bottom: 10px;
  background: #fff;
  -webkit-box-shadow: 0 1px 6px 0 rgba(0,0,0,0.1);
  box-shadow: 0 1px 6px 0 rgba(0,0,0,0.1);
  border-radius: 4px;
  background: #fff;
}
.panel-head{
    height: 44px;
    padding: 0 20px;
    line-height: 44px;
}
.panel-title{
    display: inline-block;
    padding-left: 5px;
    font-size: 14px;
    font-weight: bold;
    line-height: 1;
    border-left: 2px solid #e63f3c;
}
.panel-ctrl{
    float: right;
    margin-top: 11px;
}
.btn-ctrl{
    display: inline-block;
    float: left;
    min-width: 70px;
    height: 22px;
    padding: 0 10px;
    margin-left: 10px;
    font-size: 12px;
    line-height: 22px;
    text-align: center;
    color: #e63f3c;
    background: #fff;
    -webkit-box-shadow: 0 1px 4px 0 rgba(0,0,0,0.2);
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.2);
    border-radius: 100px;
    cursor: pointer;
    -webkit-transition: -webkit-box-shadow 0.3s;
    transition: -webkit-box-shadow 0.3s;
    transition: box-shadow 0.3s;
    transition: box-shadow 0.3s, -webkit-box-shadow 0.3s;
}
.btn-ctrl:hover {
    -webkit-box-shadow: 0 1px 4px 0 #e63f3c;
    box-shadow: 0 1px 4px 0 #e63f3c;
}
.demonstration{
  font-size: 12px;
  font-weight: 700;
  height: 22px;
  line-height: 22px;
  float: left;
}
</style>
