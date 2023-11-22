<template>
  <div class="start-modal">
    <div class="start-modal__header">
      <!--      <div class="start-modal__img"></div>-->
      <div class="start-modal__title">
        {{ olympiad.category.title }}
      </div>
    </div>
    <div class="start-modal__body">
      <div class="start-modal__class">
        {{ olympiad.class.title }}
      </div>
      <div class="start-modal__duration">
        <IconComponent name="Clock" class="clock__icon" />
        <div class="start-modal__duration-time">
          <span class="start-modal__duration-hour" v-if="clock.hours">{{
            clock.hours | plural("час", "часа", "часов")
          }}</span>
          <span class="start-modal__duration-minutes" v-if="clock.minutes">{{
            clock.minutes | plural("минута", "минуты", "минут")
          }}</span>
        </div>
      </div>
      <div class="start-modal__class">{{ olympiad.tests_count }} вопросов</div>
      <div class="start-modal__regulations">
        Правила для прохождения можете посмотреть <a href="#">здесь</a>!
      </div>
    </div>
    <div class="start-modal__btn">
      <router-link
        :to="{
          name: 'olympiad',
          params: { id: olympiad.id, subject: olympiad.category.title, class: olympiad.class.title },
        }"
        class="btn btn--orange btn--sm"
        >Начать</router-link
      >
    </div>
  </div>
</template>

<script>
import IconComponent from "components/IconComponent.vue";
export default {
  components: { IconComponent },

  props: {
    olympiad: Object,
  },
  data() {
    return {
      time: parseInt(this.olympiad.duration),
    };
  },
  methods: {},
  computed: {
    clock() {
      let clock = {
        hours: null,
        minutes: null,
      };

      clock.hours = Math.floor(this.time / 60);
      clock.minutes = this.time % 60;

      return clock;
    },
  },
};
</script>

<style lang="stylus">
.start-modal {
  padding 30px
  width 100%
  max-width 780px
  //height 300px
  border-radius 20px
  background-color var(--white)
  z-index 1000
  display flex
  flex-direction column
  justify-content center
  align-items center
  gap 30px

  +below(650px){
    gap 15px
    max-width 354px
    padding 15px
  }

  &__title{
    font-weight: 700;
    font-size: 2.500em
    line-height: 47px;

    +below(650px){
      font-size 1.875em
      line-height 35px
    }

  }
  &__body{
    font-weight: 500;
    font-size: 1.500em
    line-height: 28px;
    display flex
    flex-direction column
    gap 30px
    text-align center

    +below(650px){
      gap 15px
      font-size 1.125em
      line-height 21px
    }

  }
  &__btn {
    width 100%
    & .btn {
      max-width 100%
    }
  }
  &__regulations{
    font-weight: 500;
    font-size: 0.875em
    line-height: 21px;

    +below(650px){
      font-size 0.7em
      line-height 14px
    }

    & a {
      color black
      text-decoration underline
      //border-bottom 1px solid black
    }
  }
  &__duration{
    display flex
    gap 24px
    align-items center
    justify-content center

    & .clock__icon{
      +below(650px){
        display none
      }
    }

    &-time{
      display flex
      gap 5px
    }
  }
}
</style>
