import myFetch from "./myFetch"


export default {
    state: {
        wallets: [],
        selectedWallet: null,
    },
    getters: {
        getSelectedWallet(state){
            return state.wallets.find( wallet => wallet.id == state.selectedWallet) 
            
          },
        getWallets(state){
            return state.wallets
          },
    },
    mutations: {
        updateWallets(state, wallets){
            state.wallets = wallets
          },
        setSelectedWallet(state, id){
            state.selectedWallet = id
          }
    },
    actions: {
        async fetchWallets(ctx){
          const WALLETS_URL = ctx.rootState.API_URL+'wallets'
            const response = await myFetch(WALLETS_URL)
            const data = await response.json()
            const wallets = data.map(item =>{
              if (ctx.rootState.icons.icons.find(icon => icon.id == item.image_id)){
                item.image = ctx.rootState.icons.icons.find(icon => icon.id == item.image_id).image
              } else {
                item.image = 'dsads'
              }
              
              item.currency = ctx.rootState.currencies.currencies.find(cur => cur.id == item.currency_id).name
              return item
          })
            ctx.commit('updateWallets', wallets)
          },

        async POST_Wallet(ctx, formData){
          const response = await myFetch(ctx.rootState.API_URL+'wallets','POST',formData)
            const newWallet = await response.json()
            await ctx.dispatch('fetchWallets')
            }
    }
}