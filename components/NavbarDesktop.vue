<template>
  <nav
    class="nav-container d-none d-lg-flex"
    :class="{
      show: showNavBar,
    }"
  >
    <NavbarDesktopItems />
  </nav>

  <!-- Hack to always have main content start below the nav bar -->
  <nav
    class="nav-container hidden d-none d-lg-flex"
    :class="{ show: showNavBar }"
  >
    <NavbarDesktopItems />
  </nav>
</template>

<script setup>
const props = defineProps({
  showNavBar: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.nav-container {
  display: flex;
  position: fixed;
  width: 50%;
  top: 0;
  left: 0;
  padding: 15px 14px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #000000;
  z-index: 2000;
  opacity: 0;
  height: 0;
  transition: all 2s;

  @include media-breakpoint-up(sm) {
    width: 202px;
    padding: 20px 16px;
  }

  @include media-breakpoint-up(md) {
    width: 100%;
    padding: 0;
  }

  &.show {
    opacity: 1;
    height: auto;
    padding: 0 1rem;
  }

  &.hidden {
    position: unset;
    visibility: hidden;
  }
}
</style>
