<template>
  <form action="" class="form auth">
    <h1 class="title auth__title">Регистрация</h1>
    <AppInput
      name="name"
      type="text"
      placeholder="имя пользователя"
      v-model.trim="v$.username.$model"
      :errorMessages="errorsBy('username')"
      class="auth__input"
    />

    <AppInput
      name="email"
      type="email"
      placeholder="email"
      v-model.trim="v$.email.$model"
      :errorMessages="errorsBy('email')"
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

    <AppInput
      name="passwordConfirm"
      type="password"
      placeholder="повторите пароль"
      v-model.trim="v$.passwordConfirm.$model"
      :errorMessages="errorsBy('passwordConfirm')"
      class="auth__input"
    />

    <div class="error-message" v-if="errorMessage">
      {{ errorMessage }}
    </div>

    <button class="submit-btn auth__submit-btn" @click.prevent="registration">
      Отправить
    </button>
    <router-link to="/Login" tag="a" class="auth__link">Войти</router-link>
  </form>
</template>

<script>
import { helpers, sameAs, email } from "@vuelidate/validators";
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
      passwordConfirm: "",
      email: "",
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
      passwordConfirm: {
        required: this.defaultReqired,
        sameAsPassword: helpers.withMessage(
          "Пароли не совподают.",
          sameAs(this.password)
        ),
      },
      email: {
        required: this.defaultReqired,
        email: helpers.withMessage("Некорректный email.", email),
      },
    };
  },
  methods: {
    async registration() {
      if (!(await this.v$.$validate())) return;
      let formData = new FormData();
      formData.set("username", this.username);
      formData.set("password", this.password);
      formData.set("email", this.email);
      await this.$store.dispatch("registration", formData);
      this.$router.replace("/");
    },
  },
};
</script>

<style>
</style>
