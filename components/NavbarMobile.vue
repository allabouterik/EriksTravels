<template>
  <div class="openbtn d-lg-none">
    <img
      alt="Open navigation menu"
      src="@/assets/images/menu-open.png"
      @click="mainNavIsOpen = true"
    />
    <img
      alt="Open navigation menu"
      src="@/assets/images/menu-open-hover.png"
      @click="mainNavIsOpen = true"
      class="img-hover"
    />
  </div>

  <div
    id="sideNav-main"
    class="d-lg-none"
    :class="{ sideNavOpen: mainNavIsOpen }"
  >
    <!-- <Simplebar
      class="simple-scrollbar"
      data-simplebar-auto-hide="true"
    > -->
    <div>
      <div class="closebtn">
        <img
          alt="Close navigation menu"
          src="@/assets/images/menu-close.png"
          @click="closeNav()"
        />
        <img
          alt="Close navigation menu"
          src="@/assets/images/menu-close-hover.png"
          @click="closeNav()"
          class="img-hover"
        />
      </div>

      <!-- <nav
          v-for="menuItem in navMenuItems"
          :key="menuItem.text"
        >
          <button
            v-if="menuItem.to == ' '"
            class="nav_item"
            @mouseover="onNavLinkHover(menuItem)"
          >
            {{ menuItem.text.toUpperCase() }}
          </button>
          <NuxtLink
            v-else
            :to="menuItem.to"
            class="nav_item"
            @mouseover.native="onNavLinkHover(menuItem)"
            >{{ menuItem.text.toUpperCase() }}</NuxtLink
          >
          <hr />
        </nav> -->

      <nav>
        <NuxtLink
          to="/"
          class="d-inline-block pt-0"
        >
          <img
            alt="Home page"
            src="/header/eriks-travels-logo_menu.png"
            height="60"
        /></NuxtLink>

        <div class="nav-items d-flex flex-column align-center">
          <template
            v-for="menuItem in navMenuItems"
            :key="menuItem.text"
          >
            <NuxtLink :to="menuItem.to">
              <img
                :alt="menuItem.altText"
                :src="`/header/white_${menuItem.img}`"
                height="60"
              />
            </NuxtLink>
          </template>
        </div>
      </nav>
    </div>
    <!-- </Simplebar> -->
  </div>
</template>

<script type="text/javascript">
// import Simplebar from "simplebar-vue";

export default {
  // components: {
  //   Simplebar,
  // },

  data() {
    return {
      activeNav: {},
      // documentLoaded: false,
      mainNavIsOpen: false,
      // navMenuItems: null,
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

  watch: {
    $route() {
      this.closeNav();
    },
  },

  // async mounted() {
  //   const navItems = await queryContent("navigation")
  //     .sort({ orderNo: 1 }) // sort ascending
  //     .find();

  //   this.navMenuItems = navItems;
  //   this.documentLoaded = true;
  // },

  methods: {
    closeNav() {
      let mainNav = document.getElementById("sideNav-main");
      mainNav.style.transition = "0.5s";
      mainNav.style.transitionDelay = "0s";
      this.activeNav = {};
      this.mainNavIsOpen = false;
    },
    onNavLinkHover(nav) {
      this.activeNav = this.mainNavIsOpen ? Object.assign({}, nav) : {};
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Lato:100,400&display=swap");
@import url("https://fonts.googleapis.com/css?family=Ubuntu+Condensed&display=swap");

/* The side navigation menu */
#sideNav-main {
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background-color: #222222;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 2000;
  width: 0;
  padding: 25px 0;
  transition: all 0.5s ease 0s;
}

.sideNavOpen {
  width: 300px !important;
  padding: 25px 18px !important;
}

/* The navigation menu links */
#sideNav-main a,
#sideNav-main button {
  text-align: left;
  padding-top: 28px;
  padding-bottom: 28px;
  padding-left: 10px;
}

/* When you mouse over the navigation links, change their color */
#sideNav-main a:hover,
#sideNav-main a.router-link-exact-active,
#sideNav-main button:hover,
#sideNav-main button.router-link-exact-active {
  /* https://stackoverflow.com/questions/46083220/how-to-vuejs-router-link-active-style */
  color: #e30829;
}

#sideNav-main hr {
  border-top: 0.5px solid white;
  border-bottom: 0.5px solid white;
  margin: 0;
}

.nav_item {
  color: white;
  display: block;
  font-family: "Lato", sans-serif;
  font-feature-settings: "liga";
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 3px;
}

.openbtn {
  cursor: pointer;
  display: inline-block;
  padding-bottom: 35px;
  top: 57px;
  right: 57px;
  position: fixed;
  width: 35px;
  z-index: 1000;

  img {
    vertical-align: baseline;
  }
}

.closebtn {
  cursor: pointer;
  display: inline-block;
  position: absolute;
  top: 29px;
  right: 20px;
  width: 35px;
  padding-bottom: 35px;
}

.closebtn .img-hover,
.openbtn .img-hover {
  display: none;
  position: absolute;
  top: 0;
  right: 0px;
  z-index: 3;
}

@media (hover) {
  // .openbtn {
  //   display: inline-block;
  //   padding-bottom: 35px;
  //   // top: 57px;
  //   // right: 57px;
  //   // position: fixed;
  //   width: 35px;
  //   z-index: 1000;
  // }

  .closebtn .img-hover,
  .openbtn .img-hover {
    display: none;
    position: absolute;
    top: 0;
    right: 5px;
    z-index: 3;
  }

  .closebtn:hover .img-hover,
  .openbtn:hover .img-hover {
    display: inline;
  }
}

.simple-scrollbar {
  height: 100%;
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  #sideNav-main {
    padding: 15px 0;
  }

  .sideNavOpen {
    // width: 50% !important;
    width: 100% !important;
    padding: 15px 14px !important;
  }

  .nav_item {
    font-size: 12px;
  }

  .openbtn {
    top: 33px;
    right: 25px;

    img {
      max-width: 40px;
    }
  }

  .closebtn {
    padding-bottom: 20px;

    img {
      max-width: 30px;
    }
  }

  .title-text {
    font-size: 22px;
    letter-spacing: 2.5px;
    line-height: 32px;
  }
}

@media only screen and (max-width: 375.98px) {
  .title-text {
    font-size: 5.3vw;
    letter-spacing: 2px;
    line-height: 30px;
  }
}

@media only screen and (max-width: 370.98px) {
  .title-text {
    font-size: 5.2vw;
    line-height: 30px;
  }
}

@media only screen and (max-width: 359.98px) {
  .title-text {
    font-size: 5.1vw;
    line-height: 29px;
  }
}

@media only screen and (max-width: 344.98px) {
  .title-text {
    font-size: 5vw;
    line-height: 29px;
  }
}

@media only screen and (max-width: 334.98px) {
  .title-text {
    font-size: 4.95vw;
    line-height: 28px;
  }
}

@media only screen and (max-width: 329.98px) {
  .title-text {
    font-size: 4.85vw;
    line-height: 28px;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  #sideNav-main {
    padding: 20px 0;
  }

  .sideNavOpen {
    // width: 202px !important;
    padding: 20px 16px !important;
  }

  .openbtn {
    top: 39px;
    right: 35px;

    img {
      max-width: 50px;
    }
  }

  .closebtn {
    padding-bottom: 20px;

    img {
      max-width: 32px;
    }
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  .openbtn {
    top: 41px;
    right: 46px;

    img {
      max-width: 60px;
    }
  }

  .closebtn {
    padding-bottom: 30px;
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) {
  .openbtn {
    top: 44px;
    right: 44px;

    img {
      max-width: 69px;
    }
  }
}

/* X-Large devices (desktops, 1200px and up) */
@media only screen and (min-width: 1200px) and (max-width: 1499.98px) {
  .openbtn {
    top: 50.5px;
    right: 50.5px;

    img {
      max-width: 73.5px;
    }
  }
}
</style>
