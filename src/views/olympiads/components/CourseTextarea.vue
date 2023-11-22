<template>
  <div class="course-textarea">
    <!--    <h2>{{ title }}</h2>-->
    <span>
      <EditorJSComponent :text="JSON.parse(text)" v-if="text" />
    </span>
    <textarea
      class="ipt"
      placeholder="Введите ответ"
      :rows="rows"
      ref="textarea"
      :value="val"
      @input="$emit('change', $event.target.value)"
    ></textarea>
  </div>
</template>

<script>
import EditorJSComponent from "components/EditorJSComponent.vue";

export default {
  name: "CourseTextareaWrapper",
  components: {
    EditorJSComponent,
  },
  mounted() {
    this.$refs.textarea.focus();
  },
  data() {
    return {
      val: null,
    };
  },
  methods: {},
  props: {
    value: {
      type: [String, Number],
    },
    rows: {
      type: Number,
    },
    placeholder: {
      type: String,
    },
    question: {
      type: String,
    },
    title: {
      type: String,
    },
    text: {
      type: String,
    },
  },
};
</script>

<style lang="stylus">
.course-textarea {
  //max-width 520px
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  width: 100%;

  & .editor-js .article__image{
    max-width 660px
  }

  > h2 {
    margin-bottom 10px
  }
  > span {
    display inline-flex
    //margin-bottom 20px
    font-weight 500
    text-align center
    font-size: 1.500em
    line-height: 30px;

    +below(800px){
      font-size: 1.125em
      text-align start
      line-height: 18px;
    }

    +below(414px){
      margin-bottom: 0
    }
  }

  textarea {
    width 100%
    outline none
    border 1px solid var(--yellow)
    background-color var(--beige)
    border-radius 6px
    padding 20px
    max-width 660px
  }

  &__header {
    display flex
    gap 30px
  }
}
</style>
