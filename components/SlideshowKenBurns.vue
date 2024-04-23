<template>
  <div
    class="SlideshowKenBurns"
    :style="slideshowStyles"
  >
    <!-- https://vuejs.org/guide/built-ins/transition-group.html -->
    <TransitionGroup
      name="SlideshowKenBurns"
      tag="div"
      class="SlideshowKenBurns__slides"
      :class="{ vignette: vignette }"
    >
      <img
        v-for="(image, index) in images"
        v-show="index === activeIndex"
        :key="'imgIndex' + index"
        :src="image"
        class="SlideshowKenBurns__image"
        :style="imgStyle(index)"
        alt=""
        :fetchpriority="index === 0 ? 'high' : 'auto'"
        :data-not-lazy="index === 0"
      />
    </TransitionGroup>
  </div>
</template>

<script>
export default {
  name: "SlideshowKenBurns",

  props: {
    slides: {
      default: () => [],
      type: Array,
    },
    height: {
      default: "100vh",
      type: String,
    },
    includeKeyFrames: {
      default: true,
      type: Boolean,
    },
    opacityMax: {
      default: 0.62,
      type: Number,
    },
    opacityMin: {
      default: 0,
      type: Number,
    },
    translateFactor: {
      default: 1.5,
      type: Number,
    },
    vignette: {
      default: true,
      type: Boolean,
    },
  },

  data() {
    return {
      activeIndex: 0,
      time: 0,
      intervalClock: null,
    };
  },

  computed: {
    images() {
      return this.slides.map((a) => a.img);
    },
    slideshowStyles() {
      return {
        "--height": this.height,
        "--opacityMax": this.opacityMax,
        "--opacityMin": this.opacityMin,
      };
    },
  },

  beforeMount() {
    if (this.includeKeyFrames) {
      this.createKeyFrames();
    }
    this.goToIndex(0);
  },

  mounted() {
    this.startInterval();
  },

  updated() {
    if (this.includeKeyFrames) {
      this.createKeyFrames();
    }
  },

  unmounted() {
    // Clear the interval if the component is destroyed to prevent memory leaks
    clearInterval(this.intervalClock);
  },

  methods: {
    goToIndex(index) {
      this.activeIndex = index;
      this.time = this.interval(index);
    },

    imgStyle(index) {
      let css = {};
      css.animationName = "kenburns-" + (index + 1);
      css.transformOrigin = this.panStart(index);
      if (index === 0) {
        css.animationDuration = "10s";
      }
      return css;
    },

    panStart(index) {
      if (this.slides[index].hasOwnProperty("panStart")) {
        switch (this.slides[index].panStart.toLowerCase()) {
          case "bottom-left":
            return "bottom left";
          case "bottom":
            return "bottom";
          case "bottom-right":
            return "bottom right";
          case "left":
            return "left";
          case "centre":
            return "center";
          case "right":
            return "right";
          case "top-left":
            return "top left";
          case "top":
            return "top";
          case "top-right":
            return "top right";
          default:
            console.error(
              "Did not recognise value for slides.panStart: " +
                this.slides[i].panStart
            );
        }
        return "center";
      }
    },

    scaleFrom(index) {
      return this.slides[index].hasOwnProperty("scaleFrom")
        ? this.slides[index].scaleFrom
        : 0.8;
    },

    scaleTo(index) {
      return this.slides[index].hasOwnProperty("scaleTo")
        ? this.slides[index].scaleTo
        : 1.0;
    },

    startInterval() {
      const precision = 100;
      this.intervalClock = setInterval(() => {
        this.time -= precision;
        if (this.time <= 0) {
          this.next();
        }
      }, precision);
    },

    interval(index) {
      // return 1000*this.slides[index].duration
      return 5000;
    },

    next() {
      let nextIndex = this.activeIndex + 1;
      // Go to the first image if the active image ist the last one
      if (!this.images[nextIndex]) {
        nextIndex = 0;
      }
      this.goToIndex(nextIndex);
    },

    createKeyFrames() {
      for (let i = 1; i < this.slides.length; i++) {
        // Note: keyframe for first slide (i == 0) is manually included in styles.css
        // in order to avoid jitter on initial page load
        let startPos = [0, 0, 0]; // x, y, z
        switch (this.panStart(i)) {
          case "bottom left":
            startPos = [-1, 1, 0];
            break;
          case "bottom":
            startPos = [0, 1, 0];
            break;
          case "bottom right":
            startPos = [1, 1, 0];
            break;
          case "left":
            startPos = [-1, 0, 0];
            break;
          case "center":
            startPos = [0, 0, 0];
            break;
          case "right":
            startPos = [1, 0, 0];
            break;
          case "top left":
            startPos = [-1, -1, 0];
            break;
          case "top":
            startPos = [0, -1, 0];
            break;
          case "top right":
            startPos = [1, -1, 0];
            break;
          default:
            console.error(
              "Did not recognise value for slides.panStart: " + this.panStart(i)
            );
        }
        const num = i + 1;
        const scaleFrom = this.scaleFrom(i);
        const scaleTo = this.scaleTo(i);
        const Tx = this.translateFactor * startPos[0];
        const Ty = this.translateFactor * startPos[1];
        let style = document.createElement("style");
        const keyFrame =
          "\
        @keyframes kenburns-" +
          num +
          " {\
          0% {\
            transform: scale3d(" +
          scaleFrom +
          ", " +
          scaleFrom +
          ", 1) translate3d(" +
          Tx +
          "%, " +
          Ty +
          "%, 0);\
          }\
          100% {\
            transform: scale3d(" +
          scaleTo +
          ", " +
          scaleTo +
          ", 1) translate3d(0, 0, 0);\
          }\
        }";
        style.innerHTML = keyFrame;
        document.head.appendChild(style);
      }
    },
  },
};
</script>

<style lang="scss">
.SlideshowKenBurns {
  background-color: black;

  &__slides {
    position: relative;
    display: flex;
    justify-content: center;
    padding-bottom: var(--height);
  }

  /* For vignette effect, see https://benjaminhorn.io/code/proper-lens-vignette-with-css/ & 
  https://codepen.io/beije/pen/zxjeae */
  &__slides.vignette:after {
    content: "";
    position: absolute;

    top: 54%; //adjusting vertical position & height of vignette to counteract touch scroll on mobile devices
    left: 50%;

    transform: translate(-50%, -50%);
    /* Reset back the image so it's center is locked on the center of the parent */

    width: 110vw;
    height: 118vh;

    border-radius: 15%;

    box-shadow: inset 0px 0px 50px 20px rgba(0, 0, 0, 0.8),
      inset 0px 0px 50px 20px rgba(0, 0, 0, 0.8);

    @include media-breakpoint-up(sm) {
      box-shadow: inset 0px 0px 75px 30px rgba(0, 0, 0, 0.8),
        inset 0px 0px 75px 30px rgba(0, 0, 0, 0.8);
    }

    @include media-breakpoint-up(md) {
      box-shadow: inset 0px 0px 100px 40px rgba(0, 0, 0, 0.8),
        inset 0px 0px 100px 40px rgba(0, 0, 0, 0.8);
      top: 52.5%; //adjusting vertical position & height of vignette to counteract touch scroll on mobile devices
      height: 115vh;
    }

    @include media-breakpoint-up(lg) {
      box-shadow: inset 0px 0px 125px 50px rgba(0, 0, 0, 0.8),
        inset 0px 0px 125px 50px rgba(0, 0, 0, 0.8);
    }

    @include media-breakpoint-up(xl) {
      box-shadow: inset 0px 0px 150px 60px rgba(0, 0, 0, 0.8),
        inset 0px 0px 150px 60px rgba(0, 0, 0, 0.8);
      /* Center element on the middle of it's parent */
      top: 50%;
      height: 110vh;
    }
  }

  &__image {
    position: absolute;
    width: auto;
    height: auto;
    min-height: 100%;
    min-width: 100%;
    max-height: var(--height);
    overflow: hidden;
    opacity: var(--opacityMax);
    animation-duration: 8s;
    animation-fill-mode: forwards; // The element will retain the style values that is set by the last keyframe
    transform-origin: bottom right;
  }

  &-enter-active,
  &-leave-active {
    opacity: var(--opacityMax);
    transition: opacity 3s linear;
  }
  &-enter-from,
  &-leave-to {
    opacity: var(--opacityMin);
  }
}
</style>
