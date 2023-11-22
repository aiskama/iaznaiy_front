<template>
  <div class="m recovery-modal">
    <div class="m__header">
      <h1 class="m__title">Забыли пароль?</h1>
      <span class="m__subtitle"
        >Введите e-mail, который вы используете на “Я знаю!”. Мы вышлем на него ссылку на восстановления
        пароля</span
      >
      <button class="m__close" type="button" @click="$emit('close')">
        <IconComponent category="linear" name="add" />
      </button>
    </div>
    <form class="m__body" @submit.prevent="submit">
      <template>
        <InputComponent
          v-model.trim="form.email.value"
          :errors="form.email.errors"
          autofocus
          placeholder="E-mail"
          type="email"
        />
      </template>
      <div class="m__col">
        <button class="btn btn--orange btn--ld login-modal__btn" type="submit" :disabled="loading">
          <LoadingIndicator title="Восстановление" v-show="loading" />
          <span v-show="!loading">Восстановить пароль</span>
        </button>
        <a href="#" class="m__link" @click="backToLogin">Вернуться к авторизации</a>
      </div>
    </form>
  </div>
</template>

<script>
import LoadingIndicator from "components/LoadingIndicator.vue";
import IconComponent from "components/IconComponent.vue";
import InputComponent from "components/inputs/InputComponent.vue";
import FORGOT from "@/graphql/mutations/UserForgotPassword.graphql";
import LoginModal from "components/modals/components/LoginModal.vue";

export default {
  name: "LoginModalComponent",
  data() {
    return {
      loading: false,
      form: {
        email: {
          errors: [],
          value: null,
        },
        password: {
          show: false,
          errors: [],
          value: null,
        },
        code: {
          errors: [],
          value: null,
        },
      },
    };
  },
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
          mutation: FORGOT,
          variables: {
            email: this.form.email.value,
          },
        })
        .then(() => {
          this.$notify({
            title: "Готово",
            duration: 5000,
            speed: 200,
            type: "success",
          });
          this.loading = false;
          this.$store.state._modals = [];
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
    backToLogin() {
      this.$store.state._modals = [];
      this.$store.state._modals.push({
        component: LoginModal,
      });
    },
  },
  components: {
    InputComponent,
    IconComponent,
    LoadingIndicator,
  },
};
</script>

<style lang="stylus">
@import "~@/styles/components/modal.styl"

.recovery-modal {
  width: 100%;
  max-width: 780px !important;

  +below(600px){
    max-width 354px !important

  }

  &__btn {
    width: 100% !important;
    max-width: 100% !important;

    .icon {
      width 24px !important
      height 24px !important

      svg path {
        fill var(--white) !important
      }
    }
  }
}
</style>
