<template>
  <router-link :to="{ name: 'catalog', query: { subject: data.id } }" class="home-catalog-card">
    <div class="home-catalog-card__header">
      <span>ЯЗНАЮ©</span>
      <div class="home-catalog-card__title">
        {{ data.title }}
      </div>
    </div>
    <div class="home-catalog-card__content">
      <div class="home-catalog-card__img">
        <ImgComponent :head_img="data.img" />
      </div>
      <button class="btn btn--blur-o7 home-catalog-card__btn">
        <span v-if="data.id === 1">открыть</span>
        <span v-else>скоро</span>
      </button>
    </div>
  </router-link>
</template>

<script>
import ImgComponent from "components/ImgComponent.vue";

export default {
  name: "HomeCatalogCard",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    ImgComponent,
  },
};
</script>

<style lang="stylus">
.home-catalog-card {
  color var(--black)
  display flex
  flex-direction column
  justify-content space-between
  width 100%
  height 557px
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition var(--transition)

  &:hover {
    transform translateY(-5px)
  }

  +below(760px) {
    box-shadow: 0 0 0 rgb(0 0 0 / 30%);
    border 1px solid var(--gray)
    height 386px
  }

  &__header {
    padding 30px

    span {
      font-weight 500
      font-size 1.5em
      text-transform uppercase

      color: #050A25
    }
    +below(760px) {
      padding 20px
    }
  }

  &__title {
    margin-top 10px
    font-weight 500
    font-size 2.5em
    text-transform uppercase
    word-break: break-word;

    +below(760px) {
      font-size 2em
    }
  }

  &__content {
    position relative
    display flex
    justify-content center
    align-items flex-end
    height 367px
    width 100%

    +below(760px) {
      height 255px
      .btn--blur-o7 {
        max-width 218px
      }
    }
  }

  &__img {
    position absolute
    width 100%
    height 100%

    img {
      width 100%
      height 100%
      object-fit cover
    }
  }

  &__btn {
    position absolute
    bottom 30px
  }
}
</style>
