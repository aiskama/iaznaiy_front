<template>
  <div class="soon-modal">
    <span class="soon-modal__title">
      <span> Скоро... </span>
      <IconComponent name="alarm" />
    </span>
  </div>
</template>

<script>
import IconComponent from "components/IconComponent.vue";

export default {
  name: "SoonModal",
  components: { IconComponent },
};
</script>

<style lang="stylus">
.soon-modal{
  background var(--white)
  border-radius 16px
  display flex
  justify-content center
  align-items center
  z-index 1000
  max-width: 520px;
  width: 100%;
  height: 280px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.25);

  &__title{
    font-size 4.000em
    font-weight 700

    //+below(650px){
    //  display flex
    //  flex-direction: column;
    //  justify-content: center;
    //  align-items: center;
    //}

    +below(650px){
      font-size 3.2em
    }

    .icon {
      width 86px
      height 86px

      +below(650px){
        width 60px
        height 60px
      }

      svg {
        width 86px
        height 86px

        +below(650px){
          width 60px
          height 60px
        }
      }
    }
  }
}
</style>
