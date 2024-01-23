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

      <nav>
        <NuxtLink
          to="/home"
          class="d-inline-block pt-0"
        >
          <img
            alt="Home page"
            :src="`/header/eriks-travels-logo-${
              $route.path === '/home' ? 'yellow' : 'white'
            }.png`"
            height="60"
        /></NuxtLink>

        <div class="nav-items d-flex flex-column align-center">
          <template
            v-for="menuItem in navMenuItems"
            :key="menuItem.text"
          >
            <!-- <button
              v-if="menuItem.to == ' '"
              @mouseover="onNavLinkHover(menuItem)"
            >
              {{ menuItem.text.toUpperCase() }}
            </button>
            <NuxtLink
              v-else
              :to="menuItem.to"
              @mouseover.native="onNavLinkHover(menuItem)"
              >{{ menuItem.text.toUpperCase() }}</NuxtLink
            > -->
            <NuxtLink :to="menuItem.to">
              <img
                :alt="menuItem.altText"
                :src="`/header/${
                  $route.path === menuItem.to ? 'yellow' : 'white'
                }_${menuItem.img}`"
                height="60"
              />
            </NuxtLink>
          </template>
        </div>
      </nav>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      activeNav: {},
      mainNavIsOpen: false,
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

  mounted() {
    console.log("navbarMobile mounted");
    console.log("this.$route.path: ", this.$route.path);
  },

  watch: {
    $route() {
      console.log("navbarMobile watch $route");
      console.log("this.$route.path: ", this.$route.path);
      this.closeNav();
    },
  },

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
  padding: 15px 0;
  transition: all 0.5s ease 0s;

  @include media-breakpoint-up(sm) {
    padding: 20px 0;
  }

  @include media-breakpoint-up(md) {
    padding: 25px 0;
  }

  /* The navigation menu links */
  a,
  button {
    text-align: left;
    padding-top: 28px;
    padding-bottom: 28px;
    padding-left: 10px;
  }

  /* When you mouse over the navigation links, change their color */
  a:hover,
  a.router-link-exact-active,
  button:hover,
  button.router-link-exact-active {
    /* https://stackoverflow.com/questions/46083220/how-to-vuejs-router-link-active-style */
    color: #e30829;
  }

  hr {
    border-top: 0.5px solid white;
    border-bottom: 0.5px solid white;
    margin: 0;
  }
}

.sideNavOpen {
  width: 90% !important;
  max-width: 300px !important;
  padding: 15px 14px !important;

  @include media-breakpoint-up(sm) {
    padding: 20px 16px !important;
  }

  @include media-breakpoint-up(md) {
    padding: 25px 18px !important;
  }
}

.openbtn {
  display: inline-block;
  position: fixed;
  top: 33px;
  right: 25px;
  z-index: 1000;
  cursor: pointer;

  img {
    vertical-align: baseline;
  }

  @include media-breakpoint-up(sm) {
    top: 39px;
    right: 35px;
  }

  @include media-breakpoint-up(md) {
    top: 41px;
    right: 46px;
  }
}

.openbtn,
.openbtn img {
  width: 40px;

  @include media-breakpoint-up(sm) {
    width: 50px;
  }

  @include media-breakpoint-up(md) {
    width: 60px;
  }
}

.closebtn {
  display: inline-block;
  position: absolute;
  top: 29px;
  right: 20px;
  cursor: pointer;
}

.closebtn,
.closebtn img {
  width: 30px;

  @include media-breakpoint-up(sm) {
    width: 32px;
  }

  @include media-breakpoint-up(md) {
    width: 35px;
  }
}

.closebtn .img-hover,
.openbtn .img-hover {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
}

@media (hover) {
  .closebtn .img-hover,
  .openbtn .img-hover {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 3;
  }

  .closebtn:hover .img-hover,
  .openbtn:hover .img-hover {
    display: inline;
  }
}
</style>
