<template>
  <div id="container">
    <div id="username" :model="username">{{ username }}</div>
    <div>
      <el-form
        :model="formDataFilter"
        :inline="true"
        label-width="auto"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="formDataFilter.username" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model.trim="formDataFilter.name" />
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model.trim="formDataFilter.phone" />
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-select v-model="formDataFilter.struts" placeholder="All">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmitFilter">查 询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onResetFilter">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
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
        v-if="false"
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
          <div v-if="scope.row.is_active">激活</div>
          <div v-else>未激活</div>
        </template>
      </el-table-column>
      <el-table-column
        property="last_login"
        label="登陆日期"
        align="center"
      />
      <el-table-column
        label="操作"
        width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="1"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        @current-change="handleCurrentChange"
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
import { isPoneTelAvailable } from '@/utils/validate'
import { users, tableCreate } from '@/api/table'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号码或座机号码'))
        return
      }
      if (isPoneTelAvailable(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号码或座机号码'))
      }
    }
    return {
      api: users,
      stageDialogVisible: false,
      radio: '1',
      // username: '',
      total: 0,
      titleFlag: 'AutoAdmin',
      dialogType: '',
      loading: false,
      loadingDialog: false,
      formDataFilter: {
        'page': '1',
        'username': '',
        'name': '',
        'phone': '',
        'page_size': '10'
      },
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
  mounted() {
    this.getData(this.formDataFilter)
  },
  methods: {
    // 查询
    onSubmitFilter() {
      this.getData(this.formDataFilter)
    },
    // 重置
    onResetFilter() {
      this.formDataFilter.username = ''
      this.formDataFilter.name = ''
      this.formDataFilter.phone = ''
      this.getData(this.formDataFilter)
    },
    // 分页改变
    handleCurrentChange(pageSize) {
      this.formDataFilter.page = pageSize
      this.getData(this.formDataFilter)
    },
    // 改变分页默认展示多少条数据
    handleSizeChange(pageSize) {
      this.formDataFilter.page_size = pageSize
      this.getData(this.formDataFilter)
    },
    // 列表操作 - 编辑
    handleEdit(id) {
      console.log(id)
      // this.$router.replace('/dashboard')
    },
    // 列表操作 - 删除
    handleDelete() {

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
      this.$refs[formData].validate((valid) => {
        if (valid) {
          if (this.dialogType === 'insert') {
            const DATA = this.formData
            tableCreate(DATA).then((res) => {
              this.getData(this.formDataFilter)
              this.stageDialogVisible = false
            })
          }
        }
      })
    },
    getData(paramsFilter) {
      this.loading = true
      users(paramsFilter).then((res) => {
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
  .block {
    padding-top: 10px;
    .el-pagination {
      text-align: right;
    }
  }
}
</style>
