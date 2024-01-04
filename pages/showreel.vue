<template>
  <router-view v-slot="{ route }">
    <div :key="route.fullPath">
      <Head>
        <Title>Show Reel</Title>
      </Head>

      <div class="videoContainer">
        <iframe
          src="https://player.vimeo.com/video/877457983?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&autoplay=1&loop=1&muted=0"
          allow="autoplay; fullscreen; picture-in-picture"
          frameborder="0"
          title="Show Reel"
          id="mainVideo"
          class="videoIframe"
          data-not-lazy
        />
      </div>
    </div>
  </router-view>
</template>

<script setup>
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
</script>

<style lang="scss" scoped>
.videoContainer {
  position: relative;
  height: 100vh;
  overflow-y: hidden;

  @media screen and (min-width: 992px) {
    height: calc(100vh - 168px); // to account for the navbar on desktop
  }
}

.videoIframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
