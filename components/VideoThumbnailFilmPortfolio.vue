<template>
  <div class="videoThumbnailContainer">
    <div class="videoThumbnailImgContainer">
      <img
        v-if="video.thumbnailImg != null"
        :alt="video.title"
        :src="video.thumbnailImg"
        width="113.2"
        height="72.4"
        class="thumbnailImg"
        :fetchpriority="preload ? 'high' : 'auto'"
        :data-not-lazy="preload"
      />

      <div class="thumbnailImgTextOverlay">
        <div class="showOnHover">
          <img
            src="~/assets/images/playarrowcircle.png"
            class="playImg"
          />
        </div>
      </div>
    </div>

    <div class="captionBanner pa-4">
      <h4 class="videoTitle">{{ video.title }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoThumbnailFilmPortfolio",

  props: {
    video: {
      type: Object,
    },
    preload: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&display=swap");
@import url("https://fonts.googleapis.com/css?family=Lora:700i&display=swap");

@font-face {
  font-family: Avenir Medium;
  src: url("/assets/fonts/avenir-medium.ttf");
}

.videoThumbnailContainer {
  display: flex;
  position: relative;
  cursor: pointer;
}

.videoThumbnailImgContainer {
  display: flex;
  position: relative;
}

.thumbnailImg {
  position: relative;
  opacity: 1;
  transition: opacity 0.5s ease;
  align-self: center;
  width: auto;
  height: 54.3px;

  @include media-breakpoint-up(md) {
    height: 72.4px;
  }
}

.thumbnailImgTextOverlay {
  color: #ffffff;
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
}

.playImg {
  height: 37.5px;

  @include media-breakpoint-up(md) {
    height: 50px;
  }
}

.videoDurationText {
  display: inline;
  font-family: "Lora", serif;
  font-feature-settings: "liga";
  font-weight: 700;
  font-size: 1.375rem;
  line-height: 2.125rem;
  letter-spacing: 2px;
}

.captionBanner {
  display: flex;
  color: #d6d6d6;
  background-color: black;
  // width: 100%;
  // height: 40px;
  bottom: 0;
  font-size: 14px;
  align-items: center;
  justify-content: flex-start;
  transition: all 0.3s ease-in 0s;
}

.videoTitle {
  font-family: "Avenir Medium";
  font-feature-settings: "liga";
  font-kerning: normal;
  font-weight: unset;
  font-size: 1.0625rem;
  line-height: 1.375rem;
  letter-spacing: 7px;
  text-align: left;
  text-transform: uppercase;
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

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

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

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  .videoDurationText {
    font-size: calc(1.125rem + 6 * (100vw - 375px) / (576 - 375));
  }
  .videoTitle {
    font-size: calc(0.9375rem + 1 * (100vw - 375px) / (576 - 375));
    line-height: calc(1.25rem + 1 * (100vw - 375px) / (576 - 375));
    letter-spacing: calc(0.3125rem + 1 * (100vw - 375px) / (576 - 375));
  }
  .captionBanner {
    /* height: calc(90px + 25 * (100vw - 375px) / (576 - 375)); */
    /* color: black; 
    background-color: white; */
  }
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

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  .videoDurationText {
    font-size: 2.86vw;
  }
  .videoTitle {
    font-size: calc(1rem + 1 * (100vw - 576px) / (768 - 576));
    line-height: calc(1.3125rem + 1 * (100vw - 576px) / (768 - 576));
    letter-spacing: calc(0.375rem + 1 * (100vw - 576px) / (768 - 576));
  }
  .captionBanner {
    /* height: calc(100px + 15 * (100vw - 576px) / (768 - 576)); */
    /* color: black; 
    background-color: white; */
  }
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

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  /* .captionBanner {
     color: black; 
    background-color: white;
  } */
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

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) {
  .videoTitle {
    font-size: calc(1rem + 1 * (100vw - 992px) / (1200 - 992));
    line-height: calc(1.3125rem + 1 * (100vw - 992px) / (1200 - 992));
    letter-spacing: calc(0.375rem + 1 * (100vw - 992px) / (1200 - 992));
  }
  /* .captionBanner {
    height: calc(100px + 15 * (100vw - 992px) / (1200 - 992));
  } */
}
</style>
