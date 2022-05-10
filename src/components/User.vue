            
<script lang="ts" setup>
import { ref } from 'vue'
import router from '../router'
import { ElMessage } from 'element-plus'
import { toVip, getVip } from '../api'

// 用户
const userInfoFormVisible = ref(false)
const user = JSON.parse((localStorage.getItem('user')) as string)
const { username, sex, phone, info, age, userId } = user
const userInfo = ref({ username, sex, phone, info, age, userId })
const handleLogout = (key: any) => {
  console.log(key)
  if (key == 'info') {
    console.log(userInfo);
    return
  }
  if (key == 'logout') {
    localStorage.removeItem('user')
    router.go(0)
  }
}
const handleSubmitUserInfo = async () => {
  await toVip(userInfo.value)
  ElMessage.success('修改成功')
  const data = getVip({ userId })
  localStorage.setItem('user', JSON.stringify(data))
}
</script>

<template>
  <el-dropdown @command="handleLogout">
    <span class="el-dropdown-link">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="info" @click="userInfoFormVisible = true">个人信息</el-dropdown-item>
        <el-dropdown-item command="info" @click="userInfoFormVisible = true">我的预定</el-dropdown-item>
        <el-dropdown-item command="info" @click="userInfoFormVisible = true">我的订单</el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <el-dialog v-model="userInfoFormVisible" title="完善个人信息" width="30%">
    <el-form :model="userInfo">
      <el-form-item label="姓名" label-width="100px">
        <el-input v-model="userInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="简介" label-width="100px">
        <el-input v-model="userInfo.info"></el-input>
      </el-form-item>
      <el-form-item label="手机号" label-width="100px">
        <el-input v-model="userInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="年龄" label-width="100px">
        <el-input v-model="userInfo.age"></el-input>
      </el-form-item>
      <el-form-item label="性别" label-width="100px">
        <el-radio-group v-model="userInfo.sex">
          <el-radio :label="true">男</el-radio>
          <el-radio :label="false">女</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="userInfoFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmitUserInfo(); userInfoFormVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<style lang="scss" scoped>
nav {
  display: flex;
  padding: 10px 0;
  justify-content: space-between;
  align-items: center;

  .logo {
    height: 40px;
  }

  .search {
    width: 300px;
  }
}
</style>
