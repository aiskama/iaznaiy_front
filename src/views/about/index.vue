<template>
  <main class="about-page">
    <div class="about-page__logo container">
      <router-link :to="{ name: 'home' }" class="about-page__logo-wrap">
        <IconComponent name="logo" />
      </router-link>
    </div>
    <div class="about-page__body container">
      <h1 class="about-page__title">О проекте</h1>
      <EditorJSComponent :text="JSON.parse(description)" />
    </div>
    <!--    <div class="about-page__swiper">-->
    <!--      <PartnerSliderComponent :data="data" />-->
    <!--    </div>-->
    <!--    <NewsListComponent :title="'Сми о нас'" :items="news" />-->
  </main>
</template>

<script>
import IconComponent from "components/IconComponent.vue";
import EditorJSComponent from "components/EditorJSComponent.vue";
import ABOUT_PAGE from "../../graphql/page/about_page.graphql";
// import NewsListComponent from "../../components/NewsListComponent.vue";
// import PartnerSliderComponent from "components/PartnerSliderComponent.vue";
export default {
  name: "about",
  components: {
    // PartnerSliderComponent,
    // NewsListComponent,
    EditorJSComponent,
    IconComponent,
  },
  async asyncData({ apollo, store }) {
    await apollo.defaultClient
      .query({
        query: ABOUT_PAGE,
      })
      .then(({ data }) => {
        store.state.about_page.news = data.news_paginate.data;
        store.state.about_page.about = data.about;
        store.state.social = data.about.social;
      });
  },
  computed: {
    news() {
      return this.$store.state.about_page.news;
    },
    description() {
      return this.$store.state.about_page.about.description;
    },
  },
  data() {
    return {
      data: [
        {
          id: 1,
          img: "../../static/images/image 24.png",
        },
        {
          id: 2,
          img: "../../static/images/image 25.png",
        },
        {
          id: 3,
          img: "../../static/images/image 26.png",
        },
        {
          id: 4,
          img: "../../static/images/image 27.png",
        },
        {
          id: 5,
          img: "../../static/images/image 28.png",
        },
        {
          id: 6,
          img: "../../static/images/image 29.png",
        },
        {
          id: 7,
          img: "../../static/images/image 30.png",
        },
        {
          id: 8,
          img: "../../static/images/image 31.png",
        },
      ],
      // news: [
      //   {
      //     id: 1,
      //     title: "Новость 1",
      //     description: "Описание новости 1",
      //     img: "/static/images/news.png",
      //   },
      //   {
      //     id: 2,
      //     title: "Новость 2",
      //     description: "Описание новости 2",
      //     img: "/static/images/news.png",
      //   },
      //   {
      //     id: 3,
      //     title: "Новость 3",
      //     description: "Описание новости 3",
      //     img: "/static/images/news.png",
      //   },
      //   {
      //     id: 4,
      //     title: "Новость 4",
      //     description: "Описание новости 4",
      //     img: "/static/images/news.png",
      //   },
      // ],
    };
  },
};
</script>

<style lang="stylus">
.about-page{
  padding: 190px 0 100px 0

  +below(1280px){
    padding: 160px 0 100px 0
  }

  &__logo{

    +below(1280px){
      padding: 0 30px;
    }

    &-wrap{
      width 211px
      height 211px
      background-color var(--yellow)
      border-radius 100px
      display flex
      justify-content center
      align-items center

      +below(1280px){
        width: 103px
        height: 103px
      }

      .icon {

        +below(1280px){
          width: 82px
          height: 82px
        }

        svg path{
          fill var(--black)
        }
      }
    }
  }

  &__body{
    +below(1280px){
      padding: 0 30px;
    }
    .editor-js{
      p{
        font-weight: 400;
        font-size: 1.5em;
        line-height: 28px;
        color: #000000;
        +below(760px) {
          font-size: 1.125em;
          line-height: 21px;
        }
      }

    }
  }

  &__title{
    font-weight: 700;
    font-size: 3.750em
    line-height: 71px;

    +below(1280px){
      font-size: 1.875em
    }

  }
  &__swiper{
    width 100%
    padding: 30px 0

    //& .swiper-slide{
    //  justify-content center
    //}
  }
}
.news-more {
  padding 80px 30px
  background-color var(--beige)

  &__slider {
    display none
    width 100%
    max-width var(--max-width)

    +below(760px) {
      display flex
    }

    +below(570px) {
      .swiper {
        margin-right: -30px;
      }
    }
  }

  &__link {

    .btn--link {
      width: max-content;
    }

    +below(760px) {
      width 40px
      height 40px

      .btn--link {
        width 40px
        height 40px
        padding 0
      }

      span {
        display none
      }
    }
  }

  &__header {
    display flex
    justify-content space-between
    align-items center
    margin-bottom 80px

    .btn {
      border 1px solid var(--beige)

      &:hover {
        background-color transparent
      }
      &:active {
        background-color transparent
      }
    }
  }

  &__title {
    font-weight 700
    font-size 3.75em

    +below(760px) {
      font-size: 1.875em;
    }

  }

  &__body {
    display grid
    grid-template-columns repeat(4, 1fr)
    grid-gap 30px

    +below(1060px) {
      grid-template-columns repeat(3, 1fr)
    }

    +below(760px) {
      display none
    }

  }

}
</style>
