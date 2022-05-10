            
<script lang="ts" setup>
import { ref, watch } from 'vue'
import router from '../router'
import { inquireMovie } from '../api'
import { Search } from '@element-plus/icons-vue'
import User from '../components/User.vue'
import { debounce } from '../hook/debounce'

// 用户
const user = JSON.parse((localStorage.getItem('user')) as string)

// 电影
interface searchType {
  key: string,
  movieType: string,
  recommend: string
}
const search = ref<searchType>({
  key: '',
  movieType: '',
  recommend: ''
})
const movie = ref()
inquireMovie(search.value).then(res => movie.value = res)
const toMovie = (index: number) => {
  const movieId = movie.value[index].movieId
  router.push(`movie?id=${movieId}`)
}
// 电影搜索
const inputchange = debounce(() => {
  inquireMovie(search.value).then(res => movie.value = res)
}, 500)
</script>

<template>
  <div class="home">
    <nav>
      <el-image src="/logo.png" class="logo"></el-image>
      <el-input v-model="search.key" class="w-50 m-2 search" placeholder="搜索电影" :suffix-icon="Search"
        @input="inputchange" />
      <div class="user">
        <User v-if="user"></User>
        <router-link to="/login" v-else>登陆注册</router-link>
      </div>
    </nav>
    <main>
      <!-- <h2>推荐电影</h2> -->
      <div class="movieList">
        <div class="movie" v-for="(item, index) in movie" @click="toMovie(index)">
          <img :src="item.imgPath" alt="">
          <div class="name">{{ item.movieName }} </div>
          <div class="grade">评分:{{ item.grade }}分 </div>
        </div>
      </div>
    </main>
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

main {
  .movieList {
    display: flex;
    flex-wrap: wrap;

    .movie {
      width: 200px;
      margin: 30px;
      cursor: pointer;

      img {
        width: 120px;
      }

      .name {
        margin: 6px auto;
      }
    }
  }
}
</style>
