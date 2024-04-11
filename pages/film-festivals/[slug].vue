<template>
  <Head>
    <Title>Film Festivals - {{ title }}</Title>
  </Head>

  <v-container
    fluid
    class="main-col ma-0 pa-0"
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
            class=""
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
          class=""
        />
      </v-col>
    </v-row>

    <v-row class="info-container">
      <v-col
        cols="12"
        lg="6"
        xl="5"
        xxl="4"
        class="!p-0"
      >
        <div class="flex">
          <img
            :src="posterImg"
            alt="Film festival poster"
            class="posterLinkImg max-h-72 mr-5"
          />
          <div class="pt-10">
            <h2 class="text uppercase">{{ title }}</h2>
            <p class="text">{{ description }}</p>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        lg="4"
        offset-lg="1"
        offset-xl="2"
        class="!p-0"
      >
        <div class="pt-10">
          <h2 class="text uppercase">Info</h2>
          <p class="text">
            <span
              v-for="(value, key) in info"
              :key="key"
            >
              <br v-if="key === 'releaseDate'" />
              <span class="capitalize"
                >{{ key.replace(/([A-Z])/g, " $1").trim() }}:
              </span>
              {{
                key === "editors"
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
      </v-col>
    </v-row>

    <v-row
      v-if="laurelsLength > 0"
      class="laurels-container gap-x-20"
    >
      <v-col class="!p-0">
        <h2 class="text uppercase mb-2">Festival Awards</h2>
        <div class="flex flex-wrap gap-y-4 justify-evenly">
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
  info.value = festival.info;
  posterImg.value = festival.posterImg;
  videoUrl.value = festival.videoUrl;
  videos.value = [{ url: festival.videoUrl }];
});
</script>

<style lang="scss" scoped>
.text {
  color: black;
}

.info-container {
  background-color: white;
  padding: 2rem;
}

.laurels-container {
  background-color: white;
  padding: 2rem;
}
</style>
