<template>
  <section class="catalog-list">
    <div class="container">
      <div class="catalog-list__header">
        <h1 class="catalog-list__title">Каталог олимпиад</h1>
        <div class="catalog-list__select">
          <Select
            id="olympiad_categories"
            v-model="subject"
            options="olympiad_categories"
            label-name="title"
            id-name="id"
            title="Все предметы"
            @input="$emit('filterBySubject', subject ? subject.id : null)"
          />
          <Select
            id="classes"
            v-model="myClass"
            options="classes"
            label-name="title"
            id-name="id"
            title="Все классы"
            @input="$emit('filterByClass', myClass ? myClass.id : null)"
          />
        </div>
      </div>
      <div class="catalog-list__content">
        <CatalogCardComponent v-for="item in items" :key="item.id" :data="item" />
      </div>
    </div>
  </section>
</template>

<script>
// import IconComponent from "components/IconComponent.vue";
import CatalogCardComponent from "./CatalogCardComponent.vue";
import Select from "components/inputs/select/index.vue";
import CLASSES from "@/graphql/queries/classes.graphql";
// import OLYMPIAD_CATEGORIES from "@/graphql/queries/olympiad_categories.graphql";
export default {
  name: "CatalogList",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    olympiad_categories: {
      type: Array,
      default: () => {},
    },
  },
  components: {
    Select,
    CatalogCardComponent,
    // IconComponent,
  },
  data() {
    return {
      myClass: null,
      subject: null,
    };
  },
  created() {
    this.$apollo.provider.defaultClient.query({
      query: CLASSES,
    });
    // this.$apollo.provider.defaultClient.query({
    //   query: OLYMPIAD_CATEGORIES,
    // });
  },
  mounted() {
    this.olympiad_categories.forEach((item) => {
      if (parseInt(this.$route.query.subject) === item.id) {
        this.subject = item;
      }
    });
  },
  methods: {
    //   change() {
    //     const params = {
    //       subject: this.subject ? this.subject.id : null,
    //       class: this.myClass ? this.myClass.id : null,
    //     };
    //     this.setUrlParams(params);
    //   },
    //   setUrlParams(params) {
    //     const urlParams = new URLSearchParams();
    //     Object.keys(params).forEach((key) => {
    //       if (params[key]) {
    //         urlParams.set(key, JSON.stringify(params[key]));
    //       }
    //     });
    //     history.pushState({}, null, location.origin + location.pathname + "?" + urlParams.toString());
    //   },
  },
};
</script>

<style lang="stylus">
.catalog-list {
  padding 0 30px
  margin-bottom 50px

  & .container {
    //+below(500px) {
    //  display flex
    //  flex-direction column
    //  align-items center
    //}
  }

  &__header {
    display flex
    justify-content space-between
    align-items flex-end
    margin-bottom 55px

    +below(800px){
      flex-direction column
      gap 30px
    }

    +below(350px) {
      flex-direction column
      gap 25px
      align-items start
    }
  }

  &__title {
    font-weight: 700;
    width 100%
    font-size: 3.75em;
    margin: 0

    +below(1150px) {
      font-size 3em
    }

    +below(950px) {
      font-size 2.5em
    }

    +below(800px) {
      font-size 3em
    }

    +below(600px) {
      font-size 1.875em
    }

    +below(350px) {
      font-size 1.875em
      width 100%
    }
  }

  &__select{
    display flex
    gap 30px
    width 100%
    justify-content flex-end

    +below(800px){
      justify-content flex-start
    }
    +below(414px){
      flex-direction column
      gap 15px
    }
  }

  &__btn {
    padding 0 40px

    //+below(500px) {
    //  padding 15px 20px
    //}
  }

  &__content {
    display grid
    grid-template-columns repeat(2, 1fr)
    grid-gap 30px

    +below(1250px){
      grid-template-columns repeat(3, 1fr)
    }

    +below(1150px){
      grid-template-columns repeat(2, 1fr)
    }

    +below(800px){
      grid-template-columns repeat(1, 1fr)
    }

    //+below(500px) {
    //display flex
    //flex-direction column
    //align-items center
    //}
  }
  &__select {
    & .select {
      background: var(--white);
      border: 1px solid var(--black);

      &__container {
        max-width 200px

        +below(414px){
          width 100%
          max-width 100%
        }
      }


      //&__action{
      //  padding-right: 40px
      //}

      &__field {
        padding: 15px 30px !important;

        &::placeholder {
          color: var(--black);
          opacity 1
          line-height: 1.500em
        }

        +below(500px){
          padding: 15px 22px !important;
        }

      }

      &-list {
        &__container {
          border: 1px solid var(--black);
        }

        &__item:hover {
          background: var(--gray-o5);
        }
      }
    }
  }
}
</style>
