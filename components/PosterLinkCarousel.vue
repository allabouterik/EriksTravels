<template>
  <div
    class="posterLink-carousel"
    @touchstart.passive="touchstartHandler"
    @touchmove.passive="touchmoveHandler"
    @touchend.passive="touchendHandler"
  >
    <div class="relative bg-transparent">
      <div class="posterLink-carousel__container">
        <ul class="posterLink-carousel__content">
          <li
            v-for="(posterLink, posterLinkIndex) in posterLinks"
            :key="posterLinkIndex"
            :style="`transform: translate3d(${
              -25 + currentIndex * -100
            }%, 0px, 0px);`"
            class="posterLink-carousel__video-container"
          >
            <div
              class="posterLink-carousel__video"
              :style="videoContainerCss"
            >
              <a
                :href="posterLink.link"
                :title="posterLink.title"
              >
                <img
                  :alt="`Click to go to ${posterLink.title}`"
                  :src="posterLink.img"
                />
              </a>
            </div>
          </li>
        </ul>
      </div>

      <div
        v-if="currentIndex > 0"
        id="leftArrowContainer"
        @click="prev()"
      >
        <img
          alt="Left arrow, click for previous video"
          src="../assets/images/arrow-left.png"
          id="prevVideoImg"
          class="posterLink-carousel__prev arrowImg"
        />
        <img
          alt="Left arrow, click for previous video"
          src="../assets/images/arrow-left-hover.png"
          id="prevVideoImg-hover"
          class="posterLink-carousel__prev arrowImg"
        />
      </div>

      <div
        v-if="currentIndex + 1 < posterLinks.length"
        id="rightArrowContainer"
        @click="next()"
      >
        <img
          alt="Right arrow, click for next video"
          src="../assets/images/arrow-right.png"
          id="nextVideoImg"
          class="posterLink-carousel__next arrowImg"
        />
        <img
          alt="Right arrow, click for next video"
          src="../assets/images/arrow-right-hover.png"
          id="nextVideoImg-hover"
          class="posterLink-carousel__next arrowImg"
        />
      </div>
    </div>
  </div>
</template>

<script>
const keyMap = {
  LEFT: 37,
  RIGHT: 39,
};

export default {
  props: {
    posterLinks: {
      type: Array,
      default: () => [{ title: "", img: "", link: "" }],
    },
    index: {
      type: Number,
      default: 0,
    },
    disableScroll: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      currentIndex: this.index,
      bodyOverflowStyle: "",
      touch: {
        count: 0,
        x: 0,
        y: 0,
        multitouch: false,
        flag: false,
      },
      windowWidth: 0,
      windowHeight: 0,
    };
  },

  computed: {
    videoContainerCss() {
      return {
        width: this.windowWidth + "px",
      };
    },
  },

  watch: {
    index(val) {
      if (!document) return;
      this.currentIndex = val;
      if (this.disableScroll && typeof val === "number") {
        document.body.style.overflow = "hidden";
      } else if (this.disableScroll && !val) {
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
    prev() {
      if (this.currentIndex === 0) return;
      this.currentIndex -= 1;
    },
    next() {
      if (this.currentIndex === this.posterLinks.length - 1) return;
      this.currentIndex += 1;
    },
    bindEvents() {
      document.addEventListener("keydown", this.keyDownHandler, false);
    },
    unbindEvents() {
      document.removeEventListener("keydown", this.keyDownHandler, false);
    },
    touchstartHandler(event) {
      this.touch.count += 1;
      if (this.touch.count > 1) {
        this.touch.multitouch = true;
      }
      this.touch.x = event.changedTouches[0].pageX;
      this.touch.y = event.changedTouches[0].pageY;
    },
    touchmoveHandler(event) {
      if (this.touch.flag || this.touch.multitouch) return;
      const touchEvent = event.touches[0] || event.changedTouches[0];
      if (touchEvent.pageX - this.touch.x > 40) {
        this.touch.flag = true;
        this.prev();
      } else if (touchEvent.pageX - this.touch.x < -40) {
        this.touch.flag = true;
        this.next();
      }
    },
    touchendHandler() {
      this.touch.count -= 1;
      if (this.touch.count <= 0) {
        this.touch.multitouch = false;
      }
      this.touch.flag = false;
    },
    keyDownHandler(event) {
      switch (event.keyCode) {
        case keyMap.LEFT:
          this.prev();
          break;
        case keyMap.RIGHT:
          this.next();
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

.posterLink-carousel {
  &__content {
    height: 100%;
    width: 100%;
    white-space: nowrap;
    padding: 0;
    margin: 0;
  }
  &__container {
    display: block;
    width: 100%;
    text-align: center;
  }
  &__video-container {
    display: inline-table;
    vertical-align: middle;
    position: relative;
    width: 100%;
    text-align: center;
    transition: left 0.4s ease, transform 0.4s ease, -webkit-transform 0.4s ease;
  }
  &__video {
    display: inline-block;
    position: relative;
    margin: 0 auto;
    max-width: 100%;
    max-height: 100vh;
  }
  &__next,
  &__prev {
    position: absolute;
    z-index: 1002;
    display: block;
    background: transparent;
    border: 0;
    line-height: 0;
    outline: none;
    cursor: pointer;
  }
  &__next {
    top: 50%;
    transform: translate(0, -50%);
    right: 1.5%;
    vertical-align: middle;

    @include media-breakpoint-up(sm) {
      right: 3%;
    }
    @include media-breakpoint-up(md) {
      right: 4.5%;
    }
    @include media-breakpoint-up(lg) {
      right: 6.5%;
    }
    @include media-breakpoint-up(xl) {
      right: 8.5%;
    }
  }
  &__prev {
    top: 50%;
    transform: translate(0, -50%);
    left: 1.5%;

    @include media-breakpoint-up(sm) {
      left: 3%;
    }
    @include media-breakpoint-up(md) {
      left: 4.5%;
    }
    @include media-breakpoint-up(lg) {
      left: 6.5%;
    }
    @include media-breakpoint-up(xl) {
      left: 8.5%;
    }
  }
}

.arrowImg {
  width: 7%;
  max-width: 26px;
  min-width: 15px;
  padding: 0;
}
#prevVideoImg-hover,
#leftArrowContainer:hover #prevVideoImg {
  display: none;
}
#leftArrowContainer:hover #prevVideoImg-hover {
  display: inline;
}

#nextVideoImg-hover,
#rightArrowContainer:hover #nextVideoImg {
  display: none;
}
#rightArrowContainer:hover #nextVideoImg-hover {
  display: inline;
}
</style>
