<template>
  <SliderComponent :items="data" v-slot="{ item }" :slider-options="partnerSliderOptions">
    <PartnerSlide :slide="item" />
  </SliderComponent>
</template>

<script>
import SliderComponent from "components/SliderComponent.vue";
import PartnerSlide from "components/PartnerSlide.vue";
export default {
  name: "PartnerSliderComponent",
  components: { SliderComponent, PartnerSlide },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      partnerSliderOptions: {
        slidesPerView: 8,
        spaceBetween: 20,
        // centeredSlides: true,
        freeMode: true,
        loop: true,
        loopFillGroupWithBlank: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
        speed: 1000,
        breakpoints: {
          0: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          380: {
            slidesPerView: 2.3,
            spaceBetween: 20,
          },
          414: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          570: {
            slidesPerView: 3.2,
            spaceBetween: 20,
          },
          660: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          800: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1000: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
          1250: {
            slidesPerView: 7,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 8,
            spaceBetween: 20,
          },
        },
      },
    };
  },
};
</script>

<style lang="stylus"></style>
