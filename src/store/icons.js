import myFetch from '@/store/myFetch'

export default {
    state: {
        icons:[]
    },
    getters: {
        getIcons(state){
            return state.icons
          },
    },
    mutations: {
        updateIcons(state, icons){
            state.icons = icons
          },
    },
    actions: {
        async fetchIcons(ctx){
          const WALLETS_URL = ctx.rootState.API_URL+'icons'
            const response = await myFetch(WALLETS_URL)
            const data = await response.json()
            ctx.commit('updateIcons', data.map(item =>{
                return {
                    id:item.id,
                    image: ctx.rootState.SERVER_URL+item.image 
                }
            }))
          },
    }
}