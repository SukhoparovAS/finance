<template>
  <div class="alert">
    <transition-group name="alert">
      <div
        v-for="message in messages"
        :key="message.id"
        class="alert__message"
        :class="[
          { 'alert__message--error': message.type == 'error' },
          { 'alert__message--message': message.type == 'message' },
        ]"
        @click="remove(message.id)"
      >
        {{ message.text }}
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: ["messages"],

  methods: {
    remove(id) {
      this.$store.commit("removeMessage", id);
    },
  },
};
</script>

<style lang="scss">
.alert {
  position: absolute;
  top: 0;
  left: 50%;
  width: 80%;
  transform: translate(-50%, 0);
  text-align: center;
  &__message {
    padding: 20px;
    border-radius: 30px;
    margin-bottom: 10px;
    &--error {
      background-color: rgba($color: #d11b1b74, $alpha: 0.9);
    }
    &--message {
      background-color: rgba($color: #a7c54474, $alpha: 0.9);
    }
    &:first-child {
      margin-top: 20px;
    }
  }
}
.alert-enter-active {
  transition: all 0.6s ease;
  opacity: 0;
}
.alert-leave-active {
  transition: all 0.8s ease;
}
.alert-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(100px);
  opacity: 0;
}
.alert-enter-to {
  opacity: 1;
}
</style>
