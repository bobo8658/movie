<script lang="ts" setup>
const height = document.body.clientHeight
const { admin } = JSON.parse(localStorage.getItem('admin') as string)
const menuList = [
  { id: 0, menuName: '用户管理', path: '/admin/user' },
  { id: 1, menuName: '电影管理', path: '/admin/movie' },
  { id: 2, menuName: '订单管理', path: '/admin/order' }
]
const next = (router: any) => {
  router.nextrouter = router
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-image src="/logo.png" class="logo"></el-image>
        <div class="user">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <span class="admin">{{ admin }}</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu background-color="#9ad2f0" text-color="#fff" router>
            <!-- :index中的''很重要 -->
            <el-menu-item v-for="item in menuList" :key="item.id" :index="item.path" @click="next(item.menuName)">
              <span>{{ item.menuName }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(236, 236, 236);

  .logo {
    height: 36px;
  }

  .user {
    margin-right: 10vw;

    .el-avatar {
      margin-right: 10px;
      vertical-align: text-bottom;
    }
  }
}

.el-aside {
  background-color: #9ad2f0;
  height: (--height);
  min-height: calc(100vh - 60px);
  .el-menu-item{
    justify-content: center;
  }
}
</style>
