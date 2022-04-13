
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { login } from '../api'
import router from '../router'
import { useUserStore } from '../store'

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  email: '',
  password: ''
})

const rules = reactive({
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式不正确', trigger: 'blur' }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: '密码长度在6-20个字符之间', trigger: 'blur' }
  ],
})

const Login = async () => {
  const data: any = await login(ruleForm)
  useUserStore().user = data
  console.log(useUserStore().user)
  router.push('/home')
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      console.log(ruleForm)
      Login()
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
      
<template>
  <div class="login">
    <h1>电影购票系统</h1>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" type="test" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <router-link to="/register">没有账号，立即注册</router-link>
  </div>
</template>




<style lang="scss" scoped>
.login {
  margin: 26vh auto 0;
  width: 600px;
}

.el-button {
  width: 20%;
}
</style>
