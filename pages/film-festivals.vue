<template>
  <router-view v-slot="{ route }">
    <div :key="route.fullPath">
      <Head>
        <Title>{{ pageTitle }}</Title>
      </Head>

      <v-container
        fluid
        class="main-col ma-0, pa-0"
      >
        <v-row
          no-gutters
          class="mb-1"
        >
          <v-col class="slideshowCol">
            <div class="slideshowOverlay">
              <div class="mainContent mx-auto py-0"></div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </router-view>
</template>

<script>
export default {
  data() {
    return {
      producerPgContent: {},
      windowWidth: 0,
    };
  },

  async mounted() {
    this.producerPgContent = await queryContent("producer").findOne();

    onResize();
    window.addEventListener("resize", onResize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", onResize);
  },

  computed: {
    pageTitle() {
      return this.producerPgContent.pageTitle;
    },
    titleImg() {
      return this.producerPgContent.titleImg;
    },
  },

  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
};
</script>

<style scoped lang="scss">
.main-col {
  max-width: 100%;
  min-height: 600px;
  position: fixed;
  z-index: 0;
}

.slideshowCol {
  position: relative;
  width: auto;
  text-align: center;
  overflow-x: hidden;
  overflow-y: hidden;
}

.slideshowOverlay {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;

  @include media-breakpoint-up(lg) {
    top: calc(50% - (0.5 * 148px));
  }
}

.mainContent {
  bottom: 0;
  max-width: 900px;
  padding-left: 5%;
  padding-right: 5%;
  text-align: center;
  z-index: 20;
}
</style>
