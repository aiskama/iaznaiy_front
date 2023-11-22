<template>
  <section class="catalog-nft">
    <div class="container">
      <div class="catalog-nft__content">
        <div class="catalog-nft__img">
          <ImgComponent src="/static/images/nft-gramota.png" />
        </div>
        <div class="catalog-nft__info">
          <div class="catalog-nft__title">NFT-грамота</div>
          <div class="catalog-nft__description">Скачайте грамоту после участия в олимпиаде</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ImgComponent from "components/ImgComponent.vue";
export default {
  components: {
    ImgComponent,
  },
};
</script>

<style lang="stylus">
.catalog-nft {
  background-color var(--beige-o05)
  padding 41px 30px 22px 30px

  &__content {
    display flex
    padding: 0 22px;
    gap 272px

    +below(1060px) {
      justify-content center
      align-items center
      flex-direction column
      gap 0
    }
  }

  &__img {
    width 100%
    max-width 536px

    img {
      width 100%
      height 100%
    }
  }

  &__info {
    max-width 308px
    width 100%
    align-self center
    gap: 20px;
    height: 100px;
    display: flex;
    flex-direction: column;

    +below(1060px) {
      margin-top 60px
      max-width 100%
    }
  }
  &__title {
    font-weight 700
    font-size 2.5em
  }
  &__description {
    font-weight 500
    font-size 1.5em
  }
}
</style>
