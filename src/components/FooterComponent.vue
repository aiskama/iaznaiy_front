<template>
  <footer class="footer">
    <div class="footer__content container">
      <div class="footer__first-block">
        <router-link :to="{ name: 'home' }" class="footer__logo">
          <IconComponent name="logo" />
          <span class="footer__logo_text">Я знаю</span>
        </router-link>
        <div class="footer__cards">
          <IconComponent v-for="(item, i) in items" :key="i" :name="item" />
        </div>
      </div>
      <div class="footer__links">
        <span class="footer__about">О нас</span>
        <div class="footer__list">
          <a href="static/files/ЯЗнаю _ Положение об олимпиадах.pdf" target="_blank">
            <span>Положение об олимпиадах</span>
          </a>
          <a v-for="(link, i) in links" :key="i" @click.prevent="goToLink(link)">
            <span>{{ link.title }}</span>
          </a>
        </div>
        <a class="footer__politic" href="static/files/Язнаю условия использования.pdf" target="_blank">
          <span>Условия использования</span>
        </a>
      </div>
      <div class="footer__info">
        <div class="footer__contacts">
          <span>Контакты</span>
          <a href="tel:+7(938) 800-01-34">
            <span>+7(938) 800-01-34</span>
          </a>
          <a href="mailto:mail@iknow365.ru">
            <span>mail@iknow365.ru</span>
          </a>
          <ul class="footer__icons">
            <li v-for="(item, i) in social" :key="i">
              <a :href="item.link" target="_blank">
                <figure v-html="item.icon" />
              </a>
            </li>
          </ul>
        </div>
        <div class="footer__comrades">
          <ComradesLogo />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import IconComponent from "components/IconComponent.vue";
import ComradesLogo from "components/ComradesLogo.vue";
import SoonModal from "components/modals/components/SoonModal.vue";
export default {
  name: "FooterComponent",
  mounted() {},
  components: {
    ComradesLogo,
    IconComponent,
  },
  props: {},
  data() {
    return {
      items: ["icon_visa", "icon_mastercard", "icon_mir", "icon_sbp"],
      links: [
        { title: "Каталог олимпиад", link: "/catalog" },
        { title: "Результат", link: "", isModal: true },
        { title: "Новости", link: "/news" },
        { title: "О проекте", link: "/about" },
        { title: "NFT?", link: "/news/12" },
      ],
    };
  },
  methods: {
    openModal() {
      this.$store.state._modals.push({
        component: SoonModal,
      });
    },
    goToLink({ link, isModal }) {
      if (isModal) {
        this.openModal();
      } else {
        if (this.$route.path !== link) this.$router.push(link);
      }
    },
  },
  computed: {
    social() {
      return this.$store.state.social;
    },
  },
};
</script>

<style lang="stylus">
.footer {
  padding 50px 30px 40px 30px
  width 100%
  background-color var(--black)
  color var(--white)
  margin-top: auto;
  &__content {
    display flex

    +below(1060px){
      flex-direction column
    }

  }

  &__first-block {

  }

  &__logo {
    max-width 172px
    width 100%
    display flex
    flex-direction column
    align-items center
    font-weight 400
    font-size 1.5em
    text-transform uppercase
    gap 15px
    text-decoration none
    color var(--white)

    +below(1060px){
      width 100px
    }

    .icon {
      width 172px
      height 172px

      +below(1060px){
        width: 100px
        height: 100px
      }

    }
  }

  &__cards {
    display flex
    gap 20px
    margin-top 185px
    margin-right 132px

    +below(1060px){
      margin-top 30px
    }

  }

  &__links {
    margin-top 30px
    margin-right 135px
    position relative
    width 100%
    max-width 270px

    +below(1280px){
      margin-right 170px
    }

    +below(1060px){
      margin-right 0
    }

    > span {
      margin-bottom 50px
      font-size 1.250em
      display block
    }

  }

  &__about {

  }

  &__list {

    display flex
    flex-direction column
    gap 20px

    span {
      color var(--white)
      font-size 1em
      font-weight 500
    }

    a {
      cursor pointer

    }
  }

  &__politic{
    position: absolute;
    bottom: 0;
    font-weight: 500;
    font-size: 1.250em
    line-height: 24px;
    color var(--white)

    +below(1060px){
      position static
    }
  }

  &__contacts{
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  &__info {
    display flex
    flex-direction column
    font-size 1.250em
    margin-top 30px
    justify-content space-between

    > span {
      margin-bottom 30px
      color var(--white)
    }

   a {
      //margin-bottom 30px
      color var(--white)
    }
  }

  &__icons {
    display flex
    gap 30px
    padding-top 10px

    +below(1280px){
      gap 0
    }

    li {
      display flex
      justify-content center
      align-items center
      width 72px
      height 72px
      cursor pointer
    }
  }
}
</style>
