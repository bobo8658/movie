
<script lang="ts" setup>
import { useUserStore } from '../store'
import { getVip } from '../api'
const state = useUserStore()
const GetVip = async () => {
  const data: any = await getVip(state.user.userId)
  state.user = data
}
GetVip()
</script>

<template>
  home页 {{state.user.userId}}
</template>

<style lang="scss" scoped>

</style>
