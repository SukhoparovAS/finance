<template>
  <button class="header__burger burger" @click="openMenu = !openMenu">
    <span></span>
  </button>
  <Teleport to=".wrapper" v-if="openMenu">
    <TheMenu @closeMenu="close" />
  </Teleport>
</template>

<script>
import TheMenu from "@/components/TheMenu.vue";

export default {
  components: {
    TheMenu,
  },
  data() {
    return {
      openMenu: false,
    };
  },
  methods: {
    close() {
      this.openMenu = false;
    },
  },
};
</script>

<style>
</style>
