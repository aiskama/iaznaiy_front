<template>
  <transition-group v-show="$store.state._modals.length" class="modal" name="bounce" tag="div">
    <div v-for="(modal, index) in modals" :key="JSON.stringify(modal) + index" class="modal__content">
      <div ref="background" class="modal__background" @click="close(index, modal.callback)"></div>
      <div
        ref="modal"
        class="modal__body"
        :class="{
          'modal__body--bottom': modal.alignBottom,
          'modal__body--top': modal.alignTop,
          'modal__body--stretch': modal.stretch,
        }"
      >
        <component
          :is="modal.component"
          :key="index"
          v-bind="modal.options"
          @close="close(index, modal.callback)"
        ></component>
      </div>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: "ModalComponent",
  methods: {
    close(i, callback) {
      if (callback) {
        callback();
      }
      return this.$store.state._modals.splice(i, 1);
    },
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.close(this.$store.state._modals.length - 1);
      }
    });
  },
  beforeDestroy() {
    document.removeEventListener("keydown", () => {});
  },
  computed: {
    modals() {
      return this.$store.state._modals;
    },
  },
  updated() {
    if (this.$refs.modal && this.$refs.modal.length) {
      setTimeout(() => {
        this.$refs.modal.forEach((m, i) => {
          const bounds = m.getBoundingClientRect();
          this.$refs.background[i].style = `width:${bounds.width}px`;
        });
      }, 300);
    }
  },
  watch: {
    "$store.state._modals.length"(val) {
      if (val > 0) {
        document.body.classList.add("no-overflow");
      } else {
        document.body.classList.remove("no-overflow");
      }
    },
    "$route.name"() {
      this.$store.state._modals = [];
    },
    "$route.params"() {
      this.$store.state._modals = [];
    },
  },
};
</script>

<style lang="stylus">
@keyframes bounce-in {
  0% {
    transform: scale(0.98);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}

.bounce-enter-active {
  animation: bounce-in var(--transition) cubic-bezier(0.175, 0.885, 0.320, 1.275);
}

.bounce-enter {
  animation: bounce-in var(--transition) reverse cubic-bezier(0.175, 0.885, 0.320, 1.275);
}

.no-overflow {
  overflow hidden
}

.modal {
  fixed left top
  width 100%
  height 100%
  z-index 999
  overflow hidden
  background var(--black-o5)

  &__content {
    width 100%
    height 100%
    position relative
    display none
    align-items flex-start
    justify-content center
    overflow-y auto

    &:last-child {
      display flex
      align-items: center;
    }
  }

  &__background {
    fixed left top
    height 100vh
    width 100vw
    z-index 0
    cursor pointer
  }

  &__body {
    display flex
    justify-content: center;
    width 100%
    margin: 50px 0;
    +below(820px) {
      margin 40px 20px
    }

    &--top {
      margin-top: 0;
      margin-bottom: auto;
    }

    &--bottom {
      margin-top: auto;
      margin-bottom: 0;
    }

    &--stretch {
      margin 50px 0 40px
      width 100%
      height calc(100% - 90px)
      +below(590px) {
        margin 40px 0 0
      }
    }
  }
}
</style>
