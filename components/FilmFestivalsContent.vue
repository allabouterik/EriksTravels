<template>
  <v-container
    fluid
    class="main-col ma-0, pa-0"
  >
    <v-row
      no-gutters
      class="mb-1"
    >
      <v-col class="slideshowCol">
        <div style="height: 100vh"></div>

        <div class="slideshowOverlay">
          <div class="mainContent mx-auto py-3">
            <img
              alt="Erik Jacobsen title image"
              :src="titleImg"
              class="titleImg mb-md-1 mb-lg-2 mb-xl-4"
              data-testid="title-img"
            />
            <div>
              <p class="slideshowText">
                I entered some film festivals, and won awards.
                <br />Preview the entries below.
              </p>
            </div>

            <div class="postersContainer flex flex-col">
              <v-row
                v-for="(row, rIndex) in 2"
                no-gutters
                class="d-flex justify-center"
              >
                <v-col
                  v-for="(poster, index) in posters.slice(
                    rIndex * 3,
                    rIndex * 3 + 3 + rIndex
                  )"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                  :key="poster.img"
                  class="pb-1"
                >
                  <router-link
                    :to="poster.link"
                    class="posterLink"
                  >
                    <img
                      :src="poster.img"
                      alt="Film festival poster"
                      class="posterLinkImg"
                    />
                  </router-link>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- BACKGROUND VIDEO -->
    <video
      v-if="bgVideo"
      autoplay
      loop
      muted
      class="bgVideo"
    >
      <!-- <source
        :src="bgVideo.videoSrcWebm"
        type="video/webm"
      /> -->
      <source
        :src="bgVideo.videoSrcMP4"
        type="video/mp4"
      />
    </video>
  </v-container>
</template>

<script>
export default {
  name: "FilmFestivalsContent",

  data() {
    return {
      bgVideo: {
        videoSrcMP4:
          "https://res.cloudinary.com/all-about-erik/video/upload/ac_none,q_auto:eco/Eriks%20Travels/Film%20Festivals/film-festivals-background-vid.mp4",
        // videoSrcWebm:
        //   "https://res.cloudinary.com/all-about-erik/video/upload/ac_none,q_auto:eco/Eriks%20Travels/Film%20Festivals/film-festivals-background-vid-webm.webm",
      },
      titleImg: "/film-festivals/film-festivals_title.png",
      posters: [
        {
          title: "Boyhood",
          img: "/film-festivals/festivals-poster-boyhood.jpg",
          link: "/film-festivals/boyhood",
        },
        {
          title: "Egypt",
          img: "/film-festivals/festivals-poster-egypt.jpg",
          link: "/film-festivals/egypt",
        },
        {
          title: "Japan",
          img: "/film-festivals/festivals-poster-japan.jpg",
          link: "/film-festivals/japan",
        },
        {
          title: "Long Ago",
          img: "/film-festivals/festivals-poster-long-ago.jpg",
          link: "/film-festivals/long-ago",
        },
        {
          title: "Norway",
          img: "/film-festivals/festivals-poster-norway.jpg",
          link: "/film-festivals/norway",
        },
        {
          title: "Romania",
          img: "/film-festivals/festivals-poster-romania.jpg",
          link: "/film-festivals/romania",
        },
        {
          title: "Seafood",
          img: "/film-festivals/festivals-poster-seafood.jpg",
          link: "/film-festivals/seafood",
        },
      ],
      windowWidth: 0,
    };
  },

  async mounted() {
    // this.filmFestivalsContent = await queryContent("filmFestivals").findOne();

    this.onResize();
    window.addEventListener("resize", this.onResize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
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
  top: 5%;
  z-index: 10;
}

.mainContent {
  bottom: 0;
  // max-width: 900px;
  max-width: calc((4 * 247px) + (3 * 8px)); // posters are 247px wide
  // padding-left: 5%;
  // padding-right: 5%;
  text-align: center;
  background-color: rgba(#ffffff, 0.85);
  z-index: 20;
}

.titleImg {
  width: 100%;
  height: auto;
  margin: auto;
  // padding-bottom: 15px;
  max-width: 323px;
}

.slideshowText {
  color: #000000;
  font-family: "Libre Baskerville", serif;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: 2px;
  text-align: center;
  text-wrap: wrap;

  @include media-breakpoint-up(sm) {
    font-size: 1.25rem;
  }

  @include media-breakpoint-up(md) {
    font-size: 1.5rem;
  }

  @include media-breakpoint-up(lg) {
    font-size: 1.75rem;
  }

  @include media-breakpoint-up(xl) {
    font-size: 1.875rem;
  }
}

.postersContainer {
  display: flex;
  margin-top: 2rem;
}

.posterLink {
  display: flex;
  position: relative;
  justify-content: center;

  .posterLinkImg {
    // position: absolute;
    // display: block;
    // width: 80%;
    // height: 100%;

    // @include media-breakpoint-up(sm) {
    //   width: 70%;
    // }

    // @include media-breakpoint-up(md) {
    //   width: 65%;
    // }

    // &.hover {
    //   position: relative;
    //   visibility: hidden;
    // }
  }

  // &:hover {
  //   .linkImg {
  //     visibility: hidden;

  //     &.hover {
  //       visibility: visible;
  //     }
  //   }
  // }
}

.bgVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  // opacity: 0.22;
  z-index: -1;
}
</style>
