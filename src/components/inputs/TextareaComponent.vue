<template>
  <label
    class="textarea"
    :class="{
      'textarea--filled': !!value,
      'textarea--error': error.length,
      'textarea--icon-left': iconPosition === 'left',
      'textarea--icon-right': iconPosition === 'right',
    }"
  >
    <span class="textarea__title">{{ title }}</span>
    <span class="textarea__container">
      <button class="textarea__action" type="button" v-if="iconPosition" @click="$emit('action')">
        <slot name="icon">
          <IconComponent name="search" />
        </slot>
      </button>
      <textarea
        v-mask="mask"
        :placeholder="placeholder"
        class="textarea__field"
        ref="textarea"
        :value="value"
        @input="handleInput"
        @blur="$emit('blur', $event)"
      />
    </span>
    <span v-if="subtitle" class="textarea__subtitle">{{ subtitle }}</span>
    <ul v-if="error && error.length" class="textarea__error">
      <li v-for="(e, i) in error" :key="i">{{ e }}</li>
    </ul>
    <!-- <span v-if="error" class="textarea__error">{{ error }}</span> -->
  </label>
</template>
<script>
import IconComponent from "components/IconComponent.vue";
import { VueMaskDirective } from "v-mask";

export default {
  name: "TextareaComponent",
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    mask: {
      type: String,
    },
    type: {
      type: String,
      default() {
        return "text";
      },
    },
    placeholder: {
      type: [String, Number],
    },
    min: Number,
    max: Number,
    value: {
      type: [String, Number],
    },
    error: {
      type: Array,
      default() {
        return [];
      },
    },
    iconPosition: {
      type: String,
      validator(value) {
        return value === "left" || value === "right";
      },
    },
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
  },
  components: { IconComponent },
  directives: {
    mask: VueMaskDirective,
  },
};
</script>

<style lang="stylus">
.textarea {
  display inline-flex
  flex-direction column
  gap 4px

  &__container {
    display flex
    position relative
    background: var(--white);
    border: 2px solid var(--gray-dark);
    border-top none
    border-left none
    border-right none
    box-sizing: border-box;
    border-radius: var(--small_radius);
    height auto
    transition var(--transition)
  }

  &:focus-within {
    & ^[0]__container {
      border-color var(--orange)
    }

    ::placeholder {
      color var(--orange)
    }

    & .icon svg path {
      fill var(--orange)
      stroke none
    }
  }

  &--filled:not(:focus-within) {
    & ^[0]__container {
      border-color var(--gray-dark)
    }

    & .icon svg path {
      fill var(--body-color-muted)
    }
  }

  &--error& {
    & ^[0]__container {
      border-color var(--red-500)
    }

    & .icon svg path {
      fill var(--red-500)
    }

    &__field {
      color: var(--red-500);

      &::placeholder {
        color: var(--red-50);
      }
    }
  }

  &--focused {
    & ^[0]__container {
      border-color var(--orange)
    }
  }

  &--error {
    & ^[0]__container {
      border-color var(--red-500)
    }
  }

  &--icon-left &__action {
    absolute left
    top: -10px
  }

  &--icon-left &__field {
    padding 12px 16px 12px 44px
  }

  &--icon-right &__action {
    absolute right top
  }

  &--icon-right &__field {
    padding 12px 44px 12px 16px
  }

  &__title {
    font-weight: normal;
    font-size: 0.875em;
    line-height: 20px;
    color: var(--body-color-muted);
  }

  &__subtitle {
    font-weight: normal;
    font-size: 0.75em;
    line-height: 20px;
    color: var(--gray-50);
  }

  &__error {
    font-weight: normal;
    font-size: 0.75em;
    line-height: 20px;
    color: var(--red-500);
  }

  &__action {
    background none
    border none
    height 100%
    display inline-flex
    align-items center

    .icon {
      svg path {
        transition var(--transition)
        fill var(--dark)
        stroke none
      }
    }
  }

  &__field {
    border none
    background none
    width 100%
    height 100%
    padding 15px
    outline none
    font-weight: normal;
    font-size: 1em;
    color var(--dark)


    &::placeholder {
      font-weight: normal;
      color var(--dark-light)
    }
  }

  .icon {
    width 20px
    height 20px

    svg path {
      transition var(--transition)
      fill var(--dark)
    }
  }
}
</style>
