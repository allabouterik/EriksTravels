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
              currentIndex * -100
            }%, 0px, 0px);`"
            class="posterLink-carousel__list-item"
          >
            <div class="posterLink-carousel__poster-container">
              <a
                :href="posterLink.link"
                :title="posterLink.title"
              >
                <img
                  :alt="`Click to go to ${posterLink.title}`"
                  :src="posterLink.img"
                  class="posterLinkImg"
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
          src="../assets/images/left-arrow-black.png"
          id="prevVideoImg"
          class="posterLink-carousel__prev arrowImg"
        />
        <img
          alt="Left arrow, click for previous video"
          src="../assets/images/left-arrow-yellow.png"
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
          src="../assets/images/right-arrow-black.png"
          id="nextVideoImg"
          class="posterLink-carousel__next arrowImg"
        />
        <img
          alt="Right arrow, click for next video"
          src="../assets/images/right-arrow-yellow.png"
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
  },

  data() {
    return {
      currentIndex: this.index,
      touch: {
        count: 0,
        x: 0,
        y: 0,
        multitouch: false,
        flag: false,
      },
    };
  },

  watch: {
    index(val) {
      this.currentIndex = val;
    },
  },

  mounted() {
    this.bindEvents();
  },

  beforeUnmount() {
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
      if (!document) return;
      document.addEventListener("keydown", this.keyDownHandler, false);
    },
    unbindEvents() {
      if (!document) return;
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
.posterLink-carousel {
  --posterHeight: 340px;

  @include media-breakpoint-up(sm) {
    --posterHeight: 370px;
  }

  @include media-breakpoint-up(md) {
    --posterHeight: 400px;
  }

  @include media-breakpoint-up(lg) {
    --posterHeight: 425px;
  }

  @include media-breakpoint-up(xl) {
    --posterHeight: 450px;
  }

  .posterLinkImg {
    width: auto;
    height: var(--posterHeight);
  }

  &__content {
    position: fixed;
    left: 0;
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
  &__list-item {
    display: inline-table;
    position: relative;
    width: 100%;
    transition: left 0.4s ease, transform 0.4s ease, -webkit-transform 0.4s ease;
  }
  &__poster-container {
    display: inline-block;
    position: relative;
    width: 100vw;
    max-height: 100vh;
    margin: 0 auto;
  }
  &__next {
    right: 0.5rem;

    @include media-breakpoint-up(sm) {
      right: 1rem;
    }
  }
  &__prev {
    left: 0.5rem;

    @include media-breakpoint-up(sm) {
      left: 1rem;
    }
  }

  .arrowImg {
    position: absolute;
    z-index: 1002;
    outline: none;
    transform: translate(0, calc(var(--posterHeight) / 2 - 50%));
    cursor: pointer;
    width: 40px;
  }
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
