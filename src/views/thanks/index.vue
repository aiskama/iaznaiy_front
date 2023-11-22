<template>
  <main class="thanks-page">
    <div class="container">
      <h1 class="thanks-page__content">Спасибо за покупку!</h1>
      <div class="thanks-page__button">
        <router-link class="btn btn--yellow btn--sm" :to="{ name: 'home' }">На главную</router-link>
        <button v-if="olympiad" @click="openStartModal(olympiad)" class="btn btn--yellow btn--sm">
          Начать
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import StartModal from "components/modals/components/StartModal.vue";

export default {
  data() {
    return {
      olympiad: null,
    };
  },
  mounted() {
    this.olympiad = JSON.parse(localStorage.getItem("olympiad"));
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
};
</script>

<style lang="stylus">
.thanks-page {
  padding-top 150px
  width 100%
  height 100%
  min-height 100vh

  & .container{
    display flex
    flex-direction column
    gap 60px
  }

  &__content {
    font-size 4em
    font-weight 700
    margin: 0
  }
  &__button{
    display flex
    gap 20px
  }
}
</style>
