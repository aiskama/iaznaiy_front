<template>
  <div class="m login-modal">
    <div class="m__header">
      <h1 class="m__title">Вход</h1>
      <span class="m__subtitle">Для авторизации введите свои данные</span>
      <button class="m__close" type="button" @click="$emit('close')">
        <IconComponent category="linear" name="add" />
      </button>
    </div>
    <form class="m__body" @submit.prevent="login">
      <template v-if="tempToken">
        <InputComponent
          v-if="tempToken"
          v-model.trim="form.code.value"
          :errors="form.code.errors"
          placeholder="Код подтверждения"
        />
      </template>
      <template v-else>
        <InputComponent
          v-model.trim="form.email.value"
          :errors="form.email.errors"
          autofocus
          placeholder="E-mail"
          type="email"
        />
        <InputComponent
          v-model.trim="form.password.value"
          :errors="form.password.errors"
          :type="form.password.show ? 'text' : 'password'"
          placeholder="Пароль"
          @submit="form.password.show = !form.password.show"
        >
          <template v-slot:action="">
            <IconComponent name="EyeCloseIcon" v-if="form.password.show" />
            <IconComponent name="EyeIcon" v-else />
          </template>
        </InputComponent>
      </template>
      <div class="m__col">
        <button class="btn btn--orange btn--ld login-modal__btn" type="submit" :disabled="loading">
          <LoadingIndicator title="Вход" v-show="loading" />
          <span v-show="!loading">Войти</span>
        </button>
        <a class="m__link" @click.prevent="recovery">Забыли пароль?</a>
      </div>
      <div class="m__col">
        <span
          >В первый раз на «Я знаю»?<a class="m__link" href="#" @click.prevent="register">
            Регистрация</a
          ></span
        >
      </div>
      <a href="static/files/Язнаю условия использования.pdf" target="_blank" class="m__link"
        >Условия использования</a
      >
    </form>
  </div>
</template>

<script>
import LoadingIndicator from "components/LoadingIndicator.vue";
import IconComponent from "components/IconComponent.vue";
import InputComponent from "components/inputs/InputComponent.vue";
import RegistrationForm from "components/modals/components/RegistrationForm.vue";
import RecoveryModal from "components/modals/components/RecoveryModal.vue";
import TRY_AUTH from "@/graphql/mutations/UserTryAuth.graphql";
import LOGIN from "@/graphql/mutations/UserLogin.graphql";

export default {
  name: "LoginModalComponent",
  data() {
    return {
      tempToken: null,
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
    login() {
      if (!this.loading) {
        this.loading = true;
        this.resetErrors();
        if (this.tempToken) {
          this.$apollo
            .mutate({
              mutation: TRY_AUTH,
              variables: {
                token: this.tempToken,
                email: this.form.email.value,
                code: this.form.code.value,
              },
            })
            .then(({ data }) => {
              if (data && data.UserTryAuth) {
                this.$store.state.user = data.UserTryAuth.user;
                this.$store.state.apollo_token = data.UserTryAuth.token;
                // Сохраняю токен в сессии
                require(["axios"], (axios) => {
                  axios.default({
                    method: "post",
                    url: "/token",
                    data: {
                      token: data.UserTryAuth.token,
                    },
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                });
              }
              this.$notify({
                title: "Готово",
                text: `Вы вошли как ${this.$store.state.user.name} ${this.$store.state.user.surname}`,
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
                text: "Не правильный код",
                duration: 5000,
                speed: 200,
                type: "error",
              });
              this.parseGqlErrors(graphQLErrors);
              this.loading = false;
            });
        } else {
          this.$apollo
            .mutate({
              mutation: LOGIN,
              variables: {
                email: this.form.email.value,
                password: this.form.password.value,
              },
            })
            .then(({ data }) => {
              this.tempToken = data.UserLogin.token;

              this.$notify({
                title: "Готово",
                text: "На почту отправлен код подтверждения",
                duration: 5000,
                speed: 200,
                type: "success",
              });
              this.loading = false;
            })
            .catch(({ graphQLErrors }) => {
              this.$notify({
                title: "Ошибка",
                text: "Попробуйте снова",
                duration: 5000,
                speed: 200,
                type: "error",
              });
              this.parseGqlErrors(graphQLErrors);
              this.loading = false;
            });
        }
      }
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
    register() {
      this.$store.state._modals = [];
      this.$store.state._modals.push({
        component: RegistrationForm,
      });
    },
    recovery() {
      this.$store.state._modals = [];
      this.$store.state._modals.push({
        component: RecoveryModal,
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

.login-modal {
  width: 100%;
  max-width: 780px !important;

  +below(600px){
    max-width 354px

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
