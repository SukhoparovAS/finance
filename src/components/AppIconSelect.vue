<template>
  <ul class="category-list">
    <li
      class="category-list__item"
      v-for="item in itemList"
      :key="item.id"
      @click="select(item.id)"
    >
      <div
        class="category-list__img-container"
        :style="item.color ? `background-color: ${item.color}` : ''"
        :class="[{ 'category-list__item--active': item.id == selectedItem }]"
      >
        <img :src="item.image" alt="" class="category-list__item-icon" />
      </div>
      <div class="category-list__item-name" v-if="item.name">
        {{ item.name }}
      </div>
    </li>

    <li class="category-list__item" v-if="addButtonRef">
      <router-link :to="addButtonRef">
        <add-button />
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["itemList", "addButtonRef"],
  data() {
    return {
      selectedItem: -1,
    };
  },
  methods: {
    select(id) {
      this.selectedItem = id;
      this.$emit("select", id);
    },
  },
};
</script>

<style scoped>
</style>
