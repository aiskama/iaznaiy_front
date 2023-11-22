<template>
  <div class="crop">
    <label
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
      v-if="localValue == null"
      for="input-foto"
      class="label"
    >
      <!--      <span v-if="title" class="crop__title">{{ title }}</span>-->
      <!--      <span v-if="subtitle" class="crop__subtitle">{{ subtitle }}</span>-->
    </label>
    <div class="crop__body" :class="{ 'show-img': localValue }">
      <input
        v-if="!localValue"
        id="input-foto"
        ref="image"
        accept="image/*"
        class="ipt"
        type="file"
        @change="init"
      />
      <img
        v-if="localValue"
        :src="localValue ? $store.state._env.MEDIA_ENDPOINT + localValue.path : ''"
        alt="Выбранное изображение"
        class="crop__image"
        @click="clear"
      />
    </div>
    <ul v-if="errors && errors.length" class="input__errors">
      <li v-for="(e, i) in errors" :key="i">{{ e }}</li>
    </ul>
    <ul v-if="messages && messages.length" class="input__errors input__errors--messages">
      <li v-for="(m, i) in messages" :key="i">{{ m }}</li>
    </ul>
  </div>
</template>

<script>
// import InputComponent from "./MyCustomInputComponent.vue";
import CropImageModal from "../components/modals/components/CropImageModal.vue";

export default {
  name: "ImageCropComponent",
  components: {},
  props: {
    title: {
      type: String,
      default() {
        return "Изображение";
      },
    },
    subtitle: {
      type: String,
      default() {
        return "Изображение";
      },
    },
    value: {
      type: Object,
    },
    errors: {
      type: Array,
    },
    messages: {
      type: Array,
    },
  },
  data() {
    return {
      localValue: this.value,
      filelist: [],
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.localValue = val;
      },
    },
  },
  mounted() {},
  methods: {
    dragover(event) {
      event.preventDefault();
      if (!event.currentTarget.classList.contains("crop")) {
        event.currentTarget.parentNode.classList.add("drop");
      }
    },
    dragleave(event) {
      if (!event.currentTarget.classList.contains("crop")) {
        event.currentTarget.parentNode.classList.remove("drop");
      }
    },
    drop(event) {
      event.preventDefault();
      if (!event.currentTarget.classList.contains("crop")) {
        event.currentTarget.parentNode.classList.remove("drop");
      }
      this.$refs.image.files = event.dataTransfer.files;
      this.init(); // Trigger the onChange event manually
    },
    clear() {
      if (confirm("Очистить поле?")) {
        this.localValue = null;
        this.$emit("input", this.localValue);
      }
    },
    init() {
      if (this.$refs.image.files.length) {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.$store.state._modals.push({
            component: CropImageModal,
            options: {
              data: {
                imageBase64: reader.result,
                image: this.$refs.image.files[0],
              },
              callback: (res) => {
                this.localValue = {
                  path: res.path,
                  origin_name: res.origin_name,
                  alt: res.alt,
                  size: res.size,
                  type: res.type,
                };
                this.$emit("input", this.localValue);
              },
            },
          });
        };
        if (this.$refs.image.files[0]) {
          reader.readAsDataURL(this.$refs.image.files[0]);
        }
      }
    },
  },
};
</script>

<style lang="stylus">
@import '~cropperjs/dist/cropper.css';

.drop {
  background-color: var(--white) !important;
  border: 2px dashed var(--orange) !important;
}
  .label{
    width: 100%;
    height 100%
    cursor: pointer;
  }

.cropper-container {
  +below(1024px) {
    width: 100% !important;
  }
}

.cropper__buttons {
  +below(1024px) {
    display: grid !important;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

.show-img {
  opacity: 1 !important;
  visibility: visible !important;
  position: static !important;
}

.crop {
  display: grid;
  align-items: center;
  grid-gap: 5px;
  transition .2s
  cursor pointer

  &__title {
    font-size: 0.875em;
    display: block;
    line-height: 18px;
    color: var(--dark);
  }

  &__body {
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__image {
    width: 100%;
    max-height: 125px;
    object-fit: contain;
    object-position: center;
    background: rgba(#1B2D60, 0.1);
    border-radius: 10px;
    border: 1px solid var(--gray);
  }

  &__input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;
  }

  &__name {
    display: flex;
    align-items: center;
    gap: 10px;
    link(var(--blue));
  }
}
</style>
