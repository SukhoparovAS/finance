export default {
    state:{
        isAuth: true,
        authToken: '',
    },

    getters:{
        getAuthToken(state){
            return state.authToken
        },
        getIsAuth(state){
            return state.isAuth
        }
    },

    mutations:{
        setIsAuth(state, value){
            state.isAuth = value
        },
        setAuthToken(state, value){
            if (value){
              state.authToken = `Token ${value}`
            } else {
              state.authToken = value
            }
            localStorage.setItem('authToken', state.authToken)
        },
    },

    actions:{
        async chekAuth(ctx){
            const authToken = localStorage.getItem('authToken')
            ctx.state.authToken = authToken
            if (!authToken){
              ctx.commit('setIsAuth', false)
              return false
            } else {
              const LOGIN_URL = ctx.rootState.API_URL+'login'
              let response = await fetch(LOGIN_URL,{
                method: 'GET',
                    headers: {
                      'Authorization': authToken
                    },
              })
              const data = await response.json()
      
              if ( !data.is_authenticated ){
                ctx.commit('setAuthToken', null)
                ctx.commit('setIsAuth', false)
                return data.is_authenticated
              }
              ctx.commit('setIsAuth', true)
              return data.is_authenticated
            }
        },

        async logout(ctx){
            const response = await fetch(ctx.rootState.API_URL+'logout',{
              method: 'GET',
                  headers: {
                    'Authorization': ctx.state.authToken
                  },
            })
            ctx.commit('setIsAuth', false)
            ctx.commit('setAuthToken', null)
            const data = await response.json()

            if (data.message){
              ctx.commit('addMessage', data.message)
            }
        },

        async login(ctx, formdata){
          let response
          let data
          const LOGIN_URL = ctx.rootState.API_URL + "login";

          try{
            response = await fetch(LOGIN_URL);
            data = await response.json();
            if (!response.ok) throw new Error('response')

            const csrf = data.csrftoken;
            formdata.set("csrfmiddlewaretoken", csrf);
            response = await fetch(LOGIN_URL, {
              method: "POST",
              body: formdata,
            });
            if (!response.ok) throw new Error('response')

            data = await response.json();
            if (data.message){
              ctx.commit('addMessage', data.message)
            }
            if (data.authToken){
              const authToken = data.authToken;
              await ctx.commit("setAuthToken", authToken);
              ctx.commit("setIsAuth", true);
              await ctx.dispatch("loadData");
              return true
          }
          } catch (e){
            console.log(e);
            const message = {
              type: 'error',
              text: "Ошибка при запросе на сервер.",
            }
            ctx.commit('addMessage', message)
            return false
          }
        },

        async registration(ctx, formdata) {
            const URL = ctx.rootState.API_URL + "registration";
    
            const response = await fetch(URL, {
                method: "POST",
                body: formdata,
              });
    
            const data = await response.json();
            if (data.message){
              ctx.commit('addMessage', data.message)
            }
            if (data.authToken) {
                const authToken = data.authToken;
                ctx.commit("setAuthToken", authToken);
                ctx.commit("setIsAuth", true);
                ctx.dispatch("loadData");
              }
        },
    },

    
}