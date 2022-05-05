
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { register, sendEmail } from '../api'
import router from '../router'
import { ElMessage } from 'element-plus'
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  username: '',
  email: '',
  code: '',
  password: ''
})

const timeCount = ref()
const SendEmail = async () => {
  await sendEmail({ email: ruleForm.email })
  ElMessage.success('发送成功')
  timeCount.value = 60
  const time = setInterval(() => {
    timeCount.value--
    if (timeCount.value === 0) {
      clearInterval(time)
    }
  }, 1000)
}

const Register = async () => {
  await register(ruleForm)
  ElMessage.success('注册成功')
  setTimeout(() => router.push('login'), 2020)
}

const rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 2, message: '用户名最少2位', trigger: 'blur' }
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式不正确', trigger: 'blur' }
  ],
  code: [
    { required: true, message: "请输入邮箱验证码", trigger: "blur" },
    { pattern: /^\d{6}$/, message: '验证码格式不正确', trigger: 'blur' }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: '密码长度在6-20个字符之间', trigger: 'blur' }
  ],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      console.log(ruleForm)
      Register()
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
  <div class="bg">
    <div class="register">
      <h1>电影购票系统</h1>
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" type="test" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" type="test" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱验证码" prop="code">
          <el-input v-model="ruleForm.code" type="test" autocomplete="off" style="width: 63%;" />
          <el-button v-if="!timeCount" @click="SendEmail()">获取验证码</el-button>
          <el-button v-else disabled>{{ timeCount }}s重试</el-button>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
      <router-link to="/login">已有账号，立即登录</router-link>
    </div>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
}

.bg {
  background: url('/bg.jpg') no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

.register {
  box-shadow: 0px 0px 30px rgb(180, 180, 180);
  margin: 20vh auto 0;
  padding: 5vh 0;
  width: 600px;
}

.el-input {
  width: 400px;
}

.el-button {
  width: 20%;
  margin-bottom: 0;
}

.el-form-item__label {
  color: rgb(31, 31, 31);
}
.el-form-item__error{
  color: rgb(238, 255, 0);
}
</style>
