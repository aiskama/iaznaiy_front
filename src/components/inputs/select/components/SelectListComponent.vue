<template>
  <div class="select-list">
    <div class="select-list__container">
      <div
        v-for="(o, i) in options"
        :key="i"
        :class="{
          'select-list__item--single': !multiple,
          'select-list__item--checked': isChecked(o),
        }"
        class="select-list__item"
        @click="multiple ? false : $emit('select', o)"
      >
        <CheckboxComponent v-if="multiple" :checked="isChecked(o)" @change="$emit('select', o)">
          <span>{{ getName(o) }}</span>
        </CheckboxComponent>
        <template v-else>{{ getName(o) }}</template>
      </div>
      <div v-if="!options.length" class="select-list__item select-list__item--single">
        {{ search ? "Ничего не найдено" : "Пусто" }}
      </div>
    </div>
    <a v-if="multiple && clearable" class="select-list__clean" @click.prevent="$emit('clean')"> Очистить </a>
  </div>
</template>

<script>
import CheckboxComponent from "components/inputs/CheckboxComponent.vue";

export default {
  name: "SelectListComponent",
  components: { CheckboxComponent },
  props: {
    labelName: {
      type: String,
      default() {
        return "name";
      },
    },
    selected: { type: [Array, Number, Object] },
    options: { type: Array, required: true },
    multiple: Boolean,
    clearable: Boolean,
    search: String,
  },
  methods: {
    isChecked(option) {
      if (this.multiple && this.selected && this.selected instanceof Array) {
        return this.selected.map((s) => JSON.stringify(s)).includes(JSON.stringify(option));
      }
      if (!this.multiple) {
        return JSON.stringify(option) === JSON.stringify(this.selected);
      }
      return false;
    },
    getName(option) {
      if (this.labelName) {
        return option[this.labelName];
      }
      return option;
    },
  },
};
</script>

<style lang="stylus">

.select-list {
  absolute bottom left
  width calc(100% + 2px)
  margin -1px
  transform translateY(calc(100% - 1px))
  z-index 10
  background var(--white)
  border: 1px solid var(--gray_dark);
  border-radius 0 0 5px 5px
  box-sizing: border-box;
  box-shadow: 0 0 0 3px var(--main-o15);
  overflow hidden
  overflow-y auto
  max-height: 200px;
  display grid
  grid-template-rows 1fr auto
  clip-path inset(0 -3px -3px -3px)

  .select--list-top & {
    border-radius 5px 5px 0 0
    absolute top left
    bottom initial
    transform translateY(calc(-100% + 1px))
    clip-path inset(-3px -3px 0 -3px)
  }

  &__clean {
    border-top 1px solid var(--gray-dark)
    padding 8px 12px
    color var(--dark)
    cursor pointer
    text-decoration none

    &:hover {
      color var(--dark)
      border-color var(--gray-dark)
    }
  }

  &__container {
    display flex
    flex-direction column
    flex-shrink 0
    overflow-y auto
    border: 1px solid var(--yellow);
  }

  &__item {
    width 100%
    text-align left
    cursor pointer
    transition var(--transition)
    outline none
    color var(--dark)
    text-decoration none
    display flex
    flex-shrink 0

    &--single {
      padding 8px 12px
    }

    .check {
      padding 8px 12px
      width 100%
    }

    &:focus
    &--checked
    &:hover {
      background var(--beige)
      color var(--dark)
    }
  }
}
</style>
