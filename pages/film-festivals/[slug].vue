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
          />
        </a>
      </v-col>
    </v-row>

    <v-row
      no-gutters
      class="mb-1"
    >
      <v-col>
        <VideoCarousel
          :videos="videos"
          :autoplay="false"
          :windowPercentage="0.5"
          :prevLink="prevLink"
          :nextLink="nextLink"
        />
      </v-col>
    </v-row>

    <div class="w-full pt-10 px-16 bg-white">
      <div class="grid grid-cols-2 gap-x-0 gap-y-5">
        <div>
          <div class="flex">
            <img
              :src="posterImg"
              alt="Film festival poster"
              class="posterLinkImg w-[276px] object-contain self-start mr-12"
            />
            <div class="max-w-[570px] pt-10">
              <h2 class="text-black text-4xl uppercase mb-3">{{ title }}</h2>
              <p class="text-black text-2xl text-justify">{{ description }}</p>
            </div>
          </div>
        </div>

        <div class="row-span-2 col-start-2">
          <div class="max-w-[570px] pt-10 mx-auto">
            <h2 class="text-black text-4xl uppercase mb-3">Details</h2>
            <p class="text-black text-2xl text-justify">{{ details }}</p>
          </div>
        </div>

        <div class="row-start-2">
          <div>
            <p class="text-black">
              <span
                v-for="(value, key) in info"
                :key="key"
              >
                <span class="capitalize"
                  >{{ key.replace(/([A-Z])/g, " $1").trim() }}:
                </span>
                {{
                  Array.isArray(value) &&
                  ["editors", "music", "footage"].includes(key)
                    ? value.reduce(
                        (acc, curr, i) => acc + (i === 0 ? "" : " / ") + curr,
                        ""
                      )
                    : value
                }}
                <br />
              </span>
            </p>
          </div>
        </div>

        <div
          v-if="reviews && reviews !== ''"
          class="col-span-full"
        >
          <div class="max-w-[1528px]">
            <h2 class="text-black text-4xl uppercase mb-3">Reviews</h2>
            <p class="text-black text-2xl text-justify">{{ reviews }}</p>
          </div>
        </div>
      </div>
    </div>

    <v-row
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
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
const route = useRoute();

const videos = ref([]);
const title = ref("");
const description = ref("");
const details = ref("");
const reviews = ref("");
const info = ref({});
const posterImg = ref("");
const videoUrl = ref("");
const prevLink = ref({});
const nextLink = ref({});

const slug = route.params.slug;
const laurelsLength = slug === "egypt" ? 42 : slug === "long-ago" ? 27 : 0;

onMounted(async () => {
  const festivalsContent = await queryContent("film-festivals").findOne();

  const currIndex = festivalsContent?.festivals?.findIndex(
    (filmFestival) => filmFestival.slug === slug
  );

  if (currIndex === -1) {
    return;
  }

  const prevIndex = currIndex - 1;
  prevLink.value =
    prevIndex >= 0
      ? {
          url: `/film-festivals/${festivalsContent.festivals[prevIndex].slug}`,
          title: festivalsContent.festivals[prevIndex].title,
        }
      : {};

  const nextIndex =
    currIndex + 1 >= festivalsContent.festivals.length ? -1 : currIndex + 1;
  nextLink.value =
    nextIndex >= 0
      ? {
          url: `/film-festivals/${festivalsContent.festivals[nextIndex].slug}`,
          title: festivalsContent.festivals[nextIndex].title,
        }
      : {};

  const festival = festivalsContent.festivals[currIndex];
  title.value = festival.title;
  description.value = festival.description;
  details.value = festival.details;
  reviews.value = festival.reviews;
  info.value = festival.info;
  posterImg.value = festival.posterImg;
  videoUrl.value = festival.videoUrl;
  videos.value = [{ url: festival.videoUrl }];
});
</script>

<style lang="scss" scoped>
.main-col {
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
  padding: 2rem;
}
</style>
