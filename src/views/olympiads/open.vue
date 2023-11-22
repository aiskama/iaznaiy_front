<template>
  <main class="olympiad">
    <template v-if="!finished">
      <div class="container olympiad__content">
        <div class="olympiad__header">
          <h2 class="olympiad__title">
            {{ $route.params.subject }} <span>{{ $route.params.class }}</span>
          </h2>
          <span class="olympiad__timer">
            <span v-if="timer.hours && timer.hours > 0">{{ timer.hours }}:</span>
            <span v-if="timer.minutes">{{ timer.minutes }}:</span>
            <span v-if="timer.seconds">{{ timer.seconds }}</span>
          </span>
        </div>
        <div class="olympiad__body" v-if="test">
          <component :is="activeTab.component" v-bind="test" @change="change($event)" />
        </div>
        <div class="olympiad__btn">
          <button class="btn btn--yellow btn--sm" @click="nextTest" v-if="answer">
            <span>Следующий вопрос</span>
            <IconComponent name="Next" />
          </button>
          <button class="btn btn--gray btn--sm" v-else>Выберите вариант ответа</button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="olympiad__finish">
        <FinishOlympiad v-if="finished === true" :data="olympiad" :points="points" />
        <div v-else class="olympiad__not-finish container">
          <div class="olympiad__finish-button">
            <h2>{{ finished }}</h2>
            <router-link :to="{ name: 'catalog' }" class="btn btn--link">
              <span>Перейти в каталог</span>
              <IconComponent name="CaretRight" />
            </router-link>
          </div>
        </div>
      </div>
    </template>
  </main>
</template>

<script>
import CheckboxComponent from "components/inputs/CheckboxComponent.vue";
import CourseCheckboxList from "./components/CourseCheckboxList.vue";
import CourseRadioList from "./components/CourseRadioList.vue";
import CourseTextarea from "./components/CourseTextarea.vue";
import OLYMPIAD_START from "@/graphql/mutations/olympiad/OlympiadStart.graphql";
import TEST_ANSWER from "@/graphql/mutations/olympiad/TestAnswer.graphql";
import IconComponent from "components/IconComponent.vue";
import FinishOlympiad from "./components/FinishOlympiad.vue";

export default {
  beforeMount() {
    // Вешаем событие которое позволяет ловить перезагрузку страницы
    window.addEventListener("beforeunload", this.preventPageReload);
  },
  mounted() {
    this.$apollo.provider.defaultClient
      .mutate({
        mutation: OLYMPIAD_START,
        variables: {
          id: parseInt(this.$route.params.id),
        },
        context: {
          headers: {
            Authorization: "Bearer " + this.$store.state.apollo_token,
          },
        },
      })
      .then(({ data }) => {
        //Получаем тест
        this.test = data.OlympiadStart.test;
        //Получаем код теста
        this.test_type = this.test.type.code;
        //Мутируем ответы теста если это не текстовое поле
        if (this.test_type !== 1) {
          this.test.test_answers = this.test.test_answers.map((item) => {
            return { ...item, checked: false };
          });
        }
        //Выбираем компонент на основе кода
        this.activeTab = this.tabs.find(({ id }) => id === this.test_type);

        //Сохраняем время на прохождение теста

        this.duration = parseInt(data.OlympiadStart.duration) * 60 * 1000;

        /*Запускаем таймер и сохраняем его id для уничтожения при смене страницы
        или завершения времени на прохождение теста */
        this.intervalId = setInterval(this.timerStart, 1000);

        this.$store.state.olympiads_page = data.OlympiadStart.olympiad;
        localStorage.removeItem("olympiad");
      })
      .catch(({ graphQLErrors }) => {
        //Ловим ошибку и останавливем олимпиаду
        this.parseGqlErrors(graphQLErrors);
      });
  },
  beforeDestroy() {
    // Удаляем события которые вешали
    clearInterval(this.intervalId);
    window.removeEventListener("beforeunload", this.preventPageReload);
  },
  methods: {
    // Функция которая предотвращает перезагрузку страницы если тесты еще не завершены
    preventPageReload(event) {
      if (this.finished) return;
      event.preventDefault();
      event.returnValue = "";
    },
    // Таймер
    timerStart() {
      if (this.duration <= 0) {
        this.finished = "Время на проходжение олимпиады истекло, результат вы можете посмотреть в профиле";
        clearInterval(this.intervalId);
      }

      this.timer.hours = this.duration > 0 ? Math.floor(this.duration / 1000 / 60 / 60) % 24 : 0;
      this.timer.minutes = this.duration > 0 ? Math.floor(this.duration / 1000 / 60) % 60 : 0;
      this.timer.seconds = this.duration > 0 ? Math.floor(this.duration / 1000) % 60 : 0;

      this.timer.hours = this.timer.hours < 10 ? "0" + this.timer.hours : this.timer.hours;
      this.timer.minutes = this.timer.minutes < 10 ? "0" + this.timer.minutes : this.timer.minutes;
      this.timer.seconds = this.timer.seconds < 10 ? "0" + this.timer.seconds : this.timer.seconds;

      this.duration -= 1000;
    },
    // Получаем следущий тест
    nextTest() {
      let variables = {
        test_id: this.test.id,
      };

      if (this.test_type !== 1) {
        variables = { ...variables, answer_id: this.answer };
      } else {
        variables = { ...variables, answer: this.answer };
      }

      this.$apollo.provider.defaultClient
        .mutate({
          mutation: TEST_ANSWER,
          variables,
          context: {
            headers: {
              Authorization: "Bearer " + this.$store.state.apollo_token,
            },
          },
        })
        .then(({ data }) => {
          window.scrollTo(0, 0);
          // Проверяем есть ли тест
          if (data.TestAnswer.test) {
            //Получаем тест
            this.test = data.TestAnswer.test;
            //Получаем код теста
            this.test_type = this.test.type.code;
            //Мутируем ответы теста если это не текстовое поле
            if (this.test_type !== 1) {
              this.test.test_answers = this.test.test_answers.map((item) => {
                return { ...item, checked: false };
              });
            }
            //Выбираем компонент на основе кода
            this.activeTab = this.tabs.find(({ id }) => id === this.test_type);
          }
          this.finished = data.TestAnswer.finished;
          this.points = data.TestAnswer.points;
          this.answer = null;
        })
        .catch(() => {});
      //логика отправки на сервер ответа на вопрос
    },
    change(event) {
      //сохраняем обновленные вопросы с выбранными вариантами
      this.test.test_answers = event;
      //проверяем тип теста и в зависимости от него показываем компонент
      if (this.test_type !== 1) {
        //если тип теста не текст то проверяем есть ли среди чекбоксов выбранные
        let selectedAnswers = event.filter((item) => item.checked);

        if (selectedAnswers.length) {
          //если есть выьранные ответы то возвращаем новый массив с выбранными ответами
          this.answer = event.filter((item) => item.checked).map((item) => item.id);
        } else {
          //если нет выбранных ответов то сохраняем null и блокируем возможность делать запрос на получение следующего теста
          this.answer = null;
        }
      } else {
        this.answer = event;
      }
    },
    parseGqlErrors(graphQLErrors) {
      graphQLErrors.forEach((err) => {
        if (err.extensions.category === "validation") {
          Object.keys(err.extensions.validation).forEach((key) => {
            this.finished = err.extensions.validation[key][0];
          });
        }
      });
    },
  },
  computed: {
    olympiad() {
      return this.$store.state.olympiads_page;
    },
  },
  data() {
    return {
      intervalId: null,
      timer: {
        hours: null,
        minutes: null,
        seconds: null,
      },
      activeTab: "",
      duration: 60,
      test_type: null,

      test: null,
      finished: null,
      points: null,
      answer: null,
      tabs: [
        {
          id: 1,
          component: "course-textarea",
        },
        {
          id: 2,
          component: "course-radio-list",
        },
        {
          id: 3,
          component: "course-checkbox-list",
        },
      ],
    };
  },
  // Ловим переход на другой роут
  beforeRouteLeave(to, from, next) {
    // если олимпиада завершена
    if (this.finished || this.finished === true) {
      next(true);
    } else {
      const answer = window.confirm(
        "Вы хотите уйти? Если вы не завершили олимпиаду она завершится при переходе!"
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    }
  },
  components: {
    FinishOlympiad,
    IconComponent,
    CheckboxComponent,
    CourseCheckboxList,
    CourseRadioList,
    CourseTextarea,
  },
};
</script>

<style lang="stylus">
.olympiad {

  +below(600px){
    margin-top: 110px;
  }

  &__title{
    font-weight: 400;
    font-size: 24px;
    line-height: 45px;
    width: 100%;
    text-align: center;
    position: absolute;
    display flex
    justify-content center
    gap 20px

    +below(800px){
      position: static;
      text-align start
    }

    & > span{
      font-weight: 500;
    }
  }

  &__content {
    padding 0 30px
    margin-top 150px
    display flex
    flex-direction column
    width 100%
    height 100%
    min-height 50vh
    position: relative;
  }

  &__header {
    display flex
    align-content center
    margin-bottom 100px
    justify-content end

    +below(800px){
      margin-bottom: 50px
    }

    +below(500px){
      flex-direction column
    }
  }
  &__timer {
    display flex
    align-items center
    font-weight 700
    font-size: 60px;
    line-height: 71px;
  }
  &__btn {
    display flex
    justify-content: flex-end;
    width 100%
    padding-top: 100px;
    padding-bottom 90px

    +below(600px){
      padding-top: 35px
    }

    +below(380px){
      font-size: 1em
    }

    button {
      max-width 300px
      padding 0 20px
      align-self flex-end
      justify-self flex-end

      +below(600px){
        max-width 100%
      }
    }
  }
  &__finish{
    min-height 100vh
  }
  &__not-finish{
    padding: 200px 0
  }
  &__finish-button{
    display flex
    justify-content space-between
    width 100%

    & .btn{
      max-width fit-content
    }
  }
}
</style>
