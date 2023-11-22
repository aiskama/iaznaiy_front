<template>
  <a href="https://comrades.dev" target="_blank" class="comrades">
    <IconComponent name="comrades" class="comrades-logo-icon" />
    <div class="comrades-text">
      <span class="comrades-text__title">{{ title }}</span>
      <span class="comrades-text__subtitle">COMRADES DEVS</span>
    </div>
  </a>
</template>

<script>
import IconComponent from "components/IconComponent.vue";
export default {
  name: "ComradesLogo",
  components: { IconComponent },
  data() {
    return {
      title: "Разработано",
    };
  },
};
</script>

<style lang="stylus">
.comrades {
  display flex
  gap 15px
  align-items center

  .comrades-logo-icon {
    width 100%
    max-width 60px
    height 100%
    max-height 60px
  }

  &-text {
    display flex
    flex-direction column
    color var(--white)
    gap 5px

    &__title {
      font-size 1em
      line-height 17px
    }

    &__subtitle {
      font-weight 500
      line-height 20px
      font-size 1.125em
    }
  }
}
</style>
