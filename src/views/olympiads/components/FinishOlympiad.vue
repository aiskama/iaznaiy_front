<template>
  <section>
    <div class="finish-olympiad">
      <ImgComponent :head_img="data.img" />
      <div class="finish-olympiad__content">
        <div class="finish-olympiad__bg-blur"></div>
        <div class="container">
          <div class="finish-olympiad__matter">
            <div class="finish-olympiad__afisha">
              <div class="finish-olympiad__title">{{ data.class.title }}</div>
            </div>
            <div class="finish-olympiad__info">
              <div class="finish-olympiad__description">Олимпиада {{ data.category.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="finish-olympiad__result container">
      <div class="finish-olympiad__result-header">
        <div class="finish-olympiad__result-title">Ваш результат:</div>
        <div class="finish-olympiad__link">
          <router-link :to="{ name: 'catalog' }" class="btn btn--link">
            <span>Перейти в каталог</span>
            <IconComponent name="CaretRight" />
          </router-link>
        </div>
      </div>
      <span class="finish-olympiad__result-points">
        {{ points | plural("балл", "балла", "баллов") }}
      </span>
      <span class="finish-olympiad__result-text"
        >Вы набрали {{ points | plural("балл", "балла", "баллов") }}. <br />
      </span>
      <div class="finish-olympiad__result-btn">
        <button class="btn btn--yellow btn--lg">Получить грамоту</button>
      </div>
    </div>
  </section>
</template>

<script>
import ImgComponent from "components/ImgComponent.vue";
import IconComponent from "components/IconComponent.vue";

export default {
  name: "FinishOlympiad",
  components: { IconComponent, ImgComponent },
  props: {
    data: Object,
    points: Number,
  },
};
</script>

<style lang="stylus">
.finish-olympiad {
  position relative
  width 100%
  height 633px
  display flex
  justify-content center

  img {
    width 100%
    height 100%
    object-fit cover
  }

  &__content {
    position absolute
    padding 67px 30px
    bottom 0
    overflow hidden
    //height 295px
    //background: rgba(255, 255, 255, 0.6);
    //backdrop-filter: blur(50px);
    width 100%
    border-radius: 100px 100px 0 0;

    +below(1060px) {
      border-radius: 50px 50px 0 0;
      padding 30px 30px
    }
  }

  &__afisha{
    width 100%
  }

  &__info{
    display flex
    justify-content space-between
    width 100%

    +below(900px){
      flex-direction column
    }
  }

  &__btn {
    display flex
    flex-direction column
    align-items flex-end
    justify-content flex-end
    height 100%
    //width: 100%;

    span {
      font-size 1em
      font-weight 500
    }

    button {
      margin-top 20px
      width 315px

      +below(1400px) {
        margin-top 10px
        width 100%
      }
    }

    +below(1060px) {
      .btn {
        max-width: 100%;
      }
    }
  }
  &__matter {
    position relative
    z-index 10
    display flex
    flex-direction column
    justify-content space-between
    align-items: flex-end;
    height 100%

    +below(1060px) {
      flex-direction column
      align-items: flex-start
    }
  }

  &__bg-blur {
    background: rgba(255,255,255,0.6);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  &__title {
    font-weight 700
    font-size 3.750em
    line-height 1

    +below(1400px) {
      font-size 2.5em
    }

    +below(1060px) {
      font-size 1.875em
    }
  }
  &__description {
    width 100%
    max-width 600px
    font-weight 500
    line-height: 47px;
    font-size 2.500em
    margin-top: 10px

    +below(1060px) {
      font-size 1.125em
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
  &__result {
    padding 90px 0 56px 0
    display flex
    flex-direction column
    gap 60px

    +below(1200px){
      padding-left: 30px
      padding-right: 30px
    }
  }

  &__result-header{
    display flex
    justify-content space-between
  }
  &__result-points{
    font-weight: 700;
    font-size: 4.000em
    line-height: 76px;

    +below(800px){
      font-size: 2em
    }
  }
  &__result-title{
    font-weight: 700;
    font-size: 3.125em
    line-height: 59px;

    +below(800px){
      font-size: 1.8em
    }
  }
  &__result-text{
    font-weight: 400;
    font-size: 2.000em
    line-height: 38px;

    +below(800px){
      font-size: 1.6em
      line-height: 28px;
    }
  }
  &__result-btn{
    margin-top: 60px
    display flex
    justify-content center

    & .btn{
      max-width 315px
      height 71px
    }
  }
}
</style>
