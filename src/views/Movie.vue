
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router';
import { inquireMovieDetail, addUserEvaluate, addOrder, addBook } from '../api';


const route = useRoute()
const movieId = route.query.id
const movie = ref()
inquireMovieDetail({ movieId }).then(res => movie.value = res)

const getUesrId = () => {
  if (typeof localStorage.getItem('user') === 'string') {
    return (JSON.parse(localStorage.getItem('user') as string)).userId
  } else return null
}
const addEvaluate = reactive({
  userId: getUesrId(),
  movieId,
  content: '',
  star: 5
})
const addEventUserEvaluate = async () => {
  await addUserEvaluate(addEvaluate)
  ElMessage.success('添加成功')
  inquireMovieDetail({ movieId }).then(res => movie.value = res)
}

const movieOrderFormVisible = ref(false)
const movieOrder = reactive({
  userId: getUesrId(),
  movieId,
  username: '',
  phone: '',
  num: 1
})
const addMovieOrder = async () => {
  await addOrder(movieOrder)
  ElMessage.success('请前往“我的订单”进行支付')
  movieOrderFormVisible.value = false
}

const addMovieBook = async () => {
  await addBook({ userId: getUesrId(), movieId })
  ElMessage.success('预定成功')
}
</script>

<template>
  <div class="page">
    <div class="movie">
      <div class="img">
        <img :src="movie.imgPath" alt="">
      </div>
      <div class="detail">
        <h2>{{ movie.movieName }}
          <el-button style="float: right" @click="movieOrderFormVisible = true">立即购票</el-button>
          <el-button style="float: right" @click="addMovieBook">立即预定</el-button>
        </h2>
        <div>导演：{{ movie.director }}</div>
        <div>主演：{{ movie.actor }}</div>
        <div>类型：{{ movie.movieType }}</div>
        <div>上映日期：{{ movie.startTime }}</div>
        <div>片长：{{ movie.duration }}</div>
        <div>价格：{{ movie.price }}</div>
        <div>评分：{{ movie.grade }}</div>
        <br>
        <div>{{ movie.intro }}</div>
      </div>
    </div>
    <div class="evaluates">
      <h3>全部评价</h3>
      <div class="evaluate" v-for="item in movie.allEvaluate">
        <span class="username">{{ item.username }}</span>
        <span class="star">评分：{{ item.star }}分</span>
        <div class="content">{{ item.content }}</div>
      </div>
      <div class="add-evaluate">
        <h3>我的评价</h3>
        <el-input v-model="addEvaluate.content" :autosize="{ minRows: 2, maxRows: 5 }" type="textarea"
          placeholder="Please input" />
        <span>评分：</span>
        <el-input-number v-model="addEvaluate.star" :min="1" :max="10" />
        <el-button class="btn" @click="addEventUserEvaluate()">提交</el-button>
      </div>
    </div>
  </div>
  <el-dialog class="order" v-model="movieOrderFormVisible" title="购票信息" width="30%">
    <el-form :model="movieOrder">
      <el-form-item label="电影名：" label-width="100px">
        {{ movie.movieName }}
      </el-form-item>
      <el-form-item label="用户名：" label-width="100px">
        <el-input v-model="movieOrder.username"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" label-width="100px">
        <el-input v-model="movieOrder.phone"></el-input>
      </el-form-item>
      <el-form-item label="购票数：" label-width="100px">
        <el-input-number v-model="movieOrder.num" :min="1" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="movieOrderFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addMovieOrder">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.page {
  padding: 30px 0;
  width: 800px;
  margin: 0 auto;
  text-align: left;
}

.movie {
  display: flex;
  justify-content: space-between;

  .img {
    width: 300px;

    img {
      width: 100%;
    }
  }

  .detail {
    width: 400px;
    line-height: 30px;
  }
}

.evaluates {
  .evaluate {
    border-top: 1px solid rgb(190, 190, 190);
    padding: 10px 30px;

    .username {
      color: rgb(50, 188, 212);
      margin-right: 40px;
    }

    .content {
      margin-top: 5px;
      font-size: 14px;
    }
  }
}

.btn {
  float: right;
}

.order {
  el-input {
    float: left;
  }
}
</style>
