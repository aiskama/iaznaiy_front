<template>
  <section class="profile">
    <div class="profile-info">
      <div class="profile-info__img">
        <ImageCropComponent v-model="profile_image" />
        <div class="profile-info__img-edit">
          <IconComponent name="Pencil" id="input-photo" />
        </div>
      </div>
      <div class="profile-info__text">
        <span class="profile-info__text-name">{{ titleName }}</span>
        <span v-if="user" class="profile-info__text-mail">{{ user ? user.email : null }}</span>
      </div>
    </div>
    <form @submit.prevent="submit" class="profile-form">
      <b class="profile-form-name">Контактная информация</b>
      <div class="profile-form__list-name">
        <div class="profile-form__fio">
          <div class="profile-form__fio-title">ФИО участника</div>
          <InputComponent v-model="form.name.value" :errors="form.name.errors" placeholder="Имя" />
          <InputComponent v-model="form.surname.value" :errors="form.surname.errors" placeholder="Фамилия" />
          <InputComponent
            v-model="form.patronymic.value"
            :errors="form.patronymic.errors"
            placeholder="Отчество"
          />
        </div>
        <div class="profile-form__fio">
          <div class="profile-form__fio-title">ФИО родителя</div>
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
      <InputComponent v-model="form.email.value" :errors="form.email.errors" placeholder="E-mail" />
      <InputComponent
        v-model="form.phone.value"
        :errors="form.phone.errors"
        mask="+7 (###)-###-##-##"
        placeholder="Номер телефона"
      />
      <div class="profile-form__birthday">
        <InputComponent placeholder="День" v-model="form.day.value" :errors="form.day.errors" mask="##" />
        <SelectComponent
          v-model="form.month.value"
          :options="select"
          :errors="form.month.errors"
          placeholder="Месяц"
          label-name="title"
          title="Месяц"
        />
        <InputComponent placeholder="Год" v-model="form.year.value" :errors="form.year.errors" mask="####" />
      </div>
      <button class="btn btn--orange" :disabled="loading">
        <LoadingIndicator title="Сохранение" v-show="loading" />
        <span v-show="!loading">Сохранить изменения</span>
      </button>
    </form>
  </section>
</template>

<script>
import LoadingIndicator from "components/LoadingIndicator.vue";
import POST from "@/graphql/mutations/UserProfileEdit.graphql";
import InputComponent from "components/inputs/InputComponent.vue";
import SelectComponent from "components/inputs/select/index.vue";
import IconComponent from "components/IconComponent.vue";
import ImageCropComponent from "components/ImageCropComponent.vue";
import moment from "moment";
moment.locale("ru");
export default {
  name: "ProfileFormComponent.vue",
  components: { ImageCropComponent, SelectComponent, InputComponent, IconComponent, LoadingIndicator },
  mounted() {
    this.form.name.value = this.user.name;
    this.form.surname.value = this.user.surname;
    this.form.patronymic.value = this.user.patronymic;
    this.form.parent_name.value = this.user.parent_name;
    this.form.parent_surname.value = this.user.parent_surname;
    this.form.parent_patronymic.value = this.user.parent_patronymic;
    this.profile_image = this.user.head_img;
    this.form.email.value = this.user.email;
    this.form.phone.value = this.user.phone;
    this.form.day.value = this.user.birthday ? moment(this.user.birthday).format("DD") : null;
    this.form.year.value = this.user.birthday ? moment(this.user.birthday).format("YYYY") : null;
    this.form.month.value = this.user.birthday
      ? {
          id: moment(this.user.birthday).format("M"),
          title:
            moment(this.user.birthday).format("MMMM").charAt(0).toUpperCase() +
            moment(this.user.birthday).format("MMMM").slice(1),
        }
      : null;
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    titleName() {
      return this.user ? this.user.name + " " + this.user.surname : null;
    },
  },
  data() {
    return {
      loading: false,
      // user: "",
      // test: null,
      profile_image: null,
      birthday: null,
      form: {
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
        parent_name: {
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
        day: {
          value: null,
          required: true,
          errors: [],
        },
        month: {
          value: null,
          required: true,
          errors: [],
        },
        year: {
          value: null,
          required: true,
          errors: [],
        },
      },
      select: [
        { id: 1, title: "Январь" },
        { id: 2, title: "Февраль" },
        { id: 3, title: "Март" },
        { id: 4, title: "Апрель" },
        { id: 5, title: "Май" },
        { id: 6, title: "Июнь" },
        { id: 7, title: "Июль" },
        { id: 8, title: "Август" },
        { id: 9, title: "Сентябрь" },
        { id: 10, title: "Октябрь" },
        { id: 11, title: "Ноябрь" },
        { id: 12, title: "Декабрь" },
      ],
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
              // this.form[key].errors.push(err.extensions.validation[key][0]);
              this.form[key].errors.push("Заполните поле");
            }
          });
        }
      });
    },
    formatBirthday() {
      if (this.form.day.value !== null && this.form.month.value !== null && this.form.year.value !== null) {
        this.birthday =
          this.form.year.value +
          "-" +
          this.form.month.value.id +
          "-" +
          this.form.day.value +
          " " +
          "00:00:00";
      }
    },
    submit() {
      this.loading = true;
      this.resetErrors();
      this.formatBirthday();
      this.$apollo
        .mutate({
          mutation: POST,
          variables: {
            name: this.form.name.value,
            surname: this.form.surname.value,
            patronymic: this.form.patronymic.value,
            phone: this.form.phone.value,
            email: this.form.email.value,
            head_img: this.profile_image,
            parent_surname: this.form.parent_surname.value,
            parent_name: this.form.parent_name.value,
            parent_patronymic: this.form.parent_patronymic.value,
            birthday: this.birthday,
          },
          context: {
            headers: {
              Authorization: "Bearer " + this.$store.state.apollo_token,
            },
          },
        })
        .then(() => {
          this.loading = false;
          this.$notify({
            title: "Готово",
            text: "Данные вашего профиля изменены",
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
};
</script>

<style lang="stylus">
.profile{
  display flex
  flex-direction column
  gap 30px
  padding: 0 10px;

  +below(1060px) {
    border-left: none;
    padding: 10px 0;
  }

  +below(680px) {
    border-top none
  }

  & .input__field{

    +below(680px){
      padding 37px 20px
      font-size: 18px;
      line-height: 21px;
    }

  }

  & .crop {
    width 100%
    height 100%
  }
  & .crop__image{
    border-radius 50%
    object-fit cover
  }
}
.profile-form{
  display flex
  flex-direction column
  gap 30px
  & .select{

    &__container{
      +below(680px) {
        width 100%
      }
    }

    &__field{
      font-weight 500
      +below(680px){
        padding 37px 20px !important
        font-size: 1.125em
        line-height: 21px;
        font-weight 500
      }

      &::placeholder{
        font-weight: 500;
        font-size: 1em;
        line-height: 26px;
        color: var(--dark);
        opacity: 0.3;
      }
    }
  }
  &__fio{
    display flex
    flex-direction column
    gap 20px
    width: 100%;

    &-title{
      text-align center
      font-weight 500
      font-size 1.125em
    }
  }
  &__list {
    display flex
    flex-direction column
    gap 40px
    &-name{
      display flex
      gap 20px
      width 100%

      +below(680px){
        flex-direction column
      }
    }
  }
  &-name{
    font-size: 2.500em
    line-height: 47px;

    +below(680px) {
      font-size 1.875em
      line-height 35px
    }

    +below(414px) {
      font-size 1.475em
      line-height 35px
    }
  }
  &__birthday {
    display grid
    grid-template-columns repeat(3, 1fr)
    gap 30px

    +below(680px){
      gap 30px
      //flex-direction column
    }
  }
  .btn {
    +below(500px) {
      max-width 100%
    }
  }
}
.profile-info{
  display flex
  gap 50px
  align-items center

  +below(500px) {
    flex-direction column
    gap 15px
    align-items flex-start
  }
  &__wrapper{
    //width 120px
    //height 120px
    //border-radius 50%
    //background var(--gray);
    position relative
  }
  &__img{
    width 120px
    height 120px
    border-radius 50%
    background var(--gray);
    position relative
    cursor pointer
    &-edit{
      pointer-events none
      position absolute
      width: 43px
      height: 43px
      background var(--orange)
      border-radius 50%
      border 5px solid var(--white)
      display: flex;
      justify-content center
      align-items center
      top: 0;
      right: 0;
      cursor: pointer;
    }
  }
  &__text{
    display flex
    flex-direction column
    gap 10px

    &-name{
      font-weight 700
      font-size: 2.500em
      line-height: 47px;

      +below(680px) {
        font-size 1.875em
      }
    }
    &-mail{
      font-size: 1.500em
      line-height: 28px;

      +below(680px) {
        font-size 1.125em
      }
    }
  }
}
.cropper{
  //&__buttons{
  //  & .btn{
  //    background: var(--yellow);
  //    //border 1px solid var(--yellow)
  //  }
  //}
  &__footer{
    & .btn{
      background: var(--yellow);
      border-radius: 10px;
      max-width: 220px;
      &--small{
        border 1px solid var(--yellow)
      }
      &:hover{
        border 1px solid var(--yellow)
      }
    }
  }
}
</style>
