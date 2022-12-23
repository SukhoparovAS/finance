<template>
  <div class="popup background">
    
  </div>
  <div class="menu">
      <ul class="menu-list">
        <li class="menu-list__item">
          <router-link to="/" class="menu__link">Главная</router-link>
        </li>
        <li class="menu-list__item">
          <router-link to="/EditCategories" class="menu__link"
            >Категории</router-link
          >
        </li>
        <li class="menu-list__item">
          <a href="#" class="menu__link" @click.prevent="close"> Закрыть </a>
        </li>
        <li class="menu-list__item">
          <a href="#" class="menu__link" @click.prevent="logout"> Выход </a>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit("closeMenu");
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script >

<style scoped >
.background {
    width: 100%;
    filter: blur(8px);
}
.menu {
    background-color: rgb(75, 73, 76);
    padding: 50px;
    width: 65%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99;
}
.menu-list__item {
  margin-bottom: 10px;
}
.menu__link {
  color: white;
}
</style>
