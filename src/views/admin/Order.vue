
<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { inquireMovieDetail } from '../../api';
import { allOrder } from '../../api/admin';

const orders = ref()
const formatePay = (row: any) => row.pay ? '已支付' : '未支付'
const getAllOrder = async () => {
  orders.value = await allOrder()
  orders.value.forEach(async (e: any, i: number) => {
    const movie = await inquireMovieDetail({ movieId: e.movieId })
    orders.value[i] = { ...e, ...movie }
  })
}
getAllOrder()
const deleteOrder = async (orderId: number) => {}
</script>

<template>
  <div class="page">
    <h2>所有订单</h2>
    <el-table :data="orders">
      <el-table-column fixed prop="username" label="用户名" width="100"></el-table-column>
      <el-table-column prop="movieName" label="电影" width="200"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="200"></el-table-column>
      <el-table-column prop="num" label="购票数" width="100"></el-table-column>
      <el-table-column prop="priceSum" label="总金额" width="100"></el-table-column>
      <el-table-column prop="pay" label="支付状态" :formatter="formatePay" width="100"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button text size="small" @click.prevent="deleteOrder(scope.row.orderId)">删除订单</el-button>
        </template>
      </el-table-column>
    </el-table>
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
