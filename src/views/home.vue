            
<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '../store'
import { Search } from '@element-plus/icons-vue'
const searchMovie = ref('')
const userStore = useUserStore()
let userInfoFormVisible = false

const handleLogout = (key: any) => {
  console.log(key)
  if (key == 'name') return
  if (key == 'email') return
  if (key == 'info') {
    userInfoFormVisible = true
    return
  }
  if (key == 'logout') {
    userStore.userId = 10
  }
}
</script>

<template>
  <div class="home">
    <nav>
      <el-image src="/logo.png" class="logo"></el-image>
      <el-input v-model="searchMovie" class="w-50 m-2 search" placeholder="搜索电影" :suffix-icon="Search" />
      <div class="user">
        <el-dropdown v-if="userStore.userId" @command="handleLogout">
          <span class="el-dropdown-link">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="info">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <router-link to="/login" v-else>登陆注册</router-link>
      </div>
    </nav>
    {{ userStore.userId }}
  </div>
</template>

<style lang="scss" scoped>
.home {
  margin: 0 auto;
  width: 1080px;
}

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
