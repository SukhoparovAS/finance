<template>
  <div class="custom-input">
    <div class="custom-input__input-wrapper">
      <input
        :name="name"
        :type="type"
        class="custom-input__input"
        :class="{
          'custom-input__input--danger': errorMessages.length,
        }"
        :value="modelValue"
        @:input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
      />
      <slot></slot>
    </div>
    <div v-for="message in errorMessages" :key="message" class="error-message">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  emits: ["update:modelValue"],
  props: ["name", "type", "placeholder", "modelValue", "errorMessages"],
};
</script>

<style>
</style>
