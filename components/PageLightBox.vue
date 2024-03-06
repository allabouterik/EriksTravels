<template>
  <transition name="fade">
    <div
      v-if="pageLightBoxOpen"
      class="page-lightbox"
    >
      <div
        class="page-lightbox__modal"
        :style="`background: ${background}`"
      >
        <div class="page-lightbox__container">
          <div class="page-lightbox__content">
            <component
              v-if="componentName !== ''"
              :is="componentName"
            />
          </div>
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
  </transition>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useMainStore } from "@/stores/mainStore";
import ProducerContent from "./ProducerContent.vue";

const keyMap = {
  ESC: 27,
};

export default {
  name: "PageLightBox",

  components: {
    ProducerContent,
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
      default: "rgba(0, 0, 0, 0.9)",
    },
  },

  data() {
    return {
      bodyOverflowStyle: "",
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
      } else {
        document.body.style.overflow = this.bodyOverflowStyle;
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
    this.bindEvents();
  },

  beforeUnmount() {
    if (!document) return;
    if (this.disableScroll) {
      document.body.style.overflow = this.bodyOverflowStyle;
    }
    this.unbindEvents();
  },

  methods: {
    ...mapActions(useMainStore, ["closePageLightBox"]),
    close() {
      this.$emit("close");
      // this.pageLightBoxOpen = false;
      closePageLightBox();
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
@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url("../assets/fonts/nhaasgrotesktxpro-55rg.eot"); /* IE9 Compat Modes */
  src: url("../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("../assets/fonts/nhaasgrotesktxpro-55rg.woff")
      format("woff"),
    /* Pretty Modern Browsers */
      url("../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg")
      format("svg"); /* Legacy iOS */
  font-weight: normal;
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
  &__container {
    position: absolute;
    z-index: 1002;
    display: block;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  &__content {
    height: 100%;
    width: 100%;
    white-space: nowrap;
    padding: 0;
    margin: 0;
  }
  &__close {
    position: absolute;
    top: 10px;
    right: 20px;
    display: block;
    background: transparent;
    border: 0;
    line-height: 0;
    outline: none;
    z-index: 1002;
    cursor: pointer;

    @include media-breakpoint-up(sm) {
      top: 20px;
      right: 30px;
    }

    @include media-breakpoint-up(md) {
      top: 30px;
      right: 40px;
    }

    @include media-breakpoint-up(lg) {
      top: 40px;
      right: 50px;
    }

    @include media-breakpoint-up(xl) {
      top: 40px;
      right: 60px;
    }
  }
}

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

#closeImg,
#closeImg-hover {
  width: 7%;
  max-width: 38px;
  min-width: 15px;
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
</style>
