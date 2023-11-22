<template>
  <div class="input">
    <label
      :class="{
        'input--error': errors.length,
        'input--focus': focused,
        'input--action': $slots.action,
      }"
      class="input__label"
    >
      <span class="input__title" v-if="title">
        {{ title }}
        <span>{{ required ? "*" : "" }}</span>
      </span>
      <span class="input__container">
        <input
          ref="input"
          v-mask="mask"
          :autofocus="autofocus"
          :max="max"
          :min="min"
          :type="type"
          :value="value"
          :disabled="disabled"
          :placeholder="placeholder"
          autocomplete="new-password"
          class="input__field"
          :id="id"
          @blur="blur"
          @click="$emit('click')"
          @focus="focus"
          @input="$emit('input', $event.target.value)"
          :required="required"
        />
        <button v-if="$slots.action" class="input__action" type="button" @click.prevent="$emit('submit')">
          <slot name="action" />
        </button>
      </span>
    </label>
    <div v-if="errors && errors.length" class="input__errors">
      <pre v-for="(e, i) in errors" :key="i">{{ e }}</pre>
    </div>
    <div v-if="messages && messages.length" class="input__messages">
      <pre v-for="(m, i) in messages" :key="i">{{ m }}</pre>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import { VueMaskDirective } from "v-mask";

export default {
  name: "InputComponent",
  props: {
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    placeholder: {
      type: String,
      default() {
        return "";
      },
    },
    type: {
      type: String,
      default() {
        return "text";
      },
    },
    errors: {
      type: Array,
      default() {
        return [];
      },
    },
    messages: {
      type: Array,
      default() {
        return [];
      },
    },
    value: [String, Number],
    mask: String,
    min: Number,
    max: Number,
    disabled: Boolean,
    autofocus: Boolean,
    required: Boolean,
  },
  data() {
    return {
      focused: false,
    };
  },
  computed: {
    notEmpty() {
      if (typeof this.value === "string") {
        return this.value && this.value.length;
      }
      return this.value !== null;
    },
  },
  methods: {
    focus() {
      if (!this.focused) {
        this.focused = true;
      }
      this.$emit("focus");
    },
    blur() {
      if (this.focused) {
        this.focused = false;
      }
      this.$emit("blur");
    },
  },
  directives: {
    mask: VueMaskDirective,
  },
};
</script>

<style lang="stylus">
.input {
  display grid
  grid-gap 5px

  &__label {
    display grid
    grid-gap 5px
    position relative
  }

  &__container {
    display flex
    align-items center
    background: var(--beige);
    border: 1px solid var(--yellow);
    border-radius: 5px;

    ^[0]--focus & {
      border: 1px solid var(--yellow);
      box-shadow: 0 0 0 3px var(--yellow-o7);
    }

    ^[0]--error & {
      border: 1px solid var(--red);
      box-shadow: 0 0 0 3px var(--red-o15);
    }
  }

  &__title {
    font-weight: 500;
    font-size: 0.75em;
    line-height: 14px;
    color: var(--dark-light);

    span {
      color: var(--red);
    }
  }

  &__action {
    padding 15px
    background none
    border-radius 5px
    display inline-flex
    align-items center
    justify-content center
    border 1px solid transparent

    &:focus {
      border-color var(--main)
      box-shadow: 0 0 0 3px var(--main-o15);
    }

    > .icon {
      width 20px
      height: 20px;

      svg path {
        fill var(--dark)
      }
    }
  }

  &__field {
    border-radius: 5px;
    padding 25px 40px
    outline none
    border none
    background none
    width 100%
    font-family var(--font-regular)
    font-weight: 500;
    font-size: 1.125em;
    line-height: 26px;
    color: var(--dark);

    ^[0]--action & {
      //padding-left 0
    }

    &::placeholder {
      font-weight: 500;
      font-size: 1em;
      line-height: 26px;
      color: var(--dark);
      opacity: 0.3;
    }

    &::-ms-input-placeholder {
      font-weight: 500;
      font-size: 1em;
      line-height: 26px;
      color: var(--dark);
      opacity: 0.3;
    }

  }

  &__messages,
  &__errors {
    font-weight: 500;
    font-size: 0.75em;
    line-height: 14px;
    display grid
    grid-gap 5px
  }

  &__messages {
    color var(--dark-light)
  }

  &__errors {
    color var(--red)
  }
}
</style>
