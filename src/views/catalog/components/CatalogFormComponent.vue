<template>
  <section class="catalog-form">
    <div class="container">
      <div class="catalog-form__title">Оставьте ваш e-mail, чтобы получить примеры олимпиад</div>
      <form @submit.prevent="submit" class="catalog-form__content">
        <InputComponent
          class="catalog-form__input"
          v-model.trim="form.email.value"
          :errors="form.email.errors"
          placeholder="Электронная почта"
        />
        <CheckboxComponent v-model="form.checkbox.value" class="catalog-form__checkbox">
          <span
            >Соглашаюсь с
            <a href="static/files/Язнаю условия использования.pdf" target="_blank">
              условиями использования
            </a></span
          >
        </CheckboxComponent>
        <button
          class="btn catalog-form__btn"
          :disabled="!form.checkbox.value"
          :class="{ 'btn--gray': !form.checkbox.value, ' btn--orange': form.checkbox.value }"
        >
          <span> подписаться </span>
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import InputComponent from "components/inputs/InputComponent.vue";
import CheckboxComponent from "components/inputs/CheckboxComponent.vue";

export default {
  data() {
    return {
      key: "",
      form: {
        email: {
          errors: [],
          messages: [],
          type: "email",
          value: null,
        },
        checkbox: {
          errors: [],
          message: [],
          value: false,
        },
      },
    };
  },
  methods: {
    submit() {
      console.log("submit");
    },
  },
  components: {
    InputComponent,
    CheckboxComponent,
  },
};
</script>

<style lang="stylus">
.catalog-form {
  padding 80px 30px

  +below(1060px) {
    padding 0 30px 60px 30px
  }

  &__title {
    font-weight 700
    font-size 2.5em
    margin-bottom 50px

    +below(1060px) {
      margin-bottom 20px
      font-size 1.875em
    }
  }

  &__content{
    display flex
    gap 8px
    flex-direction column
  }

  &__input {
    width 100%
    max-width 660px
    margin-bottom 20px

    +below(1060px) {
      max-width 100%
    }
  }
  &__checkbox {
    margin-bottom 20px

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

  &__btn {
    +below(600px){
      max-width 100%
    }
  }
}
</style>
