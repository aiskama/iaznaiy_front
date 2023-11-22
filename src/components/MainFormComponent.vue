<template>
  <form class="main-form" @submit.prevent="submit">
    <div class="main-form__content">
      <div class="main-form__header">
        <h2 class="main-form__title">Узнай первым о старте олимпиад</h2>
        <span class="main-form__description">Подпишись, чтобы не пропустить запуск новых олимпиад</span>
      </div>
      <div class="main-form__body">
        <InputComponent v-model.trim="form.name.value" :errors="form.name.errors" placeholder="Имя" />
        <InputComponent
          v-model.trim="form.email.value"
          :errors="form.email.errors"
          placeholder="Электронная почта"
        />
        <div class="main-form__checkbox">
          <CheckboxComponent v-model="form.checkbox.value">
            <span>
              Соглашаюсь с
              <a href="static/files/Язнаю условия использования.pdf" target="_blank">
                условиями использования
              </a>
            </span>
          </CheckboxComponent>
        </div>
      </div>
      <button
        class="btn main-form__btn"
        :disabled="!form.checkbox.value"
        :class="{ 'btn--gray': !form.checkbox.value, ' btn--orange': form.checkbox.value }"
      >
        <span v-if="!loading">подписаться</span>
        <LoadingIndicator title="подписаться" v-show="loading" />
      </button>
    </div>
    <!--    <div class="main-form__img">-->
    <!--      <ImgComponent src="/static/images/form-img.png" />-->
    <!--    </div>-->
  </form>
</template>

<script>
import InputComponent from "components/inputs/InputComponent.vue";
import CheckboxComponent from "components/inputs/CheckboxComponent.vue";
// import ImgComponent from "components/ImgComponent.vue";
import POST from "../graphql/mutations/ClaimCreate.graphql";
import LoadingIndicator from "components/LoadingIndicator.vue";

export default {
  methods: {
    resetErrors() {
      Object.keys(this.form).forEach((key) => {
        this.form[key].errors = [];
      });
    },
    parseGqlErrors(graphQLErrors) {
      graphQLErrors.forEach((err) => {
        if (err.extensions.category === "validation") {
          Object.keys(err.extensions.validation).forEach((key) => {
            if (this.form[key]) {
              this.form[key].errors.push(err.extensions.validation[key][0]);
            }
          });
        }
      });
    },
    submit() {
      this.loading = true;
      this.resetErrors();
      this.$apollo
        .mutate({
          mutation: POST,
          variables: {
            email: this.form.email.value,
            name: this.form.name.value,
          },
          // context: {
          //   headers: {
          //     Authorization: "Bearer " + this.$store.state.apollo_token,
          //   },
          // },
        })
        .then(() => {
          this.loading = false;
          this.$notify({
            title: "Готово",
            duration: 5000,
            speed: 200,
            type: "success",
          });
        })
        .catch(({ graphQLErrors }) => {
          this.$notify({
            title: "Ошибка",
            duration: 5000,
            speed: 200,
            type: "error",
          });
          this.parseGqlErrors(graphQLErrors);
          this.loading = false;
        });
    },
  },
  data() {
    return {
      loading: false,
      form: {
        name: {
          errors: [],
          messages: [],
          value: null,
        },
        email: {
          errors: [],
          messages: [],
          type: "email",
          value: null,
        },
        checkbox: {
          errors: [],
          message: [],
          value: true,
        },
      },
    };
  },
  components: {
    LoadingIndicator,
    InputComponent,
    CheckboxComponent,
    // ImgComponent,
  },
};
</script>

<style lang="stylus">
.main-form {
  position relative
  width 100%
  padding 80px 30px
  background-image: url(/static/images/form-img.png);
  background-repeat: no-repeat;
  background-position: center right 15%;
  //background-size: auto 80%;
  display flex

  +below(1600px) {
    background-position: center right 5%;
  }
  +below(1060px) {
    background-image none
    padding 60px 30px
  }

  & .input__field{
    line-height 0
  }

  &__content {
    width 100%
    max-width var(--max-width)
    margin 0 auto
  }

  &__header {
    display flex
    flex-direction column
    gap 20px
    margin-bottom 70px

    +below(500px) {
      margin-bottom 30px
    }
  }
  &__description {
    font-weight: 500;
    font-size: 1.5em;

    +below(500px) {
      font-size 1.125em
    }
  }

  &__body {
    display flex
    width 55%
    flex-direction column
    gap 30px
    margin-bottom 30px

    +below(1060px) {
      width 100%
      gap 20px
      margin-bottom 20px
    }
  }
  &__checkbox {

    & .check{
      gap 13px
    }

    & span{
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
    }

    a {
      color var(--black)
      text-decoration underline
    }
  }
  &__img {
    position absolute
    right 0
  }

  &__title {
    font-weight 700
    font-size 2.5em

    +below(500px) {
    font-size 1.875em
    }
  }
  & .btn {

    +below(600px){
      max-width: 100%;
    }
  }
  &__btn:hover{
    .icon{
      svg path {
        fill var(--black)
      }
    }
  }
}
</style>
