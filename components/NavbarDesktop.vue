<template>
  <nav class="nav-container d-none d-lg-flex">
    <NavbarDesktopItems />
  </nav>

  <!-- Hack to always have main content start below the nav bar -->
  <nav class="nav-container hidden d-none d-lg-flex">
    <NavbarDesktopItems />
  </nav>
</template>

<style lang="scss" scoped>
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
}

/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  .nav-container {
    width: 50% !important;
    padding: 15px 14px !important;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  .nav-container {
    width: 202px !important;
    padding: 20px 16px !important;
  }
}
</style>
