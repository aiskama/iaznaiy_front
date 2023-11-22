<template>
  <div class="page_404">
    <h1>404</h1>
    <h2>Я не ЗНАЮ</h2>
    <p>Такой страницы пока не существует, но мы подумаем как её использовать, а пока можете...</p>
    <div class="page_404-buttons">
      <router-link :to="{ name: 'home' }" class="btn btn--white">Вернуться на главную</router-link>
      <router-link :to="{ name: 'catalog' }" class="btn btn--white">Посмотреть олимпиады</router-link>
      <a class="btn btn--white" @click="openModal">Пройти развивающие тренажеры</a>
    </div>
  </div>
</template>

<script>
import SoonModal from "components/modals/components/SoonModal.vue";

export default {
  async asyncData({ res }) {
    res.status(404);
  },
  methods: {
    openModal() {
      this.$store.state._modals.push({
        component: SoonModal,
      });
    },
  },
};
</script>
<style lang="stylus">
.page_404{
  display flex
  flex-direction column
  align-items: center;
  align-content: center;
  justify-content: center;
  background var(--yellow)
  h1{
    font-weight: 700;
    font-size: 15.625em;
    line-height: 295px;
    letter-spacing: 0.065em;
    color: var(--orange);
    margin 150px 0 0 0
  }
  h2{
    font-weight: 500;
    font-size: 4em;
    line-height: 107.3%;
    text-transform: uppercase;
    margin-bottom: 30px;
    color: #050A25;
  }
  p{
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    color: var(--black);
    margin-bottom: 70px;
  }
  &-buttons{
    display flex
    margin-bottom: 70px;

    gap 30px
    .btn{
      font-weight: 500;
      line-height: 24px;
      font-size 1.25em
      text-transform  none
      max-width max-content
      padding 23px 15px
    }
  }
}
</style>
