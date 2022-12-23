import myFetch from '@/store/myFetch'

export default {
    state: {
        transactions: [],
    },
    getters: {
        getTransactions(state){
            return state.transactions
          },
        getTransactionsExpenses(state){
          return state.transactions.filter(item => item.type == 'expenses')
        },
        getTransactionsIncomes(state){
          return state.transactions.filter(item => item.type == 'income')
        },
        transactions_URL(state, commit, rootState){
          return rootState.API_URL+'transactions'
        }
          
    },
    mutations: {
        updateTransactions(state, transactions){
            state.transactions = transactions
          },
        addTransaction(state, transaction){
          state.transactions.push(transaction)
        }
    },
    
    actions: {
        async fetchTransactions(ctx){
          try{
            const response = await myFetch(ctx.getters.transactions_URL)
            if (!response.ok){
              throw new Error('Ошибка загрузки списка операций')
            }
            const data = await response.json()
            ctx.commit('updateTransactions', data)
          }catch(e){
            ctx.commit('addMessage', {type:'error', text: 'Ошибка загрузки списка операций'})
          }
            
          },

         async POST_Transaction(ctx, formData){
          try{
            const response = await myFetch(ctx.getters.transactions_URL, 'POST', formData) 
            if (!response.ok){
              throw new Error('Ошибка при добавлении операции')
            }
            const newTransaction = await response.json()
            ctx.commit('addTransaction', newTransaction)
            await ctx.dispatch('fetchWallets')
            ctx.commit('addMessage', {type:'message', text: 'Добавлена новая операция'})
          } catch(e){
            ctx.commit('addMessage', {type:'error', text: 'Ошибка при добавлении операции'})
          }
        }  
    }
}