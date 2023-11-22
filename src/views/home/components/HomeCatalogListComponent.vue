<template>
  <section class="home-catalog">
    <div class="home-catalog__content">
      <div class="home-catalog__header">
        <div class="home-catalog__title">
          <span> Каталог олимпиад </span>
        </div>
        <div class="home-catalog__link">
          <router-link to="/catalog" class="btn btn--link">
            <span> Все олимпиады </span>
            <IconComponent name="CaretRight" />
          </router-link>
        </div>
      </div>
      <div class="home-catalog__list">
        <HomeCatalogCardComponent v-for="item in items" :key="item.id" :data="item" />
      </div>
      <SliderComponent
        class="home-catalog__slider"
        :items="items"
        v-slot="{ item }"
        :slider-options="catalogSliderOptions"
      >
        <HomeCatalogCardComponent :data="item" />
      </SliderComponent>
    </div>
  </section>
</template>

<script>
// import HomeCatalogSlider from "./HomeCatalogSlider.vue";
import SliderComponent from "components/SliderComponent.vue";
import HomeCatalogCardComponent from "./HomeCatalogCardComponent.vue";
import IconComponent from "components/IconComponent.vue";
export default {
  name: "HomeCatalogList",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      catalogSliderOptions: {
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
            slidesPerView: 1.5,
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
    HomeCatalogCardComponent,
    IconComponent,
    SliderComponent,
    // HomeCatalogSlider,
  },
};
</script>

<style lang="stylus">

.home-catalog {
  width 100%
  padding 104px 30px


  &__content {
    width 100%
    max-width var(--max-width)
    margin 0 auto
    display flex
    flex-direction column
    gap 100px

    +below(760px) {
      gap 70px
    }

  }

  &__header {
    display flex
    justify-content space-between
    align-items flex-end
    +below(1024px){
      align-items center
    }
  }

  &__title {
    font-weight: 700;
    font-size: 3.75em;
    line-height 71px

    +below(1060px) {
      font-size 1.875em
      line-height 35px
    }
  }

  &__link {
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

  &__list {
    display grid
    grid-template-columns repeat(3, 1fr)
    grid-gap 30px

    +below(1060px) {
      grid-template-columns repeat(2, 1fr)
    }

    +below(760px) {
      display none
    }
  }

  & .slider {
    display none

    +below(760px) {
      display flex
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
