<template>
  <NuxtLink
    to="/home"
    class="logo-link"
  >
    <img
      alt="Home page"
      src="/header/eriks-travels-logo_menu.png"
      height="100"
  /></NuxtLink>

  <div class="nav-items">
    <template
      v-for="menuItem in navMenuItems"
      :key="menuItem.text"
    >
      <NuxtLink
        v-if="menuItem.to"
        :to="menuItem.to"
      >
        <img
          :alt="menuItem.altText"
          :src="`/header/white_${menuItem.img}`"
          height="60"
        />
      </NuxtLink>
      <button
        v-else-if="menuItem.video"
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
  padding: 8px 16px 8px 0;
}

.nav-items {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}
</style>
