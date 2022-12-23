import myFetch from '@/store/myFetch'

export default {
    state: {
      currencies:[]
    },
    getters: {
        getCurrencies(state){
            return state.currencies
          },
    },
    mutations: {
        updateCurrencies(state, currencies){
            state.currencies = currencies
          },
    },
    actions: {
        async fetchCurrencies(ctx){
          const WALLETS_URL = ctx.rootState.API_URL+'currencies'
            const response = await myFetch(WALLETS_URL)
            const data = await response.json()

            ctx.commit('updateCurrencies', data.map(item =>{
              item.image = ctx.rootState.SERVER_URL+item.image
              return item
          }))
              
           
          },
    }
}