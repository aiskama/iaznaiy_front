<template>
  <main class="news-item-page">
    <div class="news-item-page__content">
      <div class="container">
        <div class="news-item-page__title">
          <a class="btn btn--link btn--md" @click="$router.go(-1)">
            <IconComponent name="CaretRight" />
            <span>Вернуться назад</span>
          </a>
        </div>
        <EditorJSComponent :text="JSON.parse(news_item.description)" v-if="news_item.description" />
      </div>
    </div>
    <NewsListComponent :title="'Читайте так же'" :items="news" />
  </main>
</template>

<script>
import IconComponent from "components/IconComponent.vue";
// import NewsBlockComponent from "components/NewsBlockComponent.vue";
import EditorJSComponent from "components/EditorJSComponent.vue";
import NEWS_ITEM from "../../graphql/page/news_item.graphql";
// import SliderComponent from "components/SliderComponent.vue";
import NewsListComponent from "components/NewsListComponent.vue";
export default {
  components: {
    NewsListComponent,
    // SliderComponent,
    IconComponent,
    // NewsBlockComponent,
    EditorJSComponent,
  },
  async asyncData({ apollo, store, route }) {
    await apollo.defaultClient
      .query({
        query: NEWS_ITEM,
        variables: {
          id: parseInt(route.params.id),
        },
      })
      .then(({ data }) => {
        store.state.news_page.news = data.news_paginate.data;
        store.state.news_page.news_item = data.news_item;
        store.state.social = data.about.social;
      });
  },

  computed: {
    news() {
      return this.$store.state.news_page.news;
    },
    news_item() {
      return this.$store.state.news_page.news_item;
    },
  },
  data() {
    return {
      newsSliderOptions: {
        spaceBetween: 20,
        pagination: false,
        clickable: true,
        preloadImages: true,
        breakpoints: {
          0: {
            slidesPerView: 1.1,
            spaceBetween: 20,
          },
          380: {
            slidesPerView: 1.2,
            spaceBetween: 20,
          },
          414: {
            slidesPerView: 1.3,
            spaceBetween: 20,
          },
          480: {
            slidesPerView: 1.7,
            spaceBetween: 20,
          },
          570: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        },
      },
    };
  },
};
</script>

<style lang="stylus">
.news-item-page {
  &__content {
    padding 170px 30px
  }
  &__title {
    margin-bottom 50px

    .icon {
      transform rotate(180deg)
    }
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
}
</style>
