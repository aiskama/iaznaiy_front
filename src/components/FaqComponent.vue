<template>
  <section class="faq">
    <div class="faq__content">
      <h2 class="faq__header">Часто задаваемые вопросы</h2>
      <ul class="faq__list">
        <li
          v-for="(item, i) in items"
          :key="i"
          class="faq__item"
          :class="{ 'faq__item--active': activeFaq === i }"
          @click="toggleFaq(i)"
        >
          <span class="faq__title" :class="{ 'faq__title--active': activeFaq === i }">
            <span>
              {{ item.question }}
            </span>
            <IconComponent name="CaretRight" />
          </span>
          <div v-if="activeFaq === i" class="faq__description">
            <span>
              {{ item.answer }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import IconComponent from "components/IconComponent.vue";
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeFaq: null,
    };
  },
  methods: {
    toggleFaq(i) {
      if (this.activeFaq === i) {
        this.activeFaq = null;
        return;
      }
      this.activeFaq = i;
    },
  },
  components: {
    IconComponent,
  },
};
</script>

<style lang="stylus">
.faq {
  padding 80px 30px
  background var(--beige)

  &__content {
    width 100%
    max-width var(--max-width)
    margin 0 auto
  }

  &__header {
    margin-bottom 52px
    font-size 2.5em
    font-weight 700
    +below(1060px) {
      font-size 1.875em
      margin-bottom 50px
    }
  }

  &__list {

  }

  &__title {
    display flex
    justify-content space-between
    align-items center
    font-size 1.5em

    .icon {
      transition var(--transition)
    }

    &--active {
      .icon {
        transform rotate(90deg)
      }
    }

    +below(1060px) {
      font-size 1.125em
    }
  }

  &__item {
    cursor: pointer;
    padding 28px 0
    border-top 1px solid var(--gray)

    &:last-child {
      border-bottom 1px solid var(--gray)
    }
  }

  &__description {
    padding 20px 0 0 10px
  }
}
</style>
