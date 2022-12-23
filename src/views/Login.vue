<template>
  <form action="" class="form auth">
    <h1 class="title auth__title">Вход</h1>
    <AppInput
      name="name"
      type="text"
      placeholder="имя пользователя"
      v-model.trim="v$.username.$model"
      :errorMessages="errorsBy('username')"
      class="auth__input"
    />

    <AppInput
      name="password"
      type="password"
      placeholder="пароль"
      v-model.trim="v$.password.$model"
      :errorMessages="errorsBy('password')"
      class="auth__input"
    />

    <div class="error-message" v-if="errorMessage">
      {{ errorMessage }}
    </div>

    <button class="submit-btn auth__submit-btn" @click.prevent="authentication">
      Войти
    </button>
    <router-link to="/Registration" tag="a" class="auth__link"
      >Регистрация</router-link
    >
  </form>
</template>

<script>
import AppInput from "@/components/AppInput.vue";
import inputValidationMixin from "@/mixins/inputValidationMixin";

export default {
  mixins: [inputValidationMixin],
  components: {
    AppInput,
  },

  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  validations() {
    return {
      username: { required: this.defaultReqired },
      password: {
        required: this.defaultReqired,
        minLength: this.defaultMinLength,
      },
    };
  },

  methods: {
    async authentication() {
      if (!(await this.v$.$validate())) return;

      let params = new FormData();
      params.set("username", this.username);
      params.set("password", this.password);

      if (await this.$store.dispatch("login", params))
        this.$router.replace("/");
    },
  },
};
</script>

<style>
</style>
