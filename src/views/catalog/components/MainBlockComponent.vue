<template>
  <section class="catalog-main">
    <ImgComponent :head_img="data.img" v-if="data.img" />
    <div class="catalog-main__content">
      <div class="catalog-main__bg-blur"></div>
      <div class="container">
        <div class="catalog-main__matter">
          <div class="catalog-main__afisha">
            <h1 class="catalog-main__title">{{ data.category.title }}</h1>
          </div>
          <div class="catalog-main__info">
            <div class="catalog-main__description">
              {{ data.description }}
            </div>
            <div class="catalog-main__btn">
              <span>Можно пройти до {{ data.date_end | catalogDate }}</span>
              <button v-if="!user" @click.prevent="openLoginModal" class="btn btn--yellow">
                Участвовать
              </button>
              <button v-else-if="user && !data.purchased" @click="openBuyModal(data)" class="btn btn--yellow">
                Участвовать
              </button>
              <button
                v-else-if="user && data.purchased && !data.completed"
                @click="openStartModal(data)"
                class="btn btn--yellow"
              >
                Начать
              </button>
              <button v-else-if="user && data.completed" disabled class="btn btn--yellow">
                Олимпиада пройдена
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ImgComponent from "components/ImgComponent.vue";
import BuyModal from "components/modals/components/BuyModal.vue";
import LoginModal from "components/modals/components/LoginModal.vue";
import StartModal from "components/modals/components/StartModal.vue";
export default {
  components: {
    ImgComponent,
  },
  props: {
    data: Object,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    openStartModal(olympiad) {
      this.$store.state._modals.push({
        component: StartModal,
        options: {
          olympiad,
        },
      });
    },
    openBuyModal(olympiad) {
      this.$store.state._modals = [];

      this.$store.state._modals.push({
        component: BuyModal,
        options: {
          olympiad,
        },
      });
    },
    openLoginModal() {
      this.$store.state._modals.push({
        component: LoginModal,
      });
    },
  },
};
</script>

<style lang="stylus">
.catalog-main {
  position relative
  width 100%
  height 633px
  margin-top 90px
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
    margin: 0

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
}
</style>
