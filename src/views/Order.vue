
<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { allOrder, inquireMovieDetail, payOrder, delOrder, updOrder } from '../api'
const { userId } = JSON.parse(localStorage.getItem('user') as string)

const orders = ref()
const getAllOrder = async () => {
  orders.value = await allOrder({ userId })
  orders.value.forEach(async (e: any, i: number) => {
    const movie = await inquireMovieDetail({ movieId: e.movieId })
    orders.value[i] = { ...e, ...movie }
  })
}
getAllOrder()
const payMovieOrder = async (index: number) => {
  const { orderId } = orders.value[index]
  await payOrder({ orderId })
  ElMessage.success('支付成功')
  orders.value[index].pay = true
}
const delMovieOrder = async (index: number) => {
  const { orderId } = orders.value[index]
  await delOrder({ orderId })
  ElMessage.success('删除成功')
  orders.value.splice(index, 1)
}
const changeOrderFormVisible = ref(false)
const changeOrder = reactive({
  userId,
  orderId: 0,
  username: '',
  phone: ''
})
const updateOrderForm = (index: number) => {
  const {username, phone, orderId} = orders.value[index]
  changeOrder.username = username
  changeOrder.phone = phone
  changeOrder.orderId = orderId
  changeOrderFormVisible.value = true
}
const updateOrder = async () => {
  await updOrder(changeOrder)
  ElMessage.success('修改成功')
  return getAllOrder()
}
</script>

<template>
  <div class="page">
    <h2>我的订单</h2>
    <div class="order-list">
      <div class="order" v-for="(item, index) in orders">
        <div class="img">
          <img :src="item.imgPath" alt="">
        </div>
        <div class="movie-info">
          <span>电影名：{{ item.movieName }}</span>
          <span>导演：{{ item.director }}</span>
          <span>主演：{{ item.actor }}</span>
          <span>时长：{{ item.duration }}分钟</span>
        </div>
        <div class="movie-info">
          <span>用户名：{{ item.username }}</span>
          <span>手机号：{{ item.phone }}</span>
          <span>购票数：{{ item.num }}</span>
          <span>总金额：{{ item.priceSum }}</span>
        </div>
        <div class="handle">
          <el-button @click="updateOrderForm(index)">修改订单</el-button>
          <el-button v-if="item.pay === false" @click="payMovieOrder(index)">支付订单</el-button>
          <el-button v-else>已支付</el-button>
          <el-button @click="delMovieOrder(index)">删除订单</el-button>
        </div>
      </div>
    </div>
  </div>
  <el-dialog v-model="changeOrderFormVisible" title="修改订单信息" width="400px">
    <el-form :model="changeOrder">
      <el-form-item label="用户名：" label-width="100px">
        <el-input v-model="changeOrder.username"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" label-width="100px">
        <el-input v-model="changeOrder.phone"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="changeOrderFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateOrder(); changeOrderFormVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.page {
  width: 800px;
  margin: 0 auto;
}

.order-list {
  .order {
    box-shadow: 0 0 5px rgb(182, 182, 182);
    padding: 10px;
    margin: 30px 0;
    display: flex;

    .img {
      height: 160px;

      img {
        height: 100%;
      }
    }

    .movie-info {
      margin: 0 30px;
      display: flex;
      flex-direction: column;
      text-align: left;
      line-height: 40px;
    }

    .handle {
      display: flex;
      flex-direction: column;

      .el-button+.el-button {
        margin-left: 0;
      }

      .el-button {
        margin: 5px 0;
      }
    }
  }
}
</style>
