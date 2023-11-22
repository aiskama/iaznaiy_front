<template>
  <div class="partner-slide">
    <!--    <img :src="slide.img" alt="" />-->
    <ImgComponent :src="slide.img" />
    <!--    <a :href="slide.link" target="_blank">-->
    <!--    <ImgComponent v-if="slide.img" :head_img="slide.img" />-->
    <!--    </a>-->
  </div>
</template>

<script>
import ImgComponent from "components/ImgComponent.vue";
export default {
  name: "TickerSlide",
  components: { ImgComponent },

  // components: {
  //   ImgComponent,
  // },
  props: {
    slide: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="stylus">
.partner-slide{
  cursor: pointer;
  width 100%
  & img{
    width 100%
    height 80px
    object-fit none
  }
}
</style>
