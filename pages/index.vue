<template>
  <router-view v-slot="{ route }">
    <div :key="route.fullPath">
      <Head>
        <Title>{{ pageTitle }}</Title>
      </Head>

      <BackgroundMusic
        :audioFile="audioFile"
        :audioDuration="audioDuration"
        :audioFadeInDuration="audioFadeInDuration"
        :audioFadeOutDuration="audioFadeOutDuration"
      />

      <v-container
        fluid
        class="pa-0"
      >
        <div class="contentContainer">
          <div class="content">
            <div class="mainContent">
              <img
                alt="All About Erik logo"
                v-if="titleImg != null"
                :src="titleImg"
                class="titleImg"
                data-testid="title-img"
                fetchpriority="high"
                data-not-lazy
              />
              <div>
                <ContentRenderer :value="homePgContent">
                  <ContentRendererMarkdown
                    :value="homePgContent"
                    tag="span"
                    class="homePgMainText"
                  />
                  <template #empty>
                    <p>No content found.</p>
                  </template>
                </ContentRenderer>
              </div>
            </div>

            <div class="secondaryContent">
              <span
                v-html="creditText"
                class="homePgCreditText"
              />
            </div>
          </div>
        </div>
      </v-container>

      <div
        v-show="slides"
        class="slideshow"
      >
        <SlideshowKenBurns :slides="slides" />
      </div>
    </div>
  </router-view>
</template>

<script setup>
useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      crossorigin: true,
      href: 'https://res.cloudinary.com/all-about-erik/image/upload/f_auto/v1580951957/Home%20Page/allabouterikwhite4-11-18_kwflva.png',
      fetchpriority: 'high',
    },
    {
      rel: 'preload',
      as: 'image',
      crossorigin: true,
      href: 'https://res.cloudinary.com/all-about-erik/image/upload/f_auto/v1580951957/Home%20Page/slide-1-erik-studio.jpg',
      fetchpriority: 'high',
    },
  ],
});
</script>

<script>
export default {
  data() {
    return {
      homePgContent: {},
    };
  },

  computed: {
    pageTitle() {
      return this.homePgContent.pageTitle;
    },
    titleImg() {
      return this.homePgContent.headingImg;
    },
    slides() {
      return this.homePgContent.slides;
    },
    images() {
      return this.slides.map((a) => a.img);
    },
    creditText() {
      return this.homePgContent.creditText;
    },
    audioFile() {
      return this.homePgContent.bgAudio;
    },
    audioDuration() {
      return this.homePgContent.bgAudioDuration;
    },
    audioFadeInDuration() {
      return this.homePgContent.bgAudioFadeInDuration;
    },
    audioFadeOutDuration() {
      return this.homePgContent.bgAudioFadeOutDuration;
    },
  },

  async mounted() {
    const homePgContent = await queryContent('home').findOne();
    this.homePgContent = homePgContent;
  },
};
</script>

<style lang="scss">
body {
  overflow: hidden;
}
</style>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Libre+Baskerville&display=swap');

.slideshow {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.contentContainer {
  /* Absolute Centering in CSS: https://codepen.io/shshaw/full/gEiDt */
  position: absolute;
  width: 80%;
  margin: auto;
  left: 0;
  right: 0;
  top: 14%;
  z-index: 100;
  height: 86%;
}

.content {
  position: relative;
  height: 100%;
}

.mainContent {
  position: relative;
}

.titleImg {
  display: block;
  width: 100%;
  max-width: 1492px;
  height: auto;
  position: relative;
  margin: auto;
}

.homePgMainText {
  color: white;
  font-family: 'Libre Baskerville', serif;
  font-size: calc(1em + 0.5vw);
  text-align: center;
  width: 80%;
  line-height: 135%;
  z-index: 100;
  position: relative;
}

.secondaryContent {
  position: absolute;
  bottom: 50px;
  text-align: center;
  right: -6.5%;
}

.homePgCreditText {
  color: white;
  font-family: 'Libre Baskerville', serif;
  font-size: 14px;
  bottom: 0;
}

/* Centre credit text when aspect ratio <= 1.0 */
@media only screen and (max-aspect-ratio: 1/1) {
  .secondaryContent {
    position: absolute;
    bottom: 50px;
    right: 0;
    width: 100%;
    text-align: center;
  }
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  .openbtn {
    top: 25px;
    left: 25px;
  }

  .homePgMainText {
    font-size: calc(0.75em + 0.75vw);
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  .openbtn {
    top: 35px;
    left: 35px;
  }

  .homePgMainText {
    font-size: calc(0.65em + 0.65vw);
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  .openbtn {
    top: 46px;
    left: 46px;
  }

  .homePgMainText {
    font-size: calc(0.875em + 0.625vw);
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) {
  .homePgMainText {
    font-size: calc(0.875em + 0.625vw);
  }
}
</style>
