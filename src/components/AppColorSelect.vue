<template>
  <div class="colorPicker">
    <div
      class="colorPicker__item"
      v-for="colorItem in colorsList"
      :key="colorItem"
      :style="`background-color: ${colorItem}`"
      @click="changeColor(colorItem)"
      :class="[{ active: color == colorItem }]"
    ></div>
    <button class="colorPicker__add-btn" @click.prevent="isOpenPicker = true">
      +
    </button>
  </div>
  <AppColorPicker
    v-if="isOpenPicker"
    @cancel="isOpenPicker = false"
    @select="addColor"
  />
</template>

<script>
import AppColorPicker from "@/components/AppColorPicker.vue";

export default {
  components: {
    AppColorPicker,
  },
  emits: ["changeColor"],
  props: ["colorsList"],
  data() {
    return {
      color: "",
      isOpenPicker: false,
    };
  },
  methods: {
    changeColor(color) {
      this.color = color;
      this.$emit("changeColor", color);
    },
    async addColor(color) {
      if (!this.colorsList.includes(color)) {
        const formData = new FormData();
        formData.append("color", color);
        this.$store.dispatch("POST_Color", formData);
      }
      this.isOpenPicker = false;
    },
  },
};
</script>

<style scoped lang="scss">
.colorPicker {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 50px;
}
.colorPicker__item {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 5px;
  cursor: pointer;
}
.active {
  border: 3px solid white;
}
.colorPicker__add-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 26px;
  margin: 5px;
  &:hover {
    background-color: gold;
  }
}
</style>
