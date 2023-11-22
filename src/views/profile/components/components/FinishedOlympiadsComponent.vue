<template>
  <div class="finished-olympiads__list">
    <div class="finished-olympiads__item" v-for="item in olympiads" :key="item.id">
      <div class="finished-olympiads__info">
        <div class="finished-olympiads__img">
          <ImgComponent :head_img="item.img" />
        </div>
        <div class="finished-olympiads__body">
          <div class="finished-olympiads__description">
            <div class="finished-olympiads__article">
              <span class="finished-olympiads__title">
                {{ item.title }}
              </span>
              <span class="finished-olympiads__article-desc">{{ item.description }}</span>
            </div>
            <div class="finished-olympiads__body-info">
              <span class="finished-olympiads__price">{{ item.price }} ₽</span>
              <span class="finished-olympiads__class">{{ item.class.title }}</span>
            </div>
          </div>
          <div v-if="item.completed" class="finished-olympiads__result">
            <span class="finished-olympiads__result-title"> Результат:</span>
            <span class="finished-olympiads__result-points">
              {{ item.result.points | plural("балл", "балла", "баллов") }}
            </span>
          </div>
          <div
            v-else-if="
              ($store.state.OLYMPIAD_EXPIRED === item.status.code && !item.result) ||
              $store.state.OLYMPIAD_NOT_STARTED === item.status.code
            "
            class="finished-olympiads__result"
          >
            <span class="finished-olympiads__result-points">
              {{ item.status.name }}
            </span>
          </div>
          <div v-else class="finished-olympiads__btn">
            <button class="btn btn--yellow" @click="openStartModal(item)">УЧАСТВОВАТЬ</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StartModal from "components/modals/components/StartModal.vue";
import ImgComponent from "components/ImgComponent.vue";

export default {
  name: "FinishedOlympiadsComponent",
  props: {
    olympiads: {
      type: Array,
      default: () => [],
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
  },
  components: {
    ImgComponent,
  },
};
</script>

<style lang="stylus">
.finished-olympiads {
  &__list {
    padding-top 50px
    display flex
    flex-direction column
    gap 80px
  }
  &__item {
    height 259px
    width 100%
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
    border-radius 20px
    padding 30px 30px 30px 30px

    +below(750px) {
      height 100%
    }
  }

  &__info {
    display flex
    width 100%
    gap 30px
    height 100%
    align-items center

    +below(750px) {
      flex-direction column
      height auto
    }
  }

  &__body-info {
    display flex
    width 100%
    max-width 100px
    gap: 5px;
    flex-direction column
    align-items flex-start

    +below(750px) {
      max-width 750px
      flex-direction row-reverse
      justify-content space-between
    }
  }

  &__article {
    display flex
    width 100%
    max-width 193px
    flex-direction column
    gap 13px
  }

  &__img {
    position: relative;
    top: -40px;
    width 100%
    max-width 294px
    height 278px

    +below(750px) {
      top: -80px;
    }

    img {
      position absolute
      border-radius 10px
      width 100%
      height 100%
      object-fit cover
    }
    +below(750px) {
      max-width 100%
    }
  }

  &__body {
    height: 100%;
    display: flex;
    width 100%
    flex-direction column
    justify-content: space-between;
    align-items: flex-end;

    +below(750px) {
      gap 26px
      margin-top: -85px;
    }
  }

  &__title {
    font-size 1.5em
    font-weight 700
    line-height 28px
  }

  &__article-desc {
    font-weight 500
    line-height 19px
    color rgba(0, 0, 0, 0.7)
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }

  &__description {
    display flex
    width: 100%;
    justify-content space-between

    +below(750px) {
      flex-direction: column;
      gap 20px
    }
  }

  &__price {
    font-size 1.5em
    font-weight 700
  }

  &__class {
    font-size 1.5em
    font-weight 500
  }

  &__result {
    width: 100%;
  }

  &__result-title {
    font-size 1.250em
    font-weight 700
    color: rgba(0, 0, 0, 0.5);
  }

  &__result-points {
    font-weight 700
    font-size 1.875em
  }

  &__btn {
    width 100%
    max-width 315px
    display flex
    align-items flex-end

    button {
      padding 0 10px
    }

    +below(750px) {
      .btn {
        max-width 100%
      }
      max-width 100%
    }
  }
}
</style>
