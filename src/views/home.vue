            
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import router from '../router'
import { inquireMovie, allMovieType } from '../api'
import { Search } from '@element-plus/icons-vue'
import User from '../components/User.vue'
import { debounce } from '../hook/debounce'

interface searchType {
  key: string,
  movieType: string,
  recommend: string
}
const search = reactive<searchType>({
  key: '',
  movieType: '',
  recommend: ''
})

// 用户
const user = JSON.parse((localStorage.getItem('user')) as string)

// 类别
const types = ref<any>([{ typeName: '全部电影' }, { typeName: '推荐电影' }])
const getAllType = async () => {
  const data = await allMovieType()
  types.value.push.apply(types.value, data)
  console.log(types.value);
}
getAllType()
// 电影
const movie = ref()
const getAllMovie = async () => {
  movie.value = await inquireMovie(search)
}
getAllMovie()
const toMovie = (index: number) => {
  const movieId = movie.value[index].movieId
  router.push(`movie?id=${movieId}`)
}
// 电影搜索
const flag = ref(0)
const getSearch = (index: number) => {
  flag.value = index
  movie.value = ''
  if (index === 0) {
    search.movieType = ''
    search.recommend = ''
  } else if (index === 1) {
    search.movieType = ''
    search.recommend = 'true'
  } else {
    search.movieType = types.value[index].typeName
    search.recommend = ''
  }
  return getAllMovie()
}
const inputchange = debounce(() => {
  inquireMovie(search).then(res => movie.value = res)
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
      <ul>
        <li v-for="(item, index) in types" :class="flag === index ? 'active' : ''" @click="getSearch(index)">{{ item.typeName }} </li>
      </ul>
      <div class="movieList">
        <div class="movie" v-for="(item, index) in movie" @click="toMovie(index)">
          <div class="img"><img :src="item.imgPath" alt=""></div>
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

      .img {
        width: 200px;
        height: 160px;

        img {
          text-align: center;
          max-height: 100%;
          max-width: 100%;
        }
      }

      .name {
        margin: 6px auto;
      }
    }
  }
}

ul {
  list-style-type: none;
  display: flex;

  li {
    cursor: pointer;
    margin: 0 20px;
  }
}

.active {
  font-weight: 700;
}
</style>
