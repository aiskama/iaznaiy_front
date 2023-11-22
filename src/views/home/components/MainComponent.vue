<template>
  <section class="home-main">
    <div class="home-main__content container">
      <div class="home-main__body">
        <h1 class="home-main__title">Предметные онлайн чемпионаты</h1>
        <div class="home-main__description">
          <span>Площадка предметных олимпиад для школьников 1-11 классов</span>
        </div>
        <div class="home-main__buttons">
          <button v-if="!user" @click="openLoginModal" class="btn btn--white">регистрация</button>
          <router-link class="btn" :to="{ name: 'catalog' }">
            <span>выбрать олимпиаду</span>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import RegistrationForm from "components/modals/components/RegistrationForm.vue";

export default {
  name: "homeMain",
  methods: {
    openLoginModal() {
      this.$store.state._modals.push({
        component: RegistrationForm,
      });
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="stylus">
.home-main {
  width 100%
  background-color var(--yellow)
  display flex
  gap 33px
  padding 0 30px
  background-image: url(/static/images/main-img.svg);
  background-repeat: no-repeat;
  background-position: center right 15%;
  background-size: auto 80%;

  +below(1600px) {
    background-position: center right 5%;
    background-size: auto 75%;
  }

  +below(1280px) {
    //background-image: url(/static/images/main-img_mob.png);
    background-position: top 12% right 50%;
    background-size: auto;

  }

  &__body {
    width 100%
    max-width 746px
    padding-top 170px
    padding-bottom 90px
    +below(1280px){
       padding-top 512px
    }
  }

  &__description {
    font-weight: 500
    font-size: 40px
    line-height: 47px
    margin-bottom 90px

    +below(1060px) {
      font-size 1.125em
      line-height 21px
    }
  }

  &__buttons {
    display flex
    gap 40px

    & .btn{
      max-width: 303px;
      //padding 25px 41px
    }

    & .btn--white{
      max-width 219px
    }

    //& a {
    //  width 100%
    //}

    +below(660px) {
      flex-direction column
      .btn {
        max-width 100%
      }
    }
  }

  &__title {
    font-size 5em
    margin 0 0 35px 0

    +below(1280px) {
      line-height 47px
      margin 0 0 20px 0
      font-size 3.5em
    }

    +below(1060px) {
      font-size 2.5em
    }
  }
}
</style>
