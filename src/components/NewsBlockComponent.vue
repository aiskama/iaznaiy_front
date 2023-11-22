<template>
  <div class="news-block">
    <div class="news-block__img">
      <ImgComponent :head_img="data.img || {}" />
    </div>
    <div class="news-block__content">
      <div class="news-block__header">
        <div class="news-block__title">{{ data.title }}</div>
        <div class="news-block__description">{{ data.subtitle }}</div>
      </div>
      <router-link :to="'/news/' + data.id" class="btn btn--blur-o2">
        <span>Подробнее</span>
        <IconComponent name="right-arrow-2" />
      </router-link>
    </div>
  </div>
</template>

<script>
import ImgComponent from "components/ImgComponent.vue";
import IconComponent from "components/IconComponent.vue";
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    IconComponent,
    ImgComponent,
  },
};
</script>

<style lang="stylus">
.news-block {
  position relative
  min-height 398px
  width 100%
  border-radius 10px
  transition var(--transition)

  &:hover {
    transform translateY(-5px)
  }

  +below(760px) {
    height: 370px;
  }

  &__img {
    position absolute
    width 100%
    height 100%
    z-index 0
    border-radius 10px

    img {
      width 100%
      height 100%
      border-radius 10px
    }
  }
  &__content {
    position relative
    z-index 1
    padding 30px
    display flex
    flex-direction column
    justify-content space-between
    height 100%
    background: rgba(0, 0, 0, 0.3);
    border-radius 10px

    .btn {
      max-width 100%
    }
  }

  &__header {
    display flex
    flex-direction column
    gap 10px
  }

  &__title {
    font-weight 700
    font-size 1.250em
    color var(--white)
  }
  &__description {
    font-weight 500
    font-size 1em
    color var(--white)
  }
}
</style>
