<template>
  <header class="header">
    <HeaderBurger />
    <h1 class="header__title">{{ title }}</h1>
    <back-button />
  </header>
</template>

<script>
import BackButton from "@/components/header/AppBackButton.vue";
import HeaderBurger from "@/components/header/AppBurger.vue";

export default {
  props: ["title"],
  components: {
    BackButton,
    HeaderBurger,
  },
};
</script>

<style>
</style>
