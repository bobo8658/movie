
<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { reactive, ref } from 'vue';
import { inquireMovie, inquireMovieDetail, allMovieType } from '../../api';
import { addMovie, updateMovie, deleteMovie, deleteEvaluate, deleteMovieType, addMovieType } from '../../api/admin';

// 电影类别
const types = ref()
const viewMovieTypeFormVisible = ref(false)
const getAllMovieType = async () => {
  types.value = await allMovieType()
}
getAllMovieType()
const delMovieType = async (typeId: number, index: number) => {
  await deleteMovieType({ typeId })
  types.value.splice(index, 1)
}
const addTypeInp = ref()
const addType = async () => {
  await addMovieType({ typeName: addTypeInp.value })
  ElMessage.success('添加成功')
  return getAllMovieType()
}

// 全部电影
const movies = ref()
const formateRecommend = (row: any) => row.recommend ? '是' : '否'
const getAllMovie = async () => {
  const search = reactive({
    key: '',
    movieType: '',
    recommend: ''
  })
  movies.value = await inquireMovie(search)
}
getAllMovie()

// 添加电影
const movieInfo = reactive({
  movieName: '',
  director: '',
  actor: '',
  movieType: '',
  intro: '',
  grade: '',
  duration: '',
  startTime: '',
  endTime: '',
  price: '',
  recommend: '',
  imgPath: ''
})
const addMovieFormVisible = ref(false)
const addMovieInfo = async () => {
  await addMovie(movieInfo)
  ElMessage.success('添加成功')
  return getAllMovie()
}

// 修改电影信息
const updMovieInfo = ref()
const updMovieFormVisible = ref(false)
const changeUpdMovieForm = (index: number) => {
  updMovieInfo.value = movies.value[index]
  updMovieFormVisible.value = true
}
const updateMovieInfo = async () => {
  await updateMovie(updMovieInfo.value)
  ElMessage.success('修改成功')
  return getAllMovie()
}

// 删除电影
const delMovieInfo = (movie: any) => {
  ElMessageBox.confirm(
    `确认要删除《${movie.movieName}》吗？`, '删除',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    await deleteMovie({ movieId: movie.movieId })
    ElMessage.success('删除成功')
    return getAllMovie()
  })

}

// 电影评论
const evaluate = ref()
const evaluateMovie = ref('')
const viewMovieEvaluateFormVisible = ref(false)
const viewMovieEvaluateForm = async (movieId: number) => {
  const { allEvaluate }: any = await inquireMovieDetail({ movieId })
  if (allEvaluate.length === 0) {
    ElMessage('暂无评论')
  } else {
    evaluate.value = allEvaluate
    evaluateMovie.value = allEvaluate[0].movieName
    viewMovieEvaluateFormVisible.value = true
  }
}
const delMovieEvaluate = async (evaluateId: number, index: number) => {
  await deleteEvaluate({ evaluateId })
  evaluate.value.splice(index, 1)
}


</script>

<template>
  <div class="page">
    <div class="categray">
      <span class="title">电影分类</span>
      <el-button @click="viewMovieTypeFormVisible = true">查看分类</el-button>
      <el-input v-model="addTypeInp" class="add-type"></el-input>
      <el-button @click="addType()">添加分类</el-button>
    </div>
    <span class="title">电影信息</span>
    <el-button @click="addMovieFormVisible = true">添加电影</el-button>
    <el-table :data="movies">
      <el-table-column fixed prop="movieName" label="电影名" width="150"></el-table-column>
      <el-table-column prop="director" label="导演" width="100"></el-table-column>
      <el-table-column prop="actor" label="演员" width="150"></el-table-column>
      <el-table-column prop="movieType" label="类型" width="100"></el-table-column>
      <el-table-column prop="imgPath" label="图片地址" width="200"></el-table-column>
      <el-table-column prop="startTime" label="上映时间" width="100"></el-table-column>
      <el-table-column prop="endTime" label="结束时间" width="100"></el-table-column>
      <el-table-column prop="duration" label="时长" width="100"></el-table-column>
      <el-table-column prop="grade" label="评分" width="100"></el-table-column>
      <el-table-column prop="price" label="价格" width="100"></el-table-column>
      <el-table-column prop="recommend" label="推荐" :formatter="formateRecommend" width="100"></el-table-column>
      <el-table-column prop="intro" label="简介" width="400"></el-table-column>
      <el-table-column fixed="right" prop="username" label="操作" width="100">
        <template #default="scope">
          <el-button text size="small" @click.prevent="viewMovieEvaluateForm(scope.row.movieId)">查看评论</el-button>
          <el-button text size="small" @click.prevent="changeUpdMovieForm(scope.$index)">修改信息</el-button>
          <el-button text size="small" @click.prevent="delMovieInfo(scope.row)">删除电影</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 添加电影 -->
  <el-dialog v-model="addMovieFormVisible" title="添加电影" width="50vw">
    <el-form :model="movieInfo">
      <el-form-item label="电影名" label-width="100px">
        <el-input v-model="movieInfo.movieName"></el-input>
      </el-form-item>
      <el-form-item label="导演" label-width="100px">
        <el-input v-model="movieInfo.director"></el-input>
      </el-form-item>
      <el-form-item label="演员" label-width="100px">
        <el-input v-model="movieInfo.actor"></el-input>
      </el-form-item>
      <el-form-item label="类型" label-width="100px">
        <el-select v-model="movieInfo.movieType" clearable placeholder="Select">
          <el-option v-for="item in types" :key="item.typeName" :label="item.typeName" :value="item.typeName" />
        </el-select>
      </el-form-item>
      <el-form-item label="图片地址" label-width="100px">
        <el-input v-model="movieInfo.imgPath"></el-input>
      </el-form-item>
      <el-form-item label="上映时间" label-width="100px">
        <el-input v-model="movieInfo.startTime" placeholder="2022-01-01"></el-input>
      </el-form-item>
      <el-form-item label="结束时间" label-width="100px">
        <el-input v-model="movieInfo.endTime" placeholder="2022-01-01"></el-input>
      </el-form-item>
      <el-form-item label="电影时长" label-width="100px">
        <el-input v-model="movieInfo.duration"></el-input>
      </el-form-item>
      <el-form-item label="电影评分" label-width="100px">
        <el-input v-model="movieInfo.grade"></el-input>
      </el-form-item>
      <el-form-item label="价格" label-width="100px">
        <el-input v-model="movieInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="推荐" label-width="100px">
        <el-radio-group v-model="movieInfo.recommend">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="简介" label-width="100px">
        <el-input v-model="movieInfo.intro" :autosize="{ minRows: 2, maxRows: 6 }" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addMovieFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addMovieInfo(); addMovieFormVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 修改电影信息 -->
  <el-dialog v-model="updMovieFormVisible" title="修改电影信息" width="50vw">
    <el-form :model="updMovieInfo">
      <el-form-item label="电影名" label-width="100px">
        <el-input v-model="updMovieInfo.movieName"></el-input>
      </el-form-item>
      <el-form-item label="导演" label-width="100px">
        <el-input v-model="updMovieInfo.director"></el-input>
      </el-form-item>
      <el-form-item label="演员" label-width="100px">
        <el-input v-model="updMovieInfo.actor"></el-input>
      </el-form-item>
      <el-form-item label="类型" label-width="100px">
        <el-select v-model="updMovieInfo.movieType" clearable placeholder="Select">
          <el-option v-for="item in types" :key="item.typeName" :label="item.typeName" :value="item.typeName" />
        </el-select>
      </el-form-item>
      <el-form-item label="图片地址" label-width="100px">
        <el-input v-model="updMovieInfo.imgPath"></el-input>
      </el-form-item>
      <el-form-item label="上映时间" label-width="100px">
        <el-input v-model="updMovieInfo.startTime" placeholder="2022-01-01"></el-input>
      </el-form-item>
      <el-form-item label="结束时间" label-width="100px">
        <el-input v-model="updMovieInfo.endTime" placeholder="2022-01-01"></el-input>
      </el-form-item>
      <el-form-item label="电影时长" label-width="100px">
        <el-input v-model="updMovieInfo.duration"></el-input>
      </el-form-item>
      <el-form-item label="电影评分" label-width="100px">
        <el-input v-model="updMovieInfo.grade"></el-input>
      </el-form-item>
      <el-form-item label="价格" label-width="100px">
        <el-input v-model="updMovieInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="推荐" label-width="100px">
        <el-radio-group v-model="updMovieInfo.recommend">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="简介" label-width="100px">
        <el-input v-model="updMovieInfo.intro" :autosize="{ minRows: 2, maxRows: 6 }" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="updMovieFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateMovieInfo(); updMovieFormVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 全部类别 -->
  <el-dialog v-model="viewMovieTypeFormVisible" title="类别管理" width="30vw">
    <el-table :data="types">
      <el-table-column prop="typeName" label="类别"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope">
          <el-button text size="small" @click.prevent="delMovieType(scope.row.typeId, scope.$index)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
  <!-- 评论 -->
  <el-dialog v-model="viewMovieEvaluateFormVisible" :title="evaluateMovie" width="50vw">
    <el-table :data="evaluate">
      <el-table-column prop="username" label="用户名" width="100"></el-table-column>
      <el-table-column prop="content" label="评价"></el-table-column>
      <el-table-column prop="star" label="评分" width="100"></el-table-column>
      <el-table-column fixed="right" prop="username" label="操作" width="100">
        <template #default="scope">
          <el-button text size="small" @click.prevent="delMovieEvaluate(scope.row.evaluate, scope.$index)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<style lang="scss" scoped>
.page {
  text-align: left;
}

.title {
  font-weight: 700;
  font-size: 22px;
  padding: 0 40px 0 10px;
}

.el-button {
  margin: 2px 0;
}

.categray {
  margin-bottom: 10px;
}

.add-type {
  margin-left: 2vw;
  width: 10vw;
}
</style>
