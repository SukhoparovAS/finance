<template>
  <div class="select-btns">
    <button class="select-btns__btn" @click.prevent="$emit('cancel')">
      Отмена
    </button>
    <button
      class="select-btns__btn"
      @click.prevent="$emit('select')"
      type="submit"
    >
      Выбрать
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
