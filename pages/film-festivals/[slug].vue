<template>
  <Head>
    <Title>Film Festivals - {{ title }}</Title>
  </Head>

  <v-container
    fluid
    class="main-col pa-0"
  >
    <v-row
      no-gutters
      class="mb-1"
    >
      <v-col class="ml-5">
        <a
          href="/film-festivals"
          class="block w-fit"
        >
          <img
            src="/film-festivals/back-to-festivals.png"
            alt="Back to festivals"
            class="h-[33px] sm:h-[40px] md:h-[45px]"
          />
        </a>
      </v-col>
    </v-row>

    <v-row
      no-gutters
      class="!mb-[0.5rem] md:!mb-4"
    >
      <v-col>
        <VideoCarousel
          :videos="trailerVideoArr"
          :autoplay="false"
          :windowPercentage="0.58"
          :prevLink="prevLink"
          :nextLink="nextLink"
          :fullVideo="fullVideoArr[0]"
        />
      </v-col>
    </v-row>

    <div
      id="info-container"
      class="w-full py-10 px-4 2xl:px-16 bg-white"
    >
      <div
        id="grid-container"
        :class="{
          withLocations: locations && locations.length > 0,
          withReviewPoster: reviewPoster && reviewPoster.small,
          noDetails: !showDetailsSection,
        }"
      >
        <!-- POSTER -->
        <div id="grid-item-poster">
          <img
            :src="posterImg"
            alt="Film festival poster"
            class="posterLinkImg w-[128px] md:w-[163px] lg:w-[179px] 2xl:w-[276px] object-contain self-start cursor-pointer"
            @click="openImageLightBox(posterImg)"
          />
        </div>

        <!-- TITLE -->
        <div id="grid-item-title">
          <h2
            class="text-et-heading-24 2xl:text-et-heading-34 text-black uppercase whitespace-pre-line"
            v-html="displayTitle ?? title"
          ></h2>
        </div>

        <!-- INFO -->
        <div
          id="grid-item-info"
          class="text-black md:pt-1 lg:pt-0"
        >
          <template
            v-for="(value, key) in info"
            :key="key"
          >
            <p class="info capitalize mb-0">
              {{ key.replace(/([A-Z])/g, " $1").trim() }}:
              {{
                Array.isArray(value) &&
                ["editors", "music", "footage"].includes(key)
                  ? value.reduce(
                      (acc, curr, i) => acc + (i === 0 ? "" : " / ") + curr,
                      ""
                    )
                  : value
              }}
            </p>
          </template>
        </div>

        <!-- DESCRIPTION -->
        <div id="grid-item-description">
          <p
            v-html="description"
            class="text-et-body-15 2xl:text-et-body-24 text-black text-justify"
          ></p>
        </div>

        <!-- DETAILS / LOCATIONS HEADING -->
        <div
          v-if="showDetailsSection"
          id="grid-item-details-heading"
          class="hidden 2xl:flex items-end"
        >
          <h2
            class="text-et-heading-22 2xl:text-et-heading-34 text-black uppercase"
          >
            Details
            {{ locations && locations.length > 0 ? " / Locations" : "" }}
          </h2>
        </div>

        <!-- DETAILS / LOCATIONS -->
        <div
          v-if="showDetailsSection"
          id="grid-item-details"
        >
          <h2
            class="2xl:hidden text-et-heading-22 2xl:text-et-heading-34 text-black uppercase"
          >
            Details {{ locations ? " / Locations" : "" }}
          </h2>
          <p
            v-if="details && details !== ''"
            class="text-et-body-15 2xl:text-et-body-24 text-black text-justify"
          >
            {{ details }}
          </p>
          <ul v-if="locations && locations.length > 0">
            <li
              v-for="location in locations"
              class="text-et-body-15 2xl:text-et-body-24 text-black list-none"
            >
              {{ location }}
            </li>
          </ul>
        </div>

        <!-- REVIEWS POSTER -->
        <div
          v-if="reviewPoster && reviewPoster.small"
          id="grid-item-reviews-poster"
        >
          <img
            v-if="reviewPoster"
            :src="reviewPoster.small"
            alt="Review poster"
            class="w-[128px] md:w-[163px] lg:w-[179px] 2xl:w-[276px] object-contain self-start cursor-pointer"
            @click="openImageLightBox(reviewPoster.large)"
          />
        </div>

        <!-- REVIEWS -->
        <div
          v-if="reviews && reviews !== ''"
          id="grid-item-reviews"
        >
          <h2
            class="text-et-heading-22 2xl:text-et-heading-34 text-black uppercase"
          >
            Reviews
          </h2>
          <p
            v-html="reviews"
            class="text-et-body-15 2xl:text-et-body-24 text-black text-justify"
          ></p>
          <a
            v-if="reviewLink"
            :href="reviewLink"
            target="_blank noopener"
            class="text-et-body-15 2xl:text-et-body-24 text-et-link text-justify"
            >{{ reviewLink }}</a
          >
        </div>
      </div>

      <!-- LAURELS -->
      <div
        v-if="laurelsLength > 0"
        class="laurels-container"
      >
        <div class="!p-0">
          <h2
            class="text-et-heading-22 2xl:text-et-heading-34 text-black uppercase mb-2"
          >
            Festival Awards
          </h2>
          <div class="flex flex-wrap gap-y-4 justify-start">
            <div
              v-for="index in laurelsLength"
              :key="index"
              class="flex justify-center align-middle gap-y-4 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-[11.11%]"
            >
              <img
                :src="`/film-festivals/laurels/${slug}/${index
                  .toString()
                  .padStart(2, '0')}.png`"
                alt="Award"
                class="max-w-36 max-h-24 h-fit self-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <v-row
      v-if="laurelsLength > 0"
      class="laurels-container gap-x-20"
    >
      <v-col class="!p-0">
        <h2 class="text uppercase mb-2">Festival Awards</h2>
        <div class="flex flex-wrap gap-y-4 justify-start">
          <div
            v-for="index in laurelsLength"
            :key="index"
            class="flex justify-center align-middle gap-y-4 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-[11.11%]"
          >
            <img
              :src="`/film-festivals/laurels/${slug}/laurel_${index
                .toString()
                .padStart(2, '0')}.png`"
              alt="Award"
              class="max-h-24"
            />
          </div>
        </div>
      </v-col>
    </v-row> -->
    <ImageLightBox
      v-if="lightboxImage"
      :images="lightboxImage"
      :index="lightboxImageIndex"
      :disable-scroll="true"
      @close="
        lightboxImageIndex = null;
        lightboxImage = null;
      "
      :centreTitle="false"
    />
  </v-container>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useMainStore } from "@/stores/mainStore";

const route = useRoute();

const title = ref("");
const displayTitle = ref("");
const description = ref("");
const details = ref("");
const locations = ref([]);
const reviews = ref("");
const reviewLink = ref("");
const reviewPoster = ref({});
const info = ref({});
const posterImg = ref("");
const prevLink = ref({});
const nextLink = ref({});
const trailerVideoArr = ref([]);
const fullVideoArr = ref([]);
const lightboxImage = ref(null);
const lightboxImageIndex = ref(null);
const laurelsLength = ref(0);

const slug = route.params.slug;

const store = useMainStore();

onMounted(async () => {
  const festivalsContent = await queryContent("film-festivals").findOne();

  const currIndex = festivalsContent?.festivals?.findIndex(
    (filmFestival) => filmFestival.slug === slug
  );

  if (currIndex === -1) {
    return;
  }

  const prevIndex =
    currIndex - 1 < 0 ? festivalsContent.festivals.length - 1 : currIndex - 1;
  prevLink.value =
    prevIndex >= 0
      ? {
          url: `/film-festivals/${festivalsContent.festivals[prevIndex].slug}`,
          title: festivalsContent.festivals[prevIndex].title,
        }
      : {};

  const nextIndex =
    currIndex + 1 >= festivalsContent.festivals.length ? 0 : currIndex + 1;
  nextLink.value =
    nextIndex >= 0
      ? {
          url: `/film-festivals/${festivalsContent.festivals[nextIndex].slug}`,
          title: festivalsContent.festivals[nextIndex].title,
        }
      : {};

  const festival = festivalsContent.festivals[currIndex];
  title.value = festival.title;
  displayTitle.value = festival.displayTitle;
  description.value = festival.description;
  details.value = festival.details;
  locations.value = festival.locations;
  reviews.value = festival.reviews;
  reviewLink.value = festival.reviewLink;
  reviewPoster.value = festival.reviewPoster;
  info.value = festival.info;
  posterImg.value = festival.posterImg;
  trailerVideoArr.value = [{ url: festival.trailerVideoUrl }];
  fullVideoArr.value = [{ url: festival.fullVideoUrl }];
  laurelsLength.value = festival.laurelsLength || 0;

  const openFullVideo = route.query.openFullVideo === "true";
  if (openFullVideo) {
    openVideo(fullVideoArr.value, 0);
  }
});

const showDetailsSection = computed(
  () =>
    (details.value && details.value !== "") ||
    (locations.value && locations.value.length > 0)
);

const openVideo = (videoArr, videoIndex) => {
  store.openVideoLightBox(videoArr, videoIndex, true);
};

const openImageLightBox = (image) => {
  lightboxImage.value = [{ img: image, caption: "" }];
  lightboxImageIndex.value = 0;
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Inria+Sans&display=swap");

.main-col {
  font-family: "NeueHaasGroteskText Pro55", "ui-sans-serif", "system-ui",
    "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    "Noto Color Emoji";
  font-feature-settings: "liga";
  font-weight: 400;
  margin: 0;
  margin-top: 33px; // matches the top value of .openbtn in NavbarMobile.vue

  @include media-breakpoint-up(sm) {
    margin-top: 39px;
  }

  @include media-breakpoint-up(md) {
    margin-top: 41px;
  }

  @include media-breakpoint-up(lg) {
    margin-top: 0;
  }
}

.laurels-container {
  background-color: white;
  // padding: 2rem;
}

#grid-container {
  --row-gap: 1.5rem;
  --column-gap: 0.5rem;
  --max-width: 678px;

  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: min-content 1fr repeat(3, min-content);
  grid-template-areas:
    "poster title"
    "poster info"
    "description description"
    "details details"
    "reviews reviews";

  &.withReviewPoster {
    grid-template-areas:
      "poster title"
      "poster info"
      "description description"
      "details details"
      "reviewsPoster reviews";
  }

  gap: var(--row-gap) var(--column-gap);
  max-width: var(--max-width);
  margin: 0 auto var(--row-gap) auto;

  @include media-breakpoint-up(sm) {
    --row-gap: 1rem;
    --column-gap: 1rem;
  }

  @include media-breakpoint-up(lg) {
    --max-width: 812px;

    grid-template-columns: minmax(min-content, 230px) 1fr;
    grid-template-rows: repeat(3, min-content) 1fr min-content;
    grid-template-areas:
      "poster title"
      "poster description"
      "poster details"
      "info details"
      "reviews reviews";

    &.noDetails {
      grid-template-areas:
        "poster title"
        "poster description"
        "info description"
        "reviews reviews";
    }

    &.withLocations {
      grid-template-rows: repeat(2, min-content) 1fr min-content;
      grid-template-areas:
        "poster title"
        "poster description"
        "info description"
        "info details"
        "reviews reviews";
    }

    &.withReviewPoster {
      grid-template-areas:
        "poster title"
        "poster description"
        "poster details"
        "info details"
        "reviewsPoster reviews";
    }
  }

  @include media-breakpoint-up(xxl) {
    --column-gap: 46px;
    --max-width: 1484px;
    --img-width: 276px;

    grid-template-columns: min-content 540px 540px;
    grid-template-rows: repeat(2, min-content) 1fr;
    grid-template-areas:
      "poster title details-heading"
      "poster description details"
      "info description details"
      "info reviews reviews";

    &.noDetails {
      grid-template-columns: min-content 1080px;
      grid-template-areas:
        "poster title"
        "poster description"
        "info reviews"
        "reviewsPoster reviews";
    }

    &.withLocations {
      grid-template-rows: repeat(2, min-content) 1fr min-content;
      grid-template-areas:
        "poster title details-heading"
        "poster description details"
        "info description details"
        "info reviews reviews";
    }

    &.withReviewPoster {
      grid-template-areas:
        "poster title details-heading"
        "poster description details"
        "info description details"
        "reviewsPoster reviews reviews";
    }

    margin-left: calc(
      max(
        0px,
        (100vw - var(--max-width) - var(--img-width) - var(--column-gap)) / 2
      )
    );
  }
}

#grid-item-poster {
  grid-area: poster;
}

#grid-item-title {
  grid-area: title;
}

#grid-item-info {
  grid-area: info;
  margin-top: calc(-1 * var(--row-gap));

  .info {
    font-size: 0.75rem;
    line-height: 1.25;
    font-family: "Inria Sans", sans-serif;
    font-weight: 400;
    font-style: normal;

    @include media-breakpoint-up(xxl) {
      font-size: 1rem;
    }
  }

  @include media-breakpoint-up(lg) {
    margin-top: 0;
  }
}

#grid-item-description {
  grid-area: description;
  margin-top: calc(-1 * var(--row-gap) + 0.5rem);
}

#grid-item-details-heading {
  grid-area: details-heading;
}

#grid-item-details {
  grid-area: details;

  @include media-breakpoint-up(xxl) {
    margin-top: calc(-1 * var(--row-gap) + 0.5rem);
  }
}

#grid-item-reviews {
  grid-area: reviews;
}

#grid-item-reviews-poster {
  grid-area: reviewsPoster;
}
</style>
