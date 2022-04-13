
import { defineStore } from 'pinia'

export const useUserStore = defineStore('main', {
  state: () => {
    return {
      user: {
        userId: null
      }
    }
  },
  actions() {
    // const updateUser = (user: any) {
    //   state.user = user
    // }
  }
})
