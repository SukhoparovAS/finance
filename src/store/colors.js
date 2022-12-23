import myFetch from '@/store/myFetch'

export default {
    state: {
        colors:[]
    },
    getters: {
        getColors(state){
            return state.colors
          },
    },
    mutations: {
        updateColors(state, colors){
            state.colors = colors
          },
        addColor(state, color){
            state.colors.push(color)
        }
    },
    actions: {
        async fetchColors(ctx){
          const WALLETS_URL = ctx.rootState.API_URL+'colors'
            const response = await myFetch(WALLETS_URL)
            const data = await response.json()
            ctx.commit('updateColors', data)
          },

          async POST_Color(ctx, formData){
            const response = await myFetch(ctx.rootState.API_URL+'colors','POST', formData)
            const newColor  = await response.json()
            ctx.commit('addColor', newColor)
          },
    }
}