<template>
  <div class="catalog-card">
    <router-link :to="{ name: 'catalog-open', params: { id: data.id } }">
      <div class="catalog-card__img">
        <span>Можно пройти до {{ data.date_end | catalogDate }}</span>
        <ImgComponent :head_img="data.img" />
      </div>
    </router-link>
    <div class="catalog-card__body">
      <div class="catalog-card__matter">
        <router-link :to="{ name: 'catalog-open', params: { id: data.id } }">
          <span>
            <div class="catalog-card__title">
              {{ data.title }}
            </div>
            <span class="catalog-card__description">
              {{ data.description }}
            </span>
          </span>
        </router-link>
      </div>
      <div class="catalog-card__info">
        <div class="catalog-card__price">{{ data.price }} ₽</div>
        <div class="catalog-card__line"></div>
        <div class="catalog-card__wishlist">
          <div class="catalog-card__class">{{ data.class.title }}</div>
          <!--          <IconComponent name="BookmarkSimple" />-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImgComponent from "components/ImgComponent.vue";
import IconComponent from "components/IconComponent.vue";

export default {
  name: "CatalogCard",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    ImgComponent,
    IconComponent,
  },
};
</script>

<style lang="stylus">
.catalog-card {
  position relative
  padding 50px 0 0 0
  height 400px
  max-width 577px
  width 100%

  +below(1250px){
    height 500px
    max-width 354px
  }

  +below(1150px){
    height 500px
    max-width 100%
  }

  &__header {

  }

  &__img {
    position absolute
    top 0
    left 30px
    width: 294px;
    height: 278px;
    overflow hidden
    border-radius 20px

    +below(1250px){
      right 30px
      max-width: 100%;
    }
    +below(1150px){
      width: auto;
    }

    span {
      position absolute
      top 17px
      right 17px
      padding 10px
      border-radius 6px
      font-weight: 500;
      font-size: 0.75em;
      background: rgba(255, 255, 255, 0.8);
      color: var(--black)
      //backdrop-filter: blur(15px)
    }
    img {
      width 100%
      height 100%
      object-fit cover
    }
  }
  &__info {
    display flex
    flex-direction column
    gap 15px

    span {
      font-size 1em
    }
  }
  &__body {
    display flex
    flex-direction column
    justify-content space-between
    padding 30px
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    height 100%

    +below(1250px) {
      gap 30px
    }
  }

  &__matter {
    display flex
    justify-content flex-end
    width 100%
    height 100%

    +below(1250px){
      justify-content: start;
      align-items: flex-end;
    }


    span {
      display block
      max-width: 193px;
      width 100%
      height 100%

      +below(1250px) {
        max-width 100%
      }
    }
  }

  &__title {
    font-weight: 700;
    font-size: 1.5em
    line-height: 28px;
    margin-bottom 10px
    color var(--black)

    +below(500px) {
      margin-top 20px
    }
  }

  &__description {
    font-weight: 500;
    font-size: 1em;
    color var(--black)
  }

  &__price {
    font-weight: 700;
    font-size: 1.250em
  }

  &__line {
    width 100%
    height 1px
    background-color var(--black)
  }

  &__wishlist {
    display flex
    justify-content space-between

    .icon {
      cursor pointer
    }
  }

  &__class {
    font-weight: 500;
    font-size: 1.250em
  }
}
</style>
