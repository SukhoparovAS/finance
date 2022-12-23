<template>
  <AppViewTitle title="КАТЕГОРИИ" />
  <operation-type-select />
  <AppIconSelect
    :itemList="categories"
    :add-button-ref="'/AddCategory'"
    @select="categorySelect"
  />
  <div class="control-buttons" v-if="category">
    <button class="control-buttons__delete btn" @click="removeCategory">
      Удалить
    </button>
    <button class="control-buttons__edit btn">Изменить</button>
  </div>
</template>

<script>
import AppViewTitle from "@/components/AppViewTitle";
import AppIconSelect from "@/components/AppIconSelect.vue";
import operationTypeMixin from "@/mixins/operationTypeMixin";

export default {
  components: {
    AppViewTitle,
    AppIconSelect,
  },
  mixins: [operationTypeMixin],
  data() {
    return {
      category: "",
    };
  },
  computed: {
    categories() {
      const categories = this.$store.getters.getCategories.filter((item) => {
        if (item.type == this.operationType) {
          item.image = this.$store.getters.getIcons.find(
            (icon) => icon.id == item.icon_id
          ).image;
          return true;
        }
      });
      return categories;
    },
  },
  methods: {
    categorySelect(id) {
      this.category = id;
    },
    removeCategory() {
      this.$store.dispatch("deleteCategory", this.category);
      this.category = "";
    },
  },
};
</script>

<style scoped lang="scss">
.control-buttons {
  display: flex;
  padding: 20px;
  justify-content: space-between;
  &__delete {
    &:hover {
      color: red;
    }
  }
  &__edit {
    &:hover {
      color: green;
    }
  }
}
.btn {
  background-color: rgba($color: #000000, $alpha: 0);
  color: white;
  font-size: 20px;
}
</style>
