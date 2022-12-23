<template>
  <teleport to=".wrapper">
    <div class="popup color-picker">
      <div id="picker"></div>
      <AppSelectBtns @cancel="$emit('cancel')" @select="addColor" />
    </div>
  </teleport>
</template>

<script>
import iro from "@jaames/iro";
import AppSelectBtns from "@/components/AppSelectBtns.vue";

export default {
  components: {
    AppSelectBtns,
  },
  emits: ["cancel", "select"],
  data() {
    return {
      color: "",
      picker: null,
    };
  },
  mounted() {
    this.picker = new iro.ColorPicker("#picker");
  },
  methods: {
    addColor() {
      this.$emit("select", this.picker.color.hexString);
    },
  },
};
</script>

<style>
.color-picker {
  padding: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#picker {
  margin-bottom: 40px;
}
</style>
