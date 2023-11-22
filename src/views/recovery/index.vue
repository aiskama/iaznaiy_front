<template>
  <main class="recovery container">
    <div class="recovery__text">
      <h1 class="recovery__title">Введите новый пароль</h1>
      <span class="recovery__subtitle">Придумайте надежный пароль для дальнейшего использования</span>
    </div>
    <form class="recovery__form" @submit.prevent="submit">
      <InputComponent v-model="form.email.value" :errors="form.email.errors" placeholder="E-mail" />
      <InputComponent
        v-model="form.password.value"
        :errors="form.password.errors"
        autofocus
        placeholder="Пароль"
        :type="form.password.show ? 'text' : 'password'"
        @submit="form.password.show = !form.password.show"
      >
        <template v-slot:action="">
          <IconComponent name="EyeIcon" v-if="form.password.show" />
          <IconComponent name="EyeCloseIcon" v-else />
        </template>
      </InputComponent>
      <InputComponent
        v-model="form.confirmed_password.value"
        :errors="form.confirmed_password.errors"
        placeholder="Подтвердите пароль"
        :type="form.confirmed_password.show ? 'text' : 'password'"
        @submit="form.confirmed_password.show = !form.confirmed_password.show"
      >
        <template v-slot:action="">
          <IconComponent name="EyeIcon" v-if="form.confirmed_password.show" />
          <IconComponent name="EyeCloseIcon" v-else />
        </template>
      </InputComponent>
      <button class="btn btn--orange btn--ld" type="submit" :disabled="loading">
        <LoadingIndicator title="Восстановление" v-show="loading" />
        <span v-show="!loading">Восстановить пароль</span>
      </button>
    </form>
  </main>
</template>

<script>
import InputComponent from "components/inputs/InputComponent.vue";
import IconComponent from "components/IconComponent.vue";
import LoginModal from "components/modals/components/LoginModal.vue";
import RESET from "@/graphql/mutations/UserResetPassword.graphql";
import LoadingIndicator from "components/LoadingIndicator.vue";

export default {
  name: "recoveryPassword",
  components: { LoadingIndicator, IconComponent, InputComponent },
  data() {
    return {
      token: null,
      loading: false,
      form: {
        password: {
          value: null,
          errors: [],
          show: false,
        },
        confirmed_password: {
          value: null,
          errors: [],
          show: false,
        },
        email: {
          value: null,
          errors: [],
        },
      },
    };
  },
  mounted() {
    let params = this.parseParams(new URLSearchParams(window.location.search));
    this.token = params.password_reset_token;
  },
  methods: {
    backToLogin() {
      // this.$router.push("/");
      this.$store.state._modals.push({
        component: LoginModal,
      });
    },
    resetErrors() {
      Object.keys(this.form).forEach((key) => {
        this.form[key].errors = [];
      });
    },
    submit() {
      this.loading = true;
      this.resetErrors();
      this.$apollo
        .mutate({
          mutation: RESET,
          variables: {
            token: this.token,
            email: this.form.email.value,
            password: this.form.password.value,
            password_confirmation: this.form.confirmed_password.value,
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
          this.$router.push({ name: "home" });
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
    parseParams(params) {
      let parsedParams = {};
      params.forEach((value, key) => {
        try {
          parsedParams[key] = JSON.parse(value);
        } catch (e) {
          parsedParams[key] = value;
        }
      });
      return parsedParams;
    },
  },
};
</script>

<style lang="stylus">
.recovery{
  display flex
  flex-direction column
  padding: 200px 0
  max-width 660px
  gap 30px

  &__text{
    display flex
    flex-direction column
    justify-content center
    gap 10px
  }

  &__title{
    font-weight: 700;
    font-size: 2.5em;
    color: var(--black);
    text-align center
    margin 0

    +below(650px){
      font-size: 1.875em;
    }
  }

  &__subtitle {
    font-weight 500
    font-size 1.5em
    text-align center

    +below(650px){
      font-size: 0.750em;
    }
  }

  &__form{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__link{
    font-weight: 500;
    font-size: 1.125em
    line-height: 21px;
    text-decoration-line: underline;
    color: var(--black);
    cursor: pointer;
  }
  & .btn{
    max-width 100%
  }
}
</style>
