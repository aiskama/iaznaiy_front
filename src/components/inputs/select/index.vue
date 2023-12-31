<template>
  <div class="select__container">
    <span v-if="selectTitle" class="select__title">{{ selectTitle }}</span>
    <div
      v-click-outside="blurInput"
      :class="{
        'select--input': focusInput === true,
        'select--multiple': multiple,
        'select--loading': loading,
        'select--error': errors.length,
        'select--list': dropdownState === dropdownStates.BOTTOM,
        'select--list-top': dropdownState === dropdownStates.TOP,
        'select--no-title': !title,
      }"
      class="select"
    >
      <span
        v-if="multiple && selectedOptions && selectedOptions.length"
        v-show="!loading"
        class="select__selected"
      >
        <a class="select__selected-item" href="#" @click.prevent="select(selectedOptions[0])">
          <span>{{ cutString(getName(selectedOptions[0]), 12) }}</span>
          <IconComponent name="close-line" />
        </a>
        <a
          v-if="selectedOptions.length > 1"
          class="select__selected-item"
          href="#"
          @click.prevent="$refs.input.focus()"
        >
          <span>...</span>
        </a>
      </span>
      <div v-show="!loading" class="select__field-container">
        <input
          ref="input"
          v-model="search"
          :placeholder="title"
          class="select__field"
          @focus="handleInputFocus"
          :readonly="!searchable"
        />
      </div>
      <button
        v-if="!multiple && search.length && clearable"
        v-show="!loading"
        class="select__clear"
        type="button"
        @click="clean"
      >
        <IconComponent name="close" />
      </button>
      <button v-show="!loading" class="select__action" tabindex="-1" type="button" @click="toggle">
        <IconComponent name="CaretDown" />
      </button>
      <SelectListComponent
        v-show="!loading && dropdownState !== dropdownStates.CLOSED"
        ref="list"
        :clearable="clearable"
        :labelName="labelName"
        :multiple="multiple"
        :options="filteredOptions"
        :selected="selectedOptions ? selectedOptions : value"
        @clean="clean"
        @select="select"
      />
    </div>
    <ul v-if="errors && errors.length" class="select__errors">
      <li v-for="(e, i) in errors" :key="i">{{ e }}</li>
    </ul>
    <ul v-if="messages && messages.length" class="select__errors select__errors--messages">
      <li v-for="(m, i) in messages" :key="i">{{ m }}</li>
    </ul>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import SelectListComponent from "./components/SelectListComponent.vue";
import IconComponent from "@/components/IconComponent.vue";

export default {
  name: "SelectComponent",
  props: {
    selectTitle: {
      type: String,
      default: () => "",
    },
    title: {
      type: String,
      default() {
        return null;
      },
    },
    idName: {
      type: String,
      default() {
        return "id";
      },
    },
    labelName: {
      type: String,
      default() {
        return "name";
      },
    },
    clearable: {
      type: Boolean,
      default() {
        return true;
      },
    },
    options: [String, Array],
    loading: Boolean,
    multiple: Boolean,
    dark: Boolean,
    errors: {
      type: Array,
      default() {
        return [];
      },
    },
    searchable: {
      type: Boolean,
      default: () => true,
    },
    messages: {
      type: Array,
      default() {
        return [];
      },
    },
    value: [Number, String, Array, Object],
  },
  data() {
    return {
      localOptions: [],
      selected: [],
      search: "",
      listTop: false,
      scrollTimeout: undefined,
      sbOptions: {
        minScrollbarLength: 20,
      },
      dropdownStates: {
        CLOSED: 0,
        TOP: 1,
        BOTTOM: 2,
      },
      dropdownState: null,
      focusInput: null,
    };
  },
  computed: {
    selectedOptions() {
      if (this.value && this.value instanceof Array) {
        // Сделано так чтобы сохранять последовательность выбора
        return this.value
          .map((v) => {
            const option = this.localOptions.find((o) => JSON.stringify(o) === JSON.stringify(v));
            if (option) {
              return option;
            }
            return false;
          })
          .filter((v) => v)
          .reverse();
        // return this.options.filter((o) => this.value.includes(o.id));
      }
      return false;
    },
    filteredOptions() {
      return this.localOptions.filter((o) =>
        this.getName(o).toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  watch: {
    value(v) {
      if (!this.multiple) {
        this.select(v);
      }
    },
    loading(state) {
      if (!state) {
        this.initOptions();
      }
    },
  },
  created() {
    // Изначальное значение выпадаюшего списка
    this.dropdownState = this.dropdownStates.CLOSED;
    if (!this.loading) {
      this.initOptions();
    }
  },
  mounted() {
    this.showInSearch();
    // Положение выпадающего списка реагирует на скролл страницы
    window.addEventListener("scroll", () => {
      if (this.dropdownState !== this.dropdownStates.CLOSED) {
        this.openDrop();
      }
    });
  },
  beforeDestroy() {
    // Удаляю слушатель скролла страницы при уничтожении элемента
    window.removeEventListener("scroll", () => {});
  },
  methods: {
    initOptions() {
      if (typeof this.options === "string") {
        import(`@/graphql/queries/${this.options}.graphql`).then((OPTIONS) => {
          this.$apollo
            .query({
              query: OPTIONS,
              context: {
                headers: {
                  locale: this.$store.state.locale,
                },
              },
            })
            .then(({ data }) => {
              let dataKey = Object.keys(data)[0];
              this.localOptions = data[dataKey].map((d) => {
                let object = {};
                object[this.idName] = d[this.idName];
                object[this.labelName] = d[this.labelName];
                return object;
              });
            })
            .catch(() => {
              console.log('Ошибка при загрузке опций выпадающего списка "' + this.title + '"');
            });
        });
      } else {
        this.localOptions = this.options;
      }
    },
    showInSearch() {
      if (this.value !== null && !this.multiple) {
        const option = this.localOptions.find((o) => JSON.stringify(o) === JSON.stringify(this.value));
        if (option) {
          this.search = this.getName(option) || "";
        }
      }
    },
    handleInputFocus() {
      this.focusInput = true;
      this.search = "";
      this.openDrop();
    },
    blurInput() {
      this.showInSearch();
      if (this.multiple) {
        this.search = "";
        this.$refs.input.blur();
        this.focusInput = false;
        this.closeDrop();
      } else {
        this.$refs.input.blur();
        if (!this.value) {
          this.search = "";
        }
        this.focusInput = false;
        this.closeDrop();
      }
    },
    toggle() {
      // Переключение состояния Input
      if (this.focusInput !== false) {
        this.blurInput();
      } else {
        this.$refs.input.focus();
      }
    },
    openDrop() {
      if (this.$refs.input) {
        const height = 200; // Минимум пространства
        const bottom = this.$refs.input.getBoundingClientRect().bottom;
        if (bottom + height > window.innerHeight) {
          this.dropdownState = this.dropdownStates.TOP;
          return;
        }
        this.dropdownState = this.dropdownStates.BOTTOM;
      }
    },
    closeDrop() {
      this.dropdownState = this.dropdownStates.CLOSED;
    },
    /**
     * Обработка события выбора в списке
     */
    select(e) {
      // Если несколько элементов
      if (this.multiple) {
        // Фокусируюсь обратно на поле поиска
        this.$refs.input.focus();
        // Открепляю от реактивного массива уже выбранных value
        let value = JSON.parse(JSON.stringify(this.value || [])).map((v) => JSON.stringify(v));
        // Если уже выбран - удаляю
        // иначе заношу в конец массива выбранных
        if (value.includes(JSON.stringify(e))) {
          value.splice(value.indexOf(JSON.stringify(e)), 1);
        } else {
          value.push(JSON.stringify(e));
        }
        this.$emit(
          "input",
          // Не превращенные в string JSON объекты превращаю обратно
          // и делаю массив полностью из json
          value.map((v) => {
            if (typeof v === "string") {
              return JSON.parse(v);
            }
            return v;
          })
        );
        return;
      }
      // Если один элемент
      // Вставляю в Input label выбранного объекта
      this.search = e ? this.getName(e) : "";
      // Сравниваю 2 stringify JSON строки
      // если не равна уже выбранной
      // если выбрано "развибирать нельзя"
      // повторяю поведение обычного select
      if (JSON.stringify(this.value) !== JSON.stringify(e)) {
        this.$emit("input", e);
      }
      // Закрываю выпадающий список
      this.blurInput();
    },
    /**
     * Получение label объекта
     * @param option
     * @returns {*}
     */
    getName(option) {
      if (this.labelName) {
        return option[this.labelName];
      }
      return option;
    },
    cutString(string, size) {
      return string.substr(0, size).trim() + (string.length > size ? ".." : "");
    },
    clean() {
      if (this.multiple) {
        this.$emit("input", []);
        return;
      }
      this.$emit("input", null);
      this.search = "";
    },
  },
  components: {
    IconComponent,
    SelectListComponent,
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style lang="stylus">
@keyframes stripped {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 31px 62px;
  }
}

.select {
  background: var(--beige);
  border: 1px solid var(--yellow)
  box-sizing: border-box;
  position relative
  cursor text
  height auto
  border-radius 6px

  transition var(--transition)
  display flex
  margin 0

  &:focus-within {

    ::placeholder {
      color var(--orange)
    }
  }

  &--error {
    border-color var(--red-500)
  }

  &__errors {
    font-size: 0.750em;
    line-height: 15px;
    color: var(--red-500);
    display flex
    flex-direction column
    gap 5px

    &--messages {
      color: var(--body-color-muted);
    }
  }

  &__container {
    display flex
    flex-direction column
    align-self flex-start
    gap 5px
  }

  &__title {
    font-weight: normal;
    font-size: 1.125em;
    line-height: 20px;
    color: var(--body-color-muted);
    white-space pre-line
  }

  &__field {
    border-radius var(--small_radius)
    border none
    box-sizing border-box
    background none
    width 100%
    height 100%
    padding: 27.5px 40px !important;
    outline none
    font-weight: normal;
    font-size: 1.125em;
    color: var(--black);
    appearance none
    resize vertical
    z-index 1
    line-height 26px

    &::placeholder {
      font-weight: normal;
    }
  }

  &--loading {
    background-color var(--accent-o1);
    background-size: 31px 31px;
    background-image: linear-gradient(-45deg, rgba(0, 0, 0, .1) 25%, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, .1) 0, rgba(0, 0, 0, .1) 75%, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0));
    animation: stripped 2s linear 0s infinite normal none running;
  }

  &--no-title {
    & ^[0]__field {
      padding: 25px 40px;
    }
  }

  &--list {
    border-radius var(--small_radius) var(--small_radius) 0 0

    & ^[0]__action {
      z-index 11

      .icon {
        transform rotate(180deg)
      }
    }

    & ^[0]__clear {
      z-index 12
    }
  }

  &--list-top {
    border-radius 0 0 var(--small_radius) var(--small_radius)

    & ^[0]__action {
      z-index 11

      .icon {
        transform rotate(180deg)
      }
    }

    & ^[0]__list {
      border-radius var(--small_radius) var(--small_radius) 0 0
      absolute top left
      bottom initial
      transform translateY(calc(-100% + 1px))
    }

    & ^[0]__clear {
      z-index 12
    }
  }

  &__action {
    background none
    outline none
    border none
    cursor pointer
    padding 10px
    absolute right top bottom
    margin auto
    transition .2s
    z-index 2
    display: flex;
    align-items: center;

    &:active
    &:focus {
      box-shadow: 0 0 0 2px var(--accent);
      border-radius: var(--small_radius);
    }

    .icon {
      transition .2s
      width 20px
      height 20px

      svg path {
        fill var(--dark-light)
        stroke none
      }
    }
  }

  &__clear {
    @extend .select__action
    transform translateX(-50%)
    z-index 3
  }

  &__field {
    padding 15px 12px
    z-index 1

    &-container {
      position relative
      width 100%
    }
  }

  &__selected {
    display flex
    gap 4px
    align-items center
    margin-left 12px
    flex-shrink: 0;
    +below(480px) {
      display none
    }

    .icon {
      width 12px
      height 12px
      display flex
      align-items center
      justify-content center

      svg {
        width 100%
        height 100%
      }
    }

    &-item {
      cursor pointer
      background var(--accent)
      border-radius var(--small_radius)
      padding 6px 12px
      font-size: 0.8750em;
      line-height: 16px;
      text-align: center;
      color: var(--white);
      text-decoration none
      flex-shrink: 0;

      &:hover {
        color var(--white)
      }

      &:active
      &:focus {
        box-shadow: 0 0 0 4px var(--accent);
      }

      &:first-child {
        display flex
        gap 4px
        align-items center

        span {
          display flex
        }

        .icon {
          width 14px
          height 14px

          svg {
            width: 100%;
            height 100%
            svg(var(--white))
          }
        }
      }
    }
  }

  &--multiple {
    display flex
    align-items center
    padding-right 40px
  }
}
</style>
