<template>
  <section class="profile-olympiads">
    <div v-if="!olympiads.length" class="profile-olympiads__empty">
      <span> У вас нет купленных олимпиад </span>
      <div class="profile-olympiads__link">
        <router-link :to="{ name: 'catalog' }" class="btn btn--link">
          <span> Все олимпиады </span>
          <IconComponent name="CaretRight" />
        </router-link>
      </div>
    </div>
    <FinishedOlympiadsComponent :olympiads="olympiads" />
  </section>
</template>

<script>
import FinishedOlympiadsComponent from "./components/FinishedOlympiadsComponent.vue";
import IconComponent from "components/IconComponent.vue";
import StartModal from "components/modals/components/StartModal.vue";
export default {
  computed: {
    olympiads() {
      return this.$store.state.profile_page.olympiads.filter(
        (item) =>
          (!item.completed && item.status.code === this.OLYMPIAD_ACTIVE) ||
          item.status.code === this.OLYMPIAD_NOT_STARTED
      );
    },
    OLYMPIAD_ACTIVE() {
      return this.$store.state.OLYMPIAD_ACTIVE;
    },
    OLYMPIAD_NOT_STARTED() {
      return this.$store.state.OLYMPIAD_NOT_STARTED;
    },
  },
  methods: {
    openStartModal(id, title, img, description, price, duration, my_class, subject, tests_count) {
      this.$store.state._modals.push({
        component: StartModal,
        options: {
          data: {
            id,
            title,
            img,
            description,
            price,
            duration,
            my_class,
            subject,
            tests_count,
          },
        },
      });
    },
  },
  components: {
    FinishedOlympiadsComponent,
    IconComponent,
  },
};
</script>

<style lang="stylus">
.profile-olympiads {
  display flex
  flex-direction column
  width 100%
  gap 10px
  padding 0 10px

  +below(1060px) {
    border-left: none;
    padding: 10px 0;
  }
  +below(680px) {
    border-top 0
  }

  &__empty {
    display flex
    justify-content space-between

    > span {
      font-size 1.5em
      font-weight 500
    }
  }
}
</style>
