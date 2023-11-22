<template>
  <main class="profile-page">
    <div class="container">
      <ul class="profile-page__tabs">
        <li
          v-for="(item, i) in tabs"
          :key="i"
          :class="{ 'profile-page__tab--active': activeTab === i }"
          @click="activeTab = i"
        >
          <span>{{ item.title }}</span>
        </li>
      </ul>
      <component :is="tabs[activeTab].component" />
    </div>
  </main>
</template>

<script>
import PAGE from "@/graphql/page/profile_page.graphql";
import ProfileEditFormComponent from "./components/ProfileEditFormComponent.vue";
import HistoryOlympiadsComponent from "./components/HistoryOlympiadsComponent.vue";
import ProfileOlympiadsComponent from "./components/ProfileOlympiadsComponent.vue";

export default {
  async asyncData({ apollo, store }) {
    await apollo.defaultClient
      .query({
        query: PAGE,
        context: {
          headers: {
            Authorization: "Bearer " + store.state.apollo_token,
          },
        },
      })
      .then(({ data }) => {
        store.state.profile_page.olympiads = data.my_olympiads;
        store.state.social = data.about.social;
      });
  },
  name: "profile-page",
  mounted() {
    this.activeTab = parseInt(this.$route.params.id) - 1;
  },
  components: {
    ProfileEditFormComponent,
    HistoryOlympiadsComponent,
    ProfileOlympiadsComponent,
  },
  data() {
    return {
      tabs: [
        {
          title: "Мои данные",
          component: "profile-edit-form-component",
        },

        {
          title: "Мои олимпиады",
          component: "profile-olympiads-component",
        },
        {
          title: "История олимпиад",
          component: "history-olympiads-component",
        },
        // {
        //   title: "Избранные олимпиады",
        //   component: "selected-olympyads-component",
        // },
      ],
      activeTab: 0,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="stylus">
.profile-page {
  padding 130px 30px

  & .container {
    display flex
    position relative
    width 100%;
    max-width: var(--max-width);
    gap 80px
    margin: 0 auto
  }

  &__tabs {
    width 100%
    max-width 294px
    display: flex;
    flex-direction: column;
    gap: 6px
    height: 250px;
    position: sticky;
    top: 130px;
    left: 0;
    z-index 10

    li {
      display flex
      align-items center
      justify-content center
      cursor pointer
      padding 25px 40px
      background-color var(--gray)
      color var(--white)
      border-radius 6px
      transition var(--transition)

      span {
        font-size 1.5em
        font-weight 500
      }
    }
    +below(1060px) {
      display none
    }
  }

  &__tab--active {
    background-color var(--yellow) !important
    color var(--black) !important
  }

  &__content {
    display flex
  }
  &__menu {
    width 100%
    max-width 220px
  }
}
</style>
