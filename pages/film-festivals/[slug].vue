<template>
  <Head>
    <Title>Film Festivals - {{ title }}</Title>
  </Head>

  <v-container
    fluid
    class="main-col ma-0 pa-0"
  >
    <!-- <v-row
      no-gutters
      class="mb-1"
    >
      <v-col class="slideshowCol">
        <video
          v-if="bgVideo"
          autoplay
          loop
          muted
          class="bgVideo"
        >
          <source
            :src="bgVideo.videoSrcMP4"
            type="video/mp4"
          />
        </video>
      </v-col>
    </v-row> -->

    <v-row class="laurels-container gap-x-20">
      <v-col class="!p-0">
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
      <v-col class="!p-0">
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

    <v-row class="info-container gap-x-20">
      <v-col class="!p-0">
        <h2 class="text uppercase">Festival Awards</h2>
        <div class="flex flex-wrap gap-y-4">
          <div
            v-for="index in 42"
            :key="index"
            class="flex justify-center align-middle gap-y-4 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-[11.11%]"
          >
            <img
              :src="`/film-festivals/laurels/laurel_${index
                .toString()
                .padStart(2, '0')}.png`"
              alt="Award"
              class="max-h-24 lg:max-h-28 px-1"
            />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
const route = useRoute();

const title = ref("");
const description = ref("");
const info = ref({});
const posterImg = ref("");
const videoUrl = ref("");

onBeforeMount(async () => {
  const filmFestivalsContent = await queryContent("film-festivals").findOne();
  console.log({ filmFestivalsContent });
  // const filmFestival = filmFestivalsContent?.filmFestivals?.find(
  //   (filmFestival) =>
  //     `/film-festivals/${filmFestival.slug}` === route.params.slug
  // );
  const filmFestival = filmFestivalsContent?.festivals?.find(
    (filmFestival) => filmFestival.slug === route.params.slug
  );
  console.log({ slug: route.params.slug });
  console.log({ filmFestival });
  title.value = filmFestival.title;
  description.value = filmFestival.description;
  info.value = filmFestival.info;
  posterImg.value = filmFestival.posterImg;
  videoUrl.value = filmFestival.videoUrl;

  console.log({
    pageTitle: title.value,
    description: description.value,
    info: info.value,
    posterImg: posterImg.value,
    videoUrl: videoUrl.value,
  });
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
