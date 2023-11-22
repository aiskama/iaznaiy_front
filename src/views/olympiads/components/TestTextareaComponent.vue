<template>
  <textarea
    class="ipt"
    :placeholder="title"
    :rows="rows"
    @input="$emit('change', $event.target.value)"
    v-model="val"
  ></textarea>
</template>

<script>
export default {
  name: "CourseTextareaWrapper",
  watch: {
    value(value) {
      this.val = value;
    },
  },
  data() {
    return {
      val: null,
    };
  },
  props: {
    value: {
      type: [String, Number],
    },
    rows: {
      type: Number,
    },
    title: {
      type: String,
    },
  },
};
</script>
