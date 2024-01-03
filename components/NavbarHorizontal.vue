<template>
  <nav class="nav-container">
    <NuxtLink to="/" class="logo-link">
      <img
        alt="Home page"
        src="/eriks-travels/eriks-travels-white-2line-temp.png"
        width="250"
    /></NuxtLink>

    <div class="nav-items">
      <template v-for="menuItem in navMenuItems" :key="menuItem.text">
        <NuxtLink :to="menuItem.to" class="nav_item">
          <img
            :alt="menuItem.altText"
            :src="`/eriks-travels/${menuItem.img}`"
            width="200"
          />
        </NuxtLink>
      </template>
    </div>
  </nav>
  <!-- Hack to always have main content start below the nav bar -->
  <nav class="nav-container hidden">
    <template v-for="menuItem in navMenuItems" :key="menuItem.text">
      <NuxtLink :to="menuItem.to" class="nav_item">
        <img
          :alt="menuItem.altText"
          :src="`eriks-travels/${menuItem.img}`"
          width="200"
        />
      </NuxtLink>
    </template>
  </nav>
</template>

<script type="text/javascript">
// import snarkdown from 'snarkdown';

export default {
  data() {
    return {
      navMenuItems: [
        {
          img: 'film-portfolio.png',
          altText: 'Film Portfolio',
          to: '/film-portfolio',
        },
        {
          img: 'showreel.png',
          altText: 'Showreel',
          to: '/showreel',
        },
        {
          img: 'producer.png',
          altText: 'The Producer',
          to: '/producer',
        },
        {
          img: 'film-festivals.png',
          altText: 'Film Festivals',
          to: '/film-festivals',
        },
        {
          img: 'contact.png',
          altText: 'Contact and Credits',
          to: '/contact',
        },
      ],
    };
  },

  computed: {},

  // async mounted() {
  //   const navItems = await queryContent('navigation')
  //     .sort({ orderNo: 1 }) // sort ascending
  //     .find();

  //   this.navMenuItems = navItems;
  // },

  // methods: {
  //   renderMarkdown(text) {
  //     return snarkdown(text);
  //   },
  // },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Lato:100,400&display=swap');

.nav-container {
  display: flex;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  padding: 16px;
  background-color: #222222;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 2000;

  &.hidden {
    position: unset;
    visibility: hidden;
  }

  .logo-link {
    padding: 8px 16px 8px 0;
  }

  .nav-items {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
  }

  a:hover,
  a.router-link-exact-active,
  button:hover,
  button.router-link-exact-active {
    // https://stackoverflow.com/questions/46083220/how-to-vuejs-router-link-active-style
    color: #e30829;
  }

  .nav_item {
    color: white;
    display: block;
    font-family: 'Lato', sans-serif;
    font-feature-settings: 'liga';
    // font-size: 14px;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 3px;
  }
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  .nav-container {
    width: 50% !important;
    padding: 15px 14px !important;

    .nav_item {
      font-size: 12px;
    }
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  .nav-container {
    width: 202px !important;
    padding: 20px 16px !important;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) {
}

/* X-Large devices (desktops, 1200px and up) */
@media only screen and (min-width: 1200px) and (max-width: 1499.98px) {
}
</style>
