<template>
  <section class="profile-olympiads">
    <div v-if="!olympiads.length" class="profile-olympiads__empty">
      <span> У вас нет пройденных олимпиад </span>
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
export default {
  components: { IconComponent, FinishedOlympiadsComponent },
  computed: {
    olympiads() {
      return this.$store.state.profile_page.olympiads.filter(
        (item) => item.completed || item.status.code === this.OLYMPIAD_EXPIRED
      );
    },
    OLYMPIAD_EXPIRED() {
      return this.$store.state.OLYMPIAD_EXPIRED;
    },
  },
};
</script>
