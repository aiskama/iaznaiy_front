<template>
  <img
    :src="src || source"
    :alt="head_img ? head_img.alt : ''"
    loading="lazy"
    class="img"
    :class="{ lazy: loader, loaded, 'img--contain': contain }"
    @load="loaded = true"
    @error="loaded = true"
  />
</template>

<script>
export default {
  name: "ImgComponent",
  props: {
    src: String,
    head_img: Object,
    quality: {
      type: String,
      default: "90",
    },
    width: [Number, String],
    height: [Number, String],
    loader: {
      type: Boolean,
      default: true,
    },
    contain: Boolean,
  },
  data() {
    return {
      loaded: false,
    };
  },
  computed: {
    source() {
      if (this.head_img) {
        const urlParams = new URLSearchParams();
        if (this.width) urlParams.append("width", "" + this.width);
        if (this.height) urlParams.append("height", "" + this.height);
        if (this.quality) urlParams.append("quality", this.quality);
        return `${this.$store.state._env.MEDIA_ENDPOINT}/action/img/${
          this.head_img.id
        }?${urlParams.toString()}`;
      }
      return "/static/images/no-image.png";
    },
  },
};
</script>

<style lang="stylus">
.img {
  object-fit cover
  object-position center

  &--contain {
    object-fit contain
  }
}

.lazy {
  opacity 1
  transition var(--transition)

  &.loaded {
    opacity 1
  }
}
</style>
