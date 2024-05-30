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
          @click="openVideo"
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
    </div>
  </router-view>
</template>

<script setup>
import { useMainStore } from "@/stores/mainStore";

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

const videos = [
  {
    // title: "Show Reel"˚,
    url: "https://player.vimeo.com/video/877457983",
  },
];

const store = useMainStore();

const openVideo = () => {
  store.openVideoLightBox(videos, 0, true);
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

@keyframes zoom {
  0% {
    background-size: 100% auto;
  }
  50% {
    background-size: 120% auto;
  }
  100% {
    background-size: 100% auto;
  }
}

.showreel {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-image: url("/showreel-fireplace-wall.jpg");
  background-position: center;
  background-size: contain;
  animation: zoom 20s linear infinite;

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
