<template>
  <div class="videoThumbnailContainer">
    <div>
      <img
        v-if="video.thumbnailImg != null"
        :alt="video.title"
        :src="video.thumbnailImg"
        width="566"
        height="362"
        class="thumbnailImg"
        :fetchpriority="preload ? 'high' : 'auto'"
        :data-not-lazy="preload"
      />
    </div>

    <div class="thumbnailImgTextOverlay">
      <div class="showOnHover">
        <h4 class="playVideoText mb-1 mb-sm-2 mb-lg-6">PLAY VIDEO</h4>
        <span
          v-if="video.duration != null"
          class="videoDurationText"
        >
          {{ durationInMinsText(video.duration) }}
        </span>
      </div>
    </div>

    <div class="captionBanner pa-2">
      <h4 class="videoTitle">{{ video.title }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoThumbnailTravels",

  props: {
    video: {
      type: Object,
    },
    preload: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    durationInMinsText(secs) {
      let mins = Math.floor(secs / 60);
      if (mins >= 60) {
        let hrs = Math.floor(mins / 60);
        mins = mins - hrs * 60;
        if (mins < 10) mins = "0" + mins;
        if (hrs == 1) return "1 hr " + mins + " min";
        else return hrs + " hrs " + mins + " min";
      } else {
        secs = secs - mins * 60;
        if (secs < 10) secs = "0" + secs;
        return mins + ":" + secs + " min";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&display=swap");
@import url("https://fonts.googleapis.com/css?family=Lora:700i&display=swap");

@font-face {
  font-family: DK Suco De Laranja;
  src: url("/assets/fonts/dk-suco-de-laranja.otf");
}

.videoThumbnailContainer {
  position: relative;
  cursor: pointer;
}

.thumbnailImg {
  width: 100%;
  max-width: 100%;
  height: auto;
  position: relative;
  opacity: 1;
  transition: opacity 0.5s ease;
}

.thumbnailImgTextOverlay {
  color: #ffffff;
  position: absolute;
  text-align: center;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
}

.playVideoText {
  font-family: "DK Suco De Laranja", "Open Sans Condensed", sans-serif;
  font-feature-settings: "liga";
  font-weight: 600;
  text-transform: uppercase;
  font-size: calc(1.875rem + 7 * (100vw - 375px) / (576 - 375));
  line-height: calc(1.875rem + 7 * (100vw - 375px) / (576 - 375));
  letter-spacing: 9px;

  @include media-breakpoint-up(sm) {
    font-size: 4.8vw;
    line-height: 4.8vw;
    letter-spacing: 8px;
  }

  @include media-breakpoint-up(md) {
    font-size: 2.3125rem;
    line-height: 2.3125rem;
    letter-spacing: 9px;
  }
}

.videoDurationText {
  display: inline;
  font-family: "Lora", serif;
  font-feature-settings: "liga";
  font-size: calc(1.125rem + 6 * (100vw - 375px) / (576 - 375));
  font-weight: 700;
  line-height: 2.125rem;
  letter-spacing: 2px;

  @include media-breakpoint-up(sm) {
    font-size: 2.86vw;
  }

  @include media-breakpoint-up(md) {
    font-size: 1.375rem;
  }
}

.captionBanner {
  display: flex;
  color: #d6d6d6;
  background-color: black;
  width: 100%;
  height: 40px;
  bottom: 0;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in 0s;
}

.videoTitle {
  font-family: "Avenir Medium", "ui-sans-serif", "system-ui", "sans-serif",
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-feature-settings: "liga";
  font-kerning: normal;
  font-weight: unset;
  text-align: center;
  text-transform: uppercase;
  font-size: calc(0.9375rem + 1 * (100vw - 375px) / (576 - 375));
  line-height: calc(1.25rem + 1 * (100vw - 375px) / (576 - 375));
  letter-spacing: calc(0.3125rem + 1 * (100vw - 375px) / (576 - 375));

  @include media-breakpoint-up(sm) {
    font-size: calc(1rem + 1 * (100vw - 576px) / (768 - 576));
    line-height: calc(1.3125rem + 1 * (100vw - 576px) / (768 - 576));
    letter-spacing: calc(0.375rem + 1 * (100vw - 576px) / (768 - 576));
  }

  @include media-breakpoint-up(md) {
    font-size: 1.0625rem;
    line-height: 1.375rem;
    letter-spacing: 7px;
  }

  @include media-breakpoint-up(lg) {
    font-size: calc(1rem + 1 * (100vw - 992px) / (1200 - 992));
    line-height: calc(1.3125rem + 1 * (100vw - 992px) / (1200 - 992));
    letter-spacing: calc(0.375rem + 1 * (100vw - 992px) / (1200 - 992));
  }

  @include media-breakpoint-up(xl) {
    font-size: 1.0625rem;
    line-height: 1.375rem;
    letter-spacing: 7px;
  }
}

.showOnHover {
  display: block;
  opacity: 0;
  transition: all 0.3s ease-in 0.2s;
}
.videoThumbnailContainer:hover .showOnHover {
  opacity: 1;
}
.videoThumbnailContainer:hover .thumbnailImg {
  opacity: 0.5;
}
.videoThumbnailContainer:hover .captionBanner {
  color: black;
  background-color: white;
}

@media only screen and (max-width: 400px) {
  #titleImg {
    max-width: 60%;
  }
}
@media only screen and (min-width: 400.01px) and (max-width: 575.98px) {
  #titleImg {
    max-width: 65%;
  }
}

@include media-breakpoint-down(md) {
  .showOnHover {
    opacity: 1;
  }
  .thumbnailImg {
    opacity: 0.5;
  }
  .hideText {
    display: none;
  }
}
</style>
