<template>
  <section class="catalog-news-list">
    <div class="catalog-news-list__header">
      <div class="catalog-news-list__title">Наше СМИ</div>
      <div class="catalog-news-list__link">
        <router-link to="/news" class="btn btn--link">
          <span>Все новости</span>
          <IconComponent name="CaretRight" />
        </router-link>
      </div>
    </div>
    <div class="catalog-news-list__body">
      <NewsBlockComponent v-for="item in items" :key="item.id" :data="item" />
    </div>
    <SliderComponent
      class="catalog-news-list__slider"
      :items="items"
      v-slot="{ item }"
      :slider-options="newsSliderOptions"
    >
      <NewsBlockComponent :data="item" />
    </SliderComponent>
  </section>
</template>

<script>
import IconComponent from "components/IconComponent.vue";
import NewsBlockComponent from "components/NewsBlockComponent.vue";
import SliderComponent from "components/SliderComponent.vue";
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      newsSliderOptions: {
        spaceBetween: 20,
        pagination: false,
        clickable: true,
        preloadImages: true,
        breakpoints: {
          0: {
            slidesPerView: 1.1,
            spaceBetween: 20,
          },
          380: {
            slidesPerView: 1.2,
            spaceBetween: 20,
          },
          414: {
            slidesPerView: 1.3,
            spaceBetween: 20,
          },
          480: {
            slidesPerView: 1.7,
            spaceBetween: 20,
          },
          570: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        },
      },
    };
  },
  components: {
    NewsBlockComponent,
    SliderComponent,
    IconComponent,
  },
};
</script>

<style lang="stylus">
.catalog-news-list {
  display flex
  flex-direction column
  gap 80px
  padding 80px 30px
  width 100%

  +below(760px) {
    padding 60px 30px 30px 30px
    gap 30px
  }

  &__header {
    display flex
    justify-content space-between
    align-items center
    max-width: var(--max-width);
    width: 100%;
    margin: 0 auto;
  }

  &__title {
    font-weight: 700;
    font-size 3.75em;

    +below(1060px) {
      font-size: 1.875em;
    }
  }

  &__link {

    .btn--link {
      width: max-content;
    }

    +below(760px) {
      width 40px
      height 40px

      .btn--link {
        width 40px
        height 40px
        padding 0
      }

      span {
        display none
      }
    }
  }

  &__body {
    display grid
    width 100%
    grid-template-columns repeat(4, 1fr)
    grid-gap 30px
    max-width var(--max-width)
    margin 0 auto

    +below(1060px) {
      grid-template-columns repeat(3, 1fr)
    }

    +below(760px) {
      display none
    }
  }

  &__slider {
    display none
    width 100%
    max-width var(--max-width)

    +below(760px) {
      display flex
    }

    +below(570px) {
      .swiper {
        margin-right: -30px;
      }
    }
  }
}
</style>
