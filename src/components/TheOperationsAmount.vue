<template>
  <section class="transaction-amount">
    <div class="transaction-amount__container">
      <slot name="periodSelection" />

      <slot></slot>
      <router-link to="/AddOperation">
        <add-button class="transaction-amount__add-button" />
      </router-link>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style>
</style>
