<template>
  <label
    class="radio"
    :class="{
      'radio--disabled': disabled,
      'radio--checked': checked,
      'radio--error': error,
    }"
  >
    <span v-if="!hideState" class="radio__state"></span>
    <input
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      @change="$emit('change', $event.target.checked)"
    />
    <slot />
  </label>
</template>

<script>
export default {
  name: "RadioComponent",
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    error: Boolean,
    checked: Boolean,
    disabled: Boolean,
    hideState: Boolean,
  },
};
</script>

<style lang="stylus">
.radio {
  display flex
  gap 15px
  position relative
  cursor pointer
  align-items: center;
  text-align: left;
  user-select none
  font-size: 0.875em; // 14px
  line-height: 18px;
  transition var(--transition)

  &:hover {
    color var(--brown-light)
  }

  input {
    absolute left top
    visibility hidden
  }

  &--error {
    color var(--red) !important

    .radio__state {
      border-color var(--red) !important
    }
  }

  &--disabled {
    color var(--gray)

    .radio__state {
      border: 1px solid var(--gray);
    }

    &.radio--checked {
      .radio__state {
        &:after {
          background: var(--yellow);
        }
      }
    }
  }

  &--checked {
    pointer-events none

    &:not(&.radio--disabled) {
      & .radio__state {
        border 1px solid var(--yellow)
        &:after {
          opacity 1
        }
      }
    }
  }

  &__state {
    position relative
    width 18px
    height 18px
    background: var(--white);
    border: 1px solid var(--black);
    box-sizing: border-box;
    border-radius: 50%;
    display flex
    align-items center
    justify-content center
    flex-shrink 0
    margin-top 2px
    transition var(--transition)

    &:after {
      content ""
      display block
      width 10px
      height: 10px
      border-radius 50%
      background: var(--yellow)
      opacity 0
      transition var(--transition)
    }
  }
}
</style>
