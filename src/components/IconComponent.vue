<template>
  <figure :class="`icon ${name}-icon`" v-if="!error">
    <InlineSvg :src="`/static/svg/${name}.svg`" @error="error = true" />
  </figure>
</template>

<script>
import InlineSvg from "vue-inline-svg";

export default {
  name: "IconComponent",
  props: {
    name: String,
  },
  data() {
    return {
      error: false,
    };
  },
  components: {
    InlineSvg,
  },
};
</script>
