<template>
  <div class="check-list">
    <!--    <h2 class="check-list__title">{{ title }}</h2>-->
    <span class="check-list__description">
      <EditorJSComponent :text="JSON.parse(text)" v-if="text" />
    </span>
    <div class="check-list__items">
      <label
        class="check-list__item"
        :class="{ 'check-list__item--image': !!item.image }"
        v-for="(item, i) in test_answers"
        :key="i"
      >
        <RadioComponent :checked="item.checked" @change="change(item.id)" />
        <span class="check-list__item-content">
          <span class="check-list__item-title">{{ item.answer }}</span>
          <img
            class="check-list__item-image"
            :src="$store.state._env.MEDIA_ENDPOINT + item.img_answer.path"
            v-if="item.img_answer"
            :alt="item.img_answer.alt"
          />
        </span>
      </label>
    </div>
  </div>
</template>

<script>
import EditorJSComponent from "components/EditorJSComponent.vue";
import RadioComponent from "components/inputs/RadioComponent.vue";

export default {
  name: "CourseRadioList",

  props: {
    title: {
      type: String,
    },
    text: {
      type: String,
    },
    value: {
      type: [String, Object, Number],
    },
    test_answers: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    isChecked(item) {
      return JSON.stringify(this.value) === JSON.stringify(item);
    },
    change(id) {
      let updatedList = this.test_answers;

      updatedList = updatedList.map((item) => {
        if (id === item.id) {
          return { ...item, checked: !item.checked };
        }
        return { ...item, checked: false };
      });

      this.$emit("change", updatedList);
    },
  },
  components: { RadioComponent, EditorJSComponent },
};
</script>

<style lang="stylus">
@import "~@/styles/components/check-list.styl";
.check-list{
  +below(600px){
    grid 15px
  }
  &__description{
    +below(600px){
      margin-bottom: 0
    }
  }
}
</style>
