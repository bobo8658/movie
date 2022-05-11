
<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { allUser, delUser, delUserVip } from '../../api/admin';

const users = ref()
const getAllUser = async () => {
  users.value = await allUser()
}
getAllUser()
const deleteUser = async (userId: number) => {
  await delUser({ userId })
  ElMessage.success('删除成功')
  return getAllUser()
}
const deleteUserVip = async (userId: number) => {
  await delUserVip({ userId })
  ElMessage.success('取消成功')
  return getAllUser()
}
const formateSex = (row: any) => row.sex ? '男' : '女'
const formateVip = (row: any) => row.vip ? '是' : '否'
</script>

<template>
  <div class="page">
    <h2>用户信息</h2>
    <el-table :data="users">
      <el-table-column fixed prop="username" label="用户名" width="100"></el-table-column>
      <el-table-column prop="sex" label="性别" :formatter="formateSex" width="100"></el-table-column>
      <el-table-column prop="age" label="年龄" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="250"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="200"></el-table-column>
      <el-table-column prop="info" label="介绍"></el-table-column>
      <el-table-column prop="vip" label="Vip用户" :formatter="formateVip" width="100"></el-table-column>
      <el-table-column fixed="right" prop="username" label="操作" width="200">
        <template #default="scope">
          <el-button text size="small" @click.prevent="deleteUser(scope.row.userId)">删除用户</el-button>
          <el-button text size="small" v-if="scope.row.vip" @click.prevent="deleteUserVip(scope.row.userId)">取消会员</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- {{users[0]}} -->
  </div>
</template>

<style lang="scss" scoped>
.page {
  text-align: left;
}
h2{
  padding: 10px;
}
</style>
