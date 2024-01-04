<template>
  <NuxtLink
    to="/"
    class="logo-link"
  >
    <img
      alt="Home page"
      src="/header/eriks-travels-logo_menu.png"
      height="120"
  /></NuxtLink>

  <div class="nav-items">
    <template
      v-for="menuItem in navMenuItems"
      :key="menuItem.text"
    >
      <NuxtLink :to="menuItem.to">
        <img
          :alt="menuItem.altText"
          :src="`/header/white_${menuItem.img}`"
          height="80"
        />
      </NuxtLink>
    </template>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      navMenuItems: [
        {
          img: "show-reel_menu.png",
          altText: "Showreel",
          to: "/showreel",
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
