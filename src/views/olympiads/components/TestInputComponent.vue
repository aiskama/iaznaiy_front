<template>
  <input :value="value" class="ipt" :placeholder="title" @input="$emit('change', $event.target.value)" />
</template>

<script>
export default {
  name: "CourseInputWrapper",
  props: {
    value: [String, Number],
    title: {
      type: String,
    },
  },
};
</script>
