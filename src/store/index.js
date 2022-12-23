import { createStore } from 'vuex'
import wallets from '@/store/wallets'
import icons from '@/store/icons'
import categories from '@/store/categories'
import transactions from '@/store/transactions'
import currencies from '@/store/currencies'
import colors from '@/store/colors'
import auth from '@/store/auth'


const SERVER_URL = 'http://192.168.0.11:8000'

export default createStore({
    state: {
        operationType: 'expenses',
        isOpenChoiceWallet: false, //Перенести в компонент
        SERVER_URL: SERVER_URL,
        API_URL: SERVER_URL + '/api/v1/',
        messages: [],
        period: {selectedPeriod:'day', selectedDates:[new Date(), new Date()]},
    },
    getters: {
        getPeriod(state) {
            return state.period
        },
        getOperationType(state) {
            return state.operationType
        },
        getAPI_URL(state) {
            return state.API_URL
        },
        getIsOpenChoiceWallet(state) {
            return state.isOpenChoiceWallet
        },
        getMessages(state) {
            return state.messages
        }
    },
    mutations: {
        setPeriod(state, value){
           state.period = value
        },
        setOperationType(state, value) {
            if (value == 'expenses' || value == 'income') {
                state.operationType = value
            }
        },
        setIsOpenChoiceWallet(state, value) {
            state.isOpenChoiceWallet = value
        },
        addMessage(state, msg) {
            if (state.messages.length) {
                msg.id = state.messages.slice(-1)[0].id + 1
            } else {
                msg.id = 0
            }
            msg.timeout = setTimeout(() => {
                this.commit('removeMessage', msg.id)
            }, 2000)
            state.messages.push(msg)
        },
        removeMessage(state, id) {
            const index = state.messages.findIndex(msg => msg.id == id)
            clearTimeout(state.messages[index].timeout)
            state.messages.splice(index, 1);
        }
    },
    actions: {
        async loadData(ctx) {
            await ctx.dispatch('fetchIcons')
            await ctx.dispatch('fetchCurrencies')
            await ctx.dispatch('fetchWallets')
            ctx.commit('setSelectedWallet', ctx.state.wallets.wallets[0].id)
            await ctx.dispatch('fetchCategories')
            await ctx.dispatch('fetchTransactions')
            await ctx.dispatch('fetchColors')
        }
    },
    modules: {
        wallets,
        icons,
        categories,
        transactions,
        currencies,
        colors,
        auth
    }
})
