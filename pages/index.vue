<template>
  <router-view v-slot="{ route }">
    <div :key="route.fullPath">
      <div class="showreel">
        <div class="siteLogo">
          <img
            alt="Site logo"
            src="/header/eriks-travels-logo-white.png"
            height="150"
          />
        </div>

        <div
          class="playImgContainer"
          @click="videoIndex = 0"
        >
          <img
            src="~/assets/images/playarrowcircle-rough.png"
            class="playImg"
          />
          <img
            src="~/assets/images/playarrowcircle-rough_hover.png"
            class="playImg hover"
          />
        </div>

        <div class="skipToMenuContainer">
          <a
            href="/home"
            class="skipToMenuLink"
          >
            <img
              src="~/assets/images/skip-to-menu.png"
              class="skipToMenuImg"
            />
            <img
              src="~/assets/images/skip-to-menu_hover.png"
              class="skipToMenuImg hover"
            />
          </a>
        </div>
      </div>

      <VideoLightBox
        :videos="videos"
        :index="videoIndex"
        :autoplay="true"
        :disable-scroll="true"
        :windowPercentage="1"
        @close="onVideoClose"
      />
    </div>
  </router-view>
</template>

<script setup>
import { reactive, ref } from "vue";

useHead({
  link: [
    {
      rel: "preconnect",
      href: "https://player.vimeo.com/",
    },
    {
      rel: "dns-prefetch",
      href: "https://player.vimeo.com/",
    },
  ],
});

const videos = reactive([
  {
    // title: "Show Reel"˚,
    url: "https://player.vimeo.com/video/877457983",
  },
]);

const videoIndex = ref(null);

const onVideoClose = () => {
  videoIndex.value = null;
  setTimeout(async () => {
    await navigateTo("/home");
  }, 1000);
};
</script>

<style lang="scss" scoped>
.siteLogo {
  display: flex;
  justify-content: center;
  padding-top: 2rem;

  img {
    max-height: 100px;

    @include media-breakpoint-up(sm) {
      max-height: 120px;
    }

    @include media-breakpoint-up(md) {
      max-height: 150px;
    }
  }
}

.showreel {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-image: url("/showreel-fireplace-wall.jpg");
  background-position: center;
  background-size: contain;

  .playImgContainer {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 150px;
    height: 150px;
    transform: translate3d(-50%, -50%, 0);
    cursor: pointer;

    .playImg {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100px;
      transform: translate3d(-50%, -50%, 0);

      &.hover {
        visibility: hidden;
      }
    }

    &:hover {
      .playImg {
        visibility: hidden;

        &.hover {
          visibility: visible;
        }
      }
    }
  }
}

.skipToMenuContainer {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate3d(-50%, 100%, 0);
}

.skipToMenuLink {
  display: block;
  z-index: 10;
  cursor: pointer;

  .skipToMenuImg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    transform: translate3d(-50%, -50%, 0);

    &.hover {
      visibility: hidden;
    }

    @include media-breakpoint-up(sm) {
      width: 240px;
    }

    @include media-breakpoint-up(md) {
      width: 260px;
    }
  }

  &:hover {
    .skipToMenuImg {
      visibility: hidden;

      &.hover {
        visibility: visible;
      }
    }
  }
}
</style>
