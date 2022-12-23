<template>
  <ul class="operation-types-list">
    <li class="operation-types-list__item"
     :class="[{'operation-types-list__item--active':operationType == 'expenses'}]"
     @click="$store.commit('setOperationType', 'expenses')">
     Расходы
    </li>
    <!-- <li class="operation-types-list__item">Прибыль</li> -->
    <li class="operation-types-list__item"
    :class="[{'operation-types-list__item--active':operationType == 'income'}]"
    @click="$store.commit('setOperationType', 'income')">
    Доходы
    </li>
  </ul>
</template>

<script>
export default {
  computed:{
    operationType(){
      return this.$store.getters.getOperationType
    }
  }
};
</script>

<style>
</style>
