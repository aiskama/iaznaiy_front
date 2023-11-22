<template>
  <section class="catalog-about">
    <div class="container">
      <div class="catalog-about__content">
        <div class="catalog-about__title">
          <span> Как принять участие в олимпиаде? </span>
        </div>
        <div class="catalog-about__list">
          <div class="catalog-about__item" v-for="(item, i) in items" :key="i">
            <div class="catalog-about__number">
              {{ ++i }}
            </div>
            <div class="catalog-about__text">
              {{ item }}
            </div>
            <div class="catalog-about__line"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      items: [
        "Для участия понадобится компьютер или планшет с доступом в интернет",
        "Родитель или учитель регистрирует учеников на сайте",
        "Ученики заходят на сайт и проходят олимпиаду",
      ],
    };
  },
};
</script>

<style lang="stylus">
.catalog-about {
  width 100%
  padding 0 30px

  &__content {
    padding 80px 0

    +below(1060px) {
      padding 30px 0
    }
  }

  &__title {
    font-weight 700
    font-size 2.500em
    margin-bottom 60px

    +below(1060px) {
      font-size 1.875em
      margin-bottom 30px
    }
  }

  &__list {
    display grid
    grid-template-columns repeat(3, 1fr)
    height 350px
    gap 30px

    +below(1060px) {
      display flex
      gap 50px
      flex-direction column
      height 100%
    }
  }

  &__item {
    display flex
    flex-direction column
    gap 30px

    &:nth-child(1) {
      align-self end
      +below(1060px) {
        width 100%
        align-items flex-start
      }
    }
    &:nth-child(2) {
      align-self center
      +below(1060px) {
        width 100%
        align-items flex-start
      }
    }
  }

  &__number {
    color var(--orange)
    font-weight 500
    font-size 1.500em
  }

  &__text {
    font-weight: 500;
    font-size: 24px;
  }

  &__line {
    width 100%
    height 4px
    background-color var(--orange)
  }
}
</style>
