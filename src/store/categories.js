import myFetch from '@/store/myFetch'

export default {
    state: {
        categories: [],
    },
    getters: {
        getCategories(state){
            return state.categories
          },
          URL(state, getters, rootState){
            return rootState.API_URL+'categories'
          }
    },
    mutations: {
        updateCategories(state, categories){
            state.categories = categories
          },
          addCategory(state, category){
            state.categories.push(category)
          },
          removeCategory(state, categoryID){
            try{
              const index = state.categories.findIndex(cat => cat.id == categoryID)
              state.categories.splice(index, 1);
              this.commit('addMessage', {type:'message', text: 'Категория удалена'})
            }catch(e){
              this.commit('addMessage', {type:'error', text: e})
            }
            
          }
    },
    actions: {
        async fetchCategories(ctx){
          try{
            const response = await myFetch(ctx.getters.URL)
            const data = await response.json()
            ctx.commit('updateCategories', data)
          }catch(e){
            ctx.commit('addMessage', {type:'error', text: e})
          }      
        },

          async POST_Categories(ctx, formData){
            const response = await myFetch(ctx.getters.URL,'POST',formData)
             const newCategory = await response.json()
             ctx.commit('addCategory', newCategory) 
             },

          async deleteCategory(ctx, id){
            const formData = new FormData()
            formData.append('id', id)
            try{
              const response = await myFetch(ctx.getters.URL,'DELETE',formData)
              if(!response.ok) throw new Error('Ошибка при удалении')
              ctx.commit('removeCategory', id)
              await ctx.dispatch('fetchTransactions')    
            } catch(e){
              ctx.commit('addMessage', {type:'error', text: "Ошибка при удалении"})
            }

          }
    }
}