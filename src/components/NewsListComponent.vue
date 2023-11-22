<template>
  <section class="news-list">
    <div class="news-list__header container">
      <div class="news-list__title">{{ title }}</div>
      <div class="news-list__link">
        <router-link to="/news" class="btn btn--link">
          <span>Все новости</span>
          <IconComponent name="CaretRight" />
        </router-link>
      </div>
    </div>
    <div class="news-list__body">
      <NewsBlock v-for="item in items" :key="item.id" :data="item" />
    </div>
    <SliderComponent
      class="news-list__slider"
      :items="items"
      v-slot="{ item }"
      :slider-options="newsSliderOptions"
    >
      <NewsBlock :data="item" />
    </SliderComponent>
  </section>
</template>
<script>
import SliderComponent from "components/SliderComponent.vue";
import NewsBlock from "components/NewsBlockComponent.vue";
import IconComponent from "components/IconComponent.vue";
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
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
    NewsBlock,
    SliderComponent,
    IconComponent,
  },
};
</script>

<style lang="stylus">
.news-list {
  display flex
  flex-direction column
  gap 80px
  padding 80px 30px
  background var(--beige)
  width 100%

  +below(760px) {
    padding 80px 30px 50px 30px
    gap 50px
  }

  &__header {
    display flex
    justify-content space-between
    align-items center
  }

  &__title {
    font-weight: 700;
    font-size 3.75em;
    width 100%
    max-width var(--max-width)
    margin 0 auto

    +below(760px) {
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
