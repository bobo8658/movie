
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { login } from '../../api/admin'
import router from '../../router'
import { ElMessage } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  admin: '',
  password: ''
})

const rules = reactive({
  admin: [
    { required: true, message: "请输入用户名", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: '密码长度在6-20个字符之间', trigger: 'blur' }
  ],
})

const Login = async () => {
  const data: any = await login(ruleForm)
  localStorage.setItem('admin', JSON.stringify(ruleForm))
  ElMessage.success('登录成功')
  setTimeout(() => {
    router.push('admin')
  }, 200);
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
  <div class="bg">
    <div class="login">
      <h1>电影购票系统-管理员</h1>
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="admin">
          <el-input v-model="ruleForm.admin" type="test" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
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

.login {
  box-shadow: 0px 0px 30px rgb(180, 180, 180);
  margin: 26vh auto 0;
  padding: 5vh 0;
  width: 600px;
}

.el-input {
  width: 400px;
}

.el-button {
  width: 20%;
  margin-bottom: 20px;
}

.el-form-item__label {
  color: rgb(31, 31, 31);
}

.el-form-item__error {
  color: rgb(238, 255, 0);
}
</style>
