<template>
  <router-view v-slot="{ route }">
    <div :key="route.fullPath">
      <Head>
        <Title>{{ pageTitle }}</Title>
      </Head>

      <header
        id="header"
        :style="headerStyle"
      >
        <img
          v-if="titleImg"
          :src="titleImg"
          id="titleImg"
          class="my-6"
          data-testid="title-img"
          fetchpriority="high"
          data-not-lazy
        />
      </header>

      <v-container
        fluid
        id="mainContainer"
        class="mb-4 pb-12 px-1"
      >
        <!-- MAIN VIDEO -->
        <v-row
          no-gutters
          justify="center"
          align="center"
          id="mainVideoContainer"
          class="my-2 my-sm-4 px-2 px-sm-4"
        >
          <v-col
            cols="12"
            align-self="center"
            style="max-width: 960px"
            class="position-relative"
          >
            <iframe
              v-if="mainVideoUrl"
              :src="mainVideoUrl + '?autoplay=1&loop=1&muted=1&color=505050'"
              width="960"
              height="540"
              frameborder="0"
              id="mainVideo"
              data-not-lazy
            />
            <span
              v-html="mainVideoText"
              id="mainVideoText"
              class=""
            />
          </v-col>
        </v-row>

        <!-- VIDEOS -->
        <v-row
          no-gutters
          justify="center"
          id="videos"
        >
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="(video, index) in videos"
            :key="video.title"
            class="mb-2 mb-sm-4 px-2 px-sm-1"
            @click="videoIndex = index"
            data-testid="video-container"
          >
            <VideoThumbnailTravels
              :video="video"
              :preload="index < 4"
            />
          </v-col>
        </v-row>
      </v-container>

      <VideoLightBox
        :videos="videos"
        :index="videoIndex"
        :disable-scroll="true"
        @close="videoIndex = null"
      />

      <BackToTop />
    </div>
  </router-view>
</template>

<script>
export default {
  data() {
    return {
      travelsPgContent: {},
      videoIndex: null,
    };
  },

  computed: {
    pageTitle() {
      return this.travelsPgContent.pageTitle;
    },
    headerBgImg() {
      return this.travelsPgContent.headerBgImg;
    },
    titleImg() {
      return this.travelsPgContent.titleImg;
    },
    mainVideoUrl() {
      return this.travelsPgContent.mainVideoUrl;
    },
    mainVideoText() {
      return this.travelsPgContent.mainVideoText;
    },
    videos() {
      return this.travelsPgContent.videos;
    },
    headerStyle() {
      return {
        '--headerBgImg': 'url(' + this.headerBgImg + ')',
      };
    },
  },

  async mounted() {
    const travelsPgContent = await queryContent('travels').findOne();
    this.travelsPgContent = travelsPgContent;
  },
};
</script>

<script setup>
useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://player.vimeo.com/',
    },
    {
      rel: 'dns-prefetch',
      href: 'https://player.vimeo.com/',
    },
    {
      rel: 'preload',
      href: 'https://res.cloudinary.com/all-about-erik/image/upload/f_auto/v1580641705/Travels/bamyan-banner_kxakxq.jpg',
      as: 'image',
      fetchpriority: 'high',
      crossorigin: true,
    },
    {
      rel: 'preload',
      href: 'https://res.cloudinary.com/all-about-erik/image/upload/f_auto/v1580641704/Travels/travels_rcl4mu.png',
      as: 'image',
      fetchpriority: 'high',
      crossorigin: true,
    },
    {
      rel: 'preload',
      href: 'https://player.vimeo.com/video/293166774',
      as: 'image',
      fetchpriority: 'high',
      crossorigin: true,
    },
    {
      rel: 'preload',
      href: 'https://res.cloudinary.com/all-about-erik/image/upload/f_auto/v1684874213/Travels/abu-dhabi.jpg',
      as: 'image',
      fetchpriority: 'high',
      crossorigin: true,
    },
  ],
});
</script>

<style scoped>
@font-face {
  font-family: NeueHaasGroteskText Pro65;
  src: url('../assets/fonts/nhaasgrotesktxpro-65md.eot'); /* IE9 Compat Modes */
  src: url('../assets/fonts/nhaasgrotesktxpro-65md.eot?#iefix')
      format('embedded-opentype'),
    /* IE6-IE8 */ url('../assets/fonts/nhaasgrotesktxpro-65md.woff')
      format('woff'),
    /* Pretty Modern Browsers */
      url('../assets/fonts/nhaasgrotesktxpro-65md.svg#NHaasGroteskTXPro-55Rg')
      format('svg'); /* Legacy iOS */
  font-weight: normal;
}

#header {
  background-image: var(--headerBgImg);
  background-position: center;
  background-color: rgba(0, 0, 0, 0.32);
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  padding-top: 12.5px;
  padding-bottom: 12.5px;
}

#titleImg {
  max-width: 70%;
}

#mainContainer {
  width: 100%;
  max-width: 2178px;
  padding: 0;
  text-align: center;
}

#mainVideo {
  max-width: 100%;
  --containerWidth: calc(100vw - 32px);
  max-height: calc(0.5625 * var(--containerWidth));
}

#mainVideoText {
  color: white;
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-weight: 500;
  font-size: 1.4375rem;
  letter-spacing: 1px;
  text-align: center;
  text-shadow: 0px 0px 7px rgba(0, 0, 0, 0.5), 0px 0px 7px rgba(0, 0, 0, 0.5);
  line-height: 2.1875rem;
  position: absolute;
  bottom: 70px;
  left: 0;
  right: 0;
  padding: 0 120px;
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
  #mainVideo {
    --containerWidth: calc(100vw - 16px);
  }
  #mainVideoText {
    font-size: 1.125rem;
    line-height: 1.71875rem;
    bottom: 20px;
    padding: 0 10px;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  #mainVideoText {
    font-size: 1.3125rem;
    line-height: 2rem;
    bottom: 40px;
    padding: 0 100px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  #mainVideoText {
    font-size: 1.4rem;
    line-height: 2.125rem;
    bottom: 50px;
    padding: 0 106px;
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) {
  #mainVideoText {
    font-size: 1.4rem;
    line-height: 2.125rem;
    bottom: 60px;
    padding: 0 113px;
  }
}

@media only screen and (min-width: 977px) {
  #mainVideoContainer {
    margin: 8px 0;
  }
}
</style>
