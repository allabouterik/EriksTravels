<template>
  <transition name="fade">
    <div
      v-if="pageLightBoxOpen"
      class="page-lightbox"
    >
      <div
        v-if="componentName !== ''"
        class="page-lightbox__modal"
        :style="`background: ${background}`"
      >
        <component :is="componentName" />

        <div class="page-lightbox__iconsContainer">
          <div class="page-lightbox__musicIcons">
            <BackgroundMusicIcons />
          </div>

          <div
            id="closeImgContainer"
            @click="close()"
          >
            <img
              alt="Close icon, click to close lightbox"
              src="../assets/images/lightbox-close.png"
              id="closeImg"
              class="page-lightbox__close"
            />
            <img
              alt="Close icon, click to close lightbox"
              src="../assets/images/lightbox-close-hover.png"
              id="closeImg-hover"
              class="page-lightbox__close"
            />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useMainStore } from "@/stores/mainStore";
import ProducerContent from "./ProducerContent.vue";
import FilmFestivalsContent from "./FilmFestivalsContent.vue";

const keyMap = {
  ESC: 27,
};

export default {
  name: "PageLightBox",

  components: {
    ProducerContent,
    FilmFestivalsContent,
  },

  props: {
    componentName: {
      type: String,
      required: true,
    },
    disableScroll: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: "rgba(0, 0, 0, 1)",
    },
  },

  data() {
    return {
      bodyOverflowStyle: "",
      bodyHeightStyle: "",
      windowWidth: 0,
      windowHeight: 0,
    };
  },

  computed: {
    ...mapState(useMainStore, ["pageLightBoxOpen"]),
  },

  watch: {
    pageLightBoxOpen(isOpen) {
      if (isOpen && this.disableScroll) {
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
      } else {
        document.body.style.overflow = this.bodyOverflowStyle;
        document.body.style.height = this.bodyHeightStyle;
      }
    },
  },

  mounted() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
      });
    });

    if (!document) return;
    this.bodyOverflowStyle = document.body.style.overflow;
    this.bodyHeightStyle = document.body.style.height;
    this.bindEvents();
  },

  beforeUnmount() {
    if (!document) return;
    if (this.disableScroll) {
      document.body.style.overflow = this.bodyOverflowStyle;
      document.body.style.height = this.bodyHeightStyle;
    }
    this.unbindEvents();
  },

  methods: {
    ...mapActions(useMainStore, ["closePageLightBox"]),
    close() {
      this.$emit("close");
      this.closePageLightBox();
    },
    bindEvents() {
      document.addEventListener("keydown", this.keyDownHandler, false);
    },
    unbindEvents() {
      document.removeEventListener("keydown", this.keyDownHandler, false);
    },
    keyDownHandler(event) {
      switch (event.keyCode) {
        case keyMap.ESC:
          this.close();
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// transition fade on opening / closing of lightbox
.fade-enter-active,
.fade-leave-active {
  position: fixed;
  z-index: 1000;
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  position: fixed;
  opacity: 0;
  z-index: 1000;
}
@keyframes spinner-animation {
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.page-lightbox {
  &__modal {
    position: fixed;
    display: block;
    z-index: 1001;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &__iconsContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100%;
    z-index: 1002;
    padding: 33px 25px;

    @include media-breakpoint-up(sm) {
      padding: 39px 35px;
    }

    @include media-breakpoint-up(md) {
      padding: 40px 46px;
    }

    @include media-breakpoint-up(lg) {
      padding: 40px 50px;
    }

    @include media-breakpoint-up(xl) {
      padding: 40px 60px;
    }

    #closeImg,
    #closeImg-hover {
      width: 7vw;
      max-width: 38px;
      min-width: 25px;
      padding: 0;
    }
    #closeImgContainer #closeImg-hover {
      display: none;
    }
    #closeImgContainer:hover #closeImg-hover {
      display: inline;
    }
    #closeImgContainer:hover #closeImg {
      display: none;
    }
  }

  &__musicIcons {
    &::v-deep button {
      position: relative;
      transform: none;
      top: auto;
      left: auto;
    }
  }

  &__close {
    display: block;
    background: transparent;
    border: 0;
    line-height: 0;
    outline: none;
    z-index: 1002;
    cursor: pointer;
  }
}
</style>
