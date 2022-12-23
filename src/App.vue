<template>
  <div class="wrapper">
    <router-view/> 
    <TheAlert 
      :messages = "messages"/>
  </div>
</template>

<script>
  import TheAlert from '@/components/TheAlert.vue'


export default {
  components:{
    TheAlert,
  },
  computed:{
    isAuth(){
      return this.$store.getters.getIsAuth
    },
    messages(){
      return this.$store.getters.getMessages
    }
  },
  watch:{
    isAuth(){
      this.checkAuth()
    },
  },
  methods:{
    async checkAuth(){
      if (await this.$store.dispatch('chekAuth')){
          await this.$store.dispatch('loadData')
          } else {
            this.$router.push('/login')
          }
    }
  },
  beforeMount(){
    this.checkAuth()
  },
};
</script>

<style lang="scss">
</style>
