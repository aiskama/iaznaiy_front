<template>
  <div class="slider" v-if="items && items.length">
    <div class="slider__container">
      <div class="slider__header" v-if="title">
        <div class="slider__title">{{ title }}</div>
        <router-link :to="route" class="btn btn--hollow-dark btn--sm" v-if="buttonTitle">
          <span>{{ buttonTitle }}</span>
        </router-link>
      </div>
      <div class="slider__items">
        <div class="swiper" ref="items">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, i) in items" :key="i">
              <slot :item="item"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SliderComponent",
  props: {
    title: [String, Object],
    buttonTitle: String,
    items: Array,
    hideArrows: Boolean,
    route: {
      type: Object,
      default() {
        return {
          name: "",
        };
      },
    },
    sliderOptions: {
      type: Object,
      default() {
        return {
          slidesPerView: "auto",
          spaceBetween: 24,
          pagination: false,
          clickable: false,
        };
      },
    },
  },
  data() {
    return {
      swiper: null,
    };
  },
  computed: {
    canShowArrows() {
      let slidesPerView = this.getCurrentBreakpoint().slidesPerView;
      if (typeof slidesPerView === "string") {
        return slidesPerView === "auto";
      }
      if (typeof slidesPerView === "number") {
        return this.items.length > slidesPerView;
      }
      return false;
    },
  },
  mounted() {
    require(["swiper/swiper-bundle.esm.browser.js"], ({ Swiper }) => {
      this.swiper = new Swiper(this.$refs.items, this.sliderOptions);
    });
  },
  methods: {},
  components: {},
};
</script>

<style lang="stylus">
@import "~swiper/swiper-bundle.min.css"
.swiper-slide {
  width 100%
  max-width 100%
  display inline-flex
}

.swiper {
  padding: 30px 0;
}

.slider {
  width 100%
  display flex
  justify-content center
  align-items center

  &__title {
    font-weight 700
    font-size: 1.75em;
    line-height: 36px;
    font-family var(--font-regular)
    color: var(--black);
  }

  &__items {
    position relative
    width 100%
  }

  &__container {
    width 100%
  }

  &__header {
    display flex
    align-items center
    width 100%
    margin-bottom 10px
    justify-content space-between

    +below(860px) {
      display grid
      grid-gap 16px
      justify-content stretch

      .btn {
        width 100%
        justify-content center
      }
    }
  }
}
</style>
