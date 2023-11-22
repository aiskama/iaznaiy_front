<template>
  <main class="champion-page">
    <div class="container">
      <div class="champion-page__lessons">
        <router-link v-for="(lesson, i) in lessons" :key="i" class="champion-page__lessons-btn" to="">
          {{ lesson.title }}
        </router-link>
      </div>
      <button class="btn btn--yellow">Лига чемпионов</button>
      <vue-good-table :columns="columns" :rows="rows"> </vue-good-table>
    </div>
  </main>
</template>

<script>
export default {
  name: "champion",
  data() {
    return {
      columns: [
        {
          label: "",
          field: "id",
        },
        {
          label: "ФИО",
          field: "name",
        },
        {
          label: "Пройденные олимпиады",
          field: "olimpiada",
        },
        {
          label: "Общее количество баллов",
          field: "score",
        },
        {
          label: "Рейтинг",
          field: "level",
        },
      ],
      rows: [
        { id: 1, name: "Иванов Иван Иванович", olimpiada: 20, score: 200, level: 100 },
        { id: 1, name: "Алхилаев Абдула Магомедович", olimpiada: 13, score: 1030, level: 4 },
      ],
      lessons: {
        0: { title: "Русский язык" },
        1: { title: "Литература" },
        2: { title: "Математика" },
        3: { title: "Геометрия" },
        4: { title: "Арабский язык" },
        5: { title: "Химия" },
        6: { title: "Биология" },
      },
    };
  },
};
</script>

<style lang="stylus">

.champion-page {
  padding 90px 30px
  margin-top 60px

  &__lessons {
    display: flex;
    gap 30px
    flex-wrap wrap
    margin-bottom 45px

    &-btn {
      color var(--black)
      border 1px solid var(--black)
      border-radius 100px
      display flex
      justify-content center
      padding 15px 40px
    }
  }

  .container {
    display flex
    flex-direction column
    gap 15px
    align-items center
  }
}
</style>
