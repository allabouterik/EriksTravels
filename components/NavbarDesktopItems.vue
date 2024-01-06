<template>
  <NuxtLink
    to="/home"
    class="logo-link"
  >
    <img
      alt="Home page"
      src="/header/eriks-travels-logo-white.png"
      height="100"
      class="menuImg" />
    <img
      alt="Home page"
      src="/header/eriks-travels-logo-yellow.png"
      height="100"
      class="menuImg hover"
  /></NuxtLink>

  <div class="nav-items">
    <template
      v-for="menuItem in navMenuItems"
      :key="menuItem.text"
    >
      <NuxtLink
        v-if="menuItem.to"
        :to="menuItem.to"
        class="menuLink"
      >
        <img
          :alt="menuItem.altText"
          :src="`/header/white_${menuItem.img}`"
          height="60"
          class="menuImg"
        />
        <img
          :alt="menuItem.altText"
          :src="`/header/yellow_${menuItem.img}`"
          height="60"
          class="menuImg hover"
        />
      </NuxtLink>
      <button
        v-else-if="menuItem.video"
        class="menuLink"
        @click="
          // scrollContainer = false;
          videos = [menuItem.video];
          videoIndex = 0;
        "
      >
        <img
          :alt="menuItem.altText"
          :src="`/header/white_${menuItem.img}`"
          height="60"
          class="menuImg"
        />
        <img
          :alt="menuItem.altText"
          :src="`/header/yellow_${menuItem.img}`"
          height="60"
          class="menuImg hover"
        />
      </button>
    </template>

    <VideoLightBox
      :videos="videos"
      :index="videoIndex"
      :disable-scroll="true"
      @close="
        videos = null;
        videoIndex = null;
        // scrollContainer = true;
      "
    />
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      navMenuItems: [
        // {
        //   img: "show-reel_menu.png",
        //   altText: "Show Reel",
        //   to: "/showreel",
        // },
        {
          img: "show-reel_menu.png",
          altText: "Show Reel",
          video: {
            title: "Show Reel",
            url: "https://player.vimeo.com/video/877457983",
          },
        },
        {
          img: "film-portfolio_menu.png",
          altText: "Film Portfolio",
          to: "/film-portfolio",
        },
        {
          img: "the-producer_menu.png",
          altText: "The Producer",
          to: "/producer",
        },
        {
          img: "film-festivals_menu.png",
          altText: "Film Festivals",
          to: "/film-festivals",
        },
        {
          img: "contact-credits_menu.png",
          altText: "Contact and Credits",
          to: "/contact",
        },
      ],
      videos: null,
      videoIndex: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.logo-link {
  position: relative;
  padding: 8px 16px 8px 0;

  .menuImg {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate3d(0%, -50%, 0);

    &.hover {
      position: relative;
      visibility: hidden;
    }
  }

  &:hover {
    .menuImg {
      visibility: hidden;

      &.hover {
        visibility: visible;
      }
    }
  }
}

.nav-items {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}

.menuLink {
  position: relative;
  height: 100%;

  .menuImg {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate3d(-50%, -50%, 0);

    &.hover {
      visibility: hidden;
    }
  }

  &:hover {
    .menuImg {
      visibility: hidden;

      &.hover {
        visibility: visible;
      }
    }
  }
}
</style>
