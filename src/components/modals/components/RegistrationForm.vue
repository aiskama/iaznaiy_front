<template>
  <form @submit.prevent="submit" class="registration-form" :class="{ 'registration-form--token': tempToken }">
    <div class="registration-form__text">
      <b class="registration-form__text-title">Регистрация</b>
      <span class="registration-form__text-subtitle">Для регистрации заполните все поля формы</span>
    </div>
    <div class="registration-form__list">
      <template v-if="tempToken">
        <InputComponent
          v-model.trim="form.code.value"
          :errors="form.code.errors"
          placeholder="Код подтверждения"
        />
      </template>
      <template v-else>
        <div class="registration-form__list-name">
          <div class="registration-form__fio">
            <div class="registration-form__fio-title">ФИО участника</div>
            <InputComponent v-model="form.name.value" :errors="form.name.errors" placeholder="Имя" />
            <InputComponent
              v-model="form.surname.value"
              :errors="form.surname.errors"
              placeholder="Фамилия"
            />
            <InputComponent
              v-model="form.patronymic.value"
              :errors="form.patronymic.errors"
              placeholder="Отчество"
            />
          </div>
          <div class="registration-form__fio">
            <div class="registration-form__fio-title">ФИО родителя</div>
            <InputComponent
              v-model="form.parent_name.value"
              :errors="form.parent_name.errors"
              placeholder="Имя"
            />
            <InputComponent
              v-model="form.parent_surname.value"
              :errors="form.parent_surname.errors"
              placeholder="Фамилия"
            />
            <InputComponent
              v-model="form.parent_patronymic.value"
              :errors="form.parent_patronymic.errors"
              placeholder="Отчество"
            />
          </div>
        </div>
        <div class="registration-form__list-geo">
          <InputComponent v-model="form.region.value" :errors="form.region.errors" placeholder="Регион" />
          <InputComponent v-model="form.school.value" :errors="form.school.errors" placeholder="Школа" />
          <Select
            id="classes"
            v-model="form.class.value"
            :errors="form.class.errors"
            options="classes"
            title="Классы"
            label-name="title"
            id-name="id"
          />
        </div>
        <div class="registration-form__list-contact">
          <InputComponent v-model="form.email.value" :errors="form.email.errors" placeholder="E-mail" />
          <InputComponent
            v-model="form.phone.value"
            :errors="form.phone.errors"
            placeholder="Номер телефона"
            mask="+7 (###)-###-##-##"
          />
        </div>
        <div class="registration-form__list-password">
          <InputComponent
            v-model="form.password.value"
            :errors="form.password.errors"
            placeholder="Пароль"
            :type="form.password.show ? 'text' : 'password'"
            @submit="form.password.show = !form.password.show"
          >
            <template v-slot:action="">
              <IconComponent name="EyeCloseIcon" v-if="form.password.show" />
              <IconComponent name="EyeIcon" v-else />
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
              <IconComponent name="EyeCloseIcon" v-if="form.confirmed_password.show" />
              <IconComponent name="EyeIcon" v-else />
            </template>
          </InputComponent>
        </div>
      </template>
    </div>
    <div class="registration-form__buttons">
      <template v-if="tempToken">
        <button class="btn btn--orange" type="submit" :disabled="loading">
          <LoadingIndicator title="Вход" v-show="loading" />
          <span v-show="!loading">Войти</span>
        </button>
      </template>
      <template v-else>
        <button class="btn btn--orange" type="submit" :disabled="loading">
          <LoadingIndicator title="Регистрация" v-show="loading" />
          <span v-show="!loading">Зарегистрироваться</span>
        </button>
      </template>
      <span class="registration-form__links">Уже зарегистрированы? <a @click="openLoginModal">Войти</a></span>
      <a href="static/files/Язнаю условия использования.pdf" target="_blank" class="registration-form__links"
        >Условия использования</a
      >
    </div>
  </form>
</template>

<script>
import LoadingIndicator from "components/LoadingIndicator.vue";
import LoginModal from "components/modals/components/LoginModal.vue";
import InputComponent from "components/inputs/InputComponent.vue";
import Select from "components/inputs/select/index.vue";
import TRY_AUTH from "@/graphql/mutations/UserTryAuth.graphql";
import POST from "@/graphql/mutations/UserRegister.graphql";
import IconComponent from "components/IconComponent.vue";
export default {
  name: "RegistrationForm",
  components: { IconComponent, InputComponent, Select, LoadingIndicator },
  data() {
    return {
      loading: false,
      tempToken: false,
      tempEmail: null,
      form: {
        code: {
          value: null,
          required: true,
          errors: [],
        },
        name: {
          value: null,
          required: true,
          errors: [],
        },
        surname: {
          value: null,
          required: true,
          errors: [],
        },
        patronymic: {
          value: null,
          required: true,
          errors: [],
        },
        parent_surname: {
          value: null,
          required: true,
          errors: [],
        },
        parent_patronymic: {
          value: null,
          required: true,
          errors: [],
        },
        parent_name: {
          value: null,
          required: true,
          errors: [],
        },
        region: {
          value: null,
          required: true,
          errors: [],
        },
        school: {
          value: null,
          required: true,
          errors: [],
        },
        class: {
          value: [],
          required: true,
          errors: [],
        },
        email: {
          value: null,
          required: true,
          errors: [],
        },
        phone: {
          value: null,
          required: true,
          errors: [],
        },
        password: {
          value: null,
          required: true,
          errors: [],
          show: false,
        },
        confirmed_password: {
          value: null,
          required: true,
          errors: [],
          show: false,
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
    submit() {
      if (!this.tempToken) {
        this.loading = true;
        this.resetErrors();
        this.$apollo
          .mutate({
            mutation: POST,
            variables: {
              name: this.form.name.value,
              surname: this.form.surname.value,
              patronymic: this.form.patronymic.value,
              email: this.form.email.value,
              phone: this.form.phone.value,
              parent_name: this.form.parent_name.value,
              parent_surname: this.form.parent_surname.value,
              parent_patronymic: this.form.parent_patronymic.value,
              region: this.form.region.value,
              school: this.form.school.value,
              class_id: this.form.class.value.id,
              password: this.form.password.value,
              password_confirmation: this.form.confirmed_password.value,
            },
          })
          .then(({ data }) => {
            this.tempEmail = this.form.email.value;
            this.tempToken = data.UserRegister.token;
            this.loading = false;
            this.$notify({
              title: "Готово",
              text: "На почту отправлен код подтверждения",
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
      } else {
        this.loading = true;
        this.resetErrors();
        this.$apollo.provider.defaultClient
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
            this.$emit("close");
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
    openLoginModal() {
      this.$store.state._modals = [];

      this.$store.state._modals.push({
        component: LoginModal,
      });
    },
  },
};
</script>

<style lang="stylus">
.registration-form {
  margin-top: 120vh;
  padding 60px
  width 100%
  max-width 780px
  border-radius 20px
  background-color var(--white)
  z-index 1000
  display flex
  flex-direction column
  gap 40px

  & .select__field::placeholder{
    font-weight: 500;
    font-size: 1em;
    line-height: 26px;
    color: var(--dark);
    opacity: 0.3;
  }

  +below(800px){
    padding 15px
    max-width 354px
    gap 15px
  }

  &__links{
    +below(800px){
      display none
      font-size: 0.875em
    }
  }

  &--token {
    margin-top: 0
  }

  &__fio {
    display flex
    flex-direction column
    gap 20px
    width: 100%;
  }

  &__fio-title {
    text-align center
    font-weight 500
    font-size 1.125em
  }

  & .btn {
    max-width 100%
  }

  &__buttons{
    font-size 1.125em
    font-weight 500
    display flex
    flex-direction column
    gap 15px

    & a {
      cursor pointer
      color var(--black)
      text-decoration underline
    }
    & span{
      display flex
      gap 15px
    }

    .icon {
      width 24px !important
      height 24px !important

      svg path {
        fill var(--white) !important
      }
    }
  }

  &__text {
    display flex
    flex-direction column
    text-align center
    gap 25px

    +below(800px){
      gap 15px
    }

    &-title {
      font-size: 2.500em
      line-height: 47px;

      +below(800px){
        font-size: 1.875em;
        line-height: 35px;
      }
    }
    &-subtitle {
      font-size: 1.500em;
      font-weight 500
      line-height: 28px;

      +below(800px){
        font-size: 0.750em
        line-height: 14px;
      }
    }
  }
  &__list{
    display flex
    flex-direction column
    gap 40px

    +below(800px){
      gap 15px
    }
    &-name{
      display flex
      gap 20px
      width 100%

      +below(800px){
        flex-direction column
      }

      & .input{
        width 100%
      }
    }
    &-geo{
      display flex
      flex-direction column
      gap 20px
    }
    &-contact{
      display flex
      flex-direction column
      gap 20px
    }
    &-password{
      display flex
      flex-direction column
      gap 20px
    }
  }
  .select__container {
    width 100%
    height auto

    .select__field-container {
      width 100%
      height auto
    }
  }
}
</style>
