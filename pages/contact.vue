<template>
  <router-view v-slot="{ route }">
    <div :key="route.fullPath">
      <Head>
        <Title>Contact & Credits</Title>
      </Head>

      <div class="main-container px-4">
        <h2 class="title">With gratitude,</h2>

        <ul class="text-main list-none flex flex-col">
          <li>Eoin O'Malley: web developer</li>
          <li>Jim Edgar: audio engineering</li>
          <li>Lala Coyle and Jacob Dulisse: additional photography</li>
          <li>John Sebastian “Daydream”</li>
          <li>Henry Diltz: photos and calligraphy</li>
          <li>Cindy @Tamtravel</li>
        </ul>

        <h2 class="subtitle text-center mt-4 mb-3">
          To all the musicians, photographers, performers, and actors who
          contributed to my efforts: thank you
        </h2>
        <div class="w-min mx-auto">
          <img
            src="/contact/erik-and-lala.jpg"
            alt="Erik and Lala"
            class="max-h-[154px] sm:max-h-[230px] lg:max-h-[275px]"
          />
        </div>
        <figcaption class="text-main caption">
          Lala Coyle Jacobsen and Erik
        </figcaption>

        <h2 class="subtitle text-center mt-4 mb-3">
          To my three wonderful, talented video editors:
        </h2>

        <ul class="text-main list-none flex flex-col gap-y-1 sm:gap-y-0">
          <li>
            Lindsey Brady: editor, web design, music supervision, show-reel
            production
          </li>
          <li>Heather Young: editor</li>
          <li>Olivia Gonzales: editor</li>
        </ul>

        <div class="flex gap-x-2 my-3">
          <div class="w-1/3">
            <img
              src="/contact/lindsey.jpg"
              alt="Lindsey portrait"
              class="w-full h-auto"
            />
            <figcaption class="text-main caption">Lindsey Brady</figcaption>
          </div>

          <div class="w-1/3">
            <img
              src="/contact/heather.jpg"
              alt="Heather portrait"
              class="w-full h-auto"
            />
            <figcaption class="text-main caption">Heather Young</figcaption>
          </div>

          <div class="w-1/3">
            <img
              src="/contact/olivia.jpg"
              alt="Olivia portrait"
              class="w-full h-auto"
            />
            <figcaption class="text-main caption">Olivia Gonzales</figcaption>
          </div>
        </div>

        <h2 class="subtitle text-center mt-6 mb-3">
          Would You Like to Get in Touch?
        </h2>

        <!-- CONTACT FORM -->
        <div class="form-container">
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            class="grid gap-y-[9px]"
            @submit.prevent="onFormSubmit"
          >
            <input
              type="hidden"
              name="form-name"
              value="contact"
            />

            <!-- Hidden honeypot field to prevent against bot spam -->
            <input
              type="hidden"
              name="bot-field"
              value="contact"
            />

            <div class="form-group">
              <label
                for="name"
                class="form-label"
                >Your Name</label
              >
              <input
                type="text"
                id="name"
                name="name"
                placeholder=" "
              />
            </div>

            <div class="form-group">
              <label
                for="email"
                class="form-label"
                >Your Email</label
              >
              <input
                type="email"
                id="email"
                name="email"
                placeholder=" "
              />
            </div>

            <div class="form-group">
              <label
                for="message"
                class="form-label"
                >Message</label
              >
              <textarea
                id="message"
                name="message"
                style="height: 200px"
                placeholder=" "
              ></textarea>
            </div>

            <p
              v-if="showSuccessMsg"
              class="text-white text-center"
            >
              Thank you for your message!
            </p>
            <p
              v-if="showErrorMsg"
              class="text-white text-center"
            >
              Oops, something went wrong. Please try again.
            </p>

            <input
              type="submit"
              value="Send"
            />
          </form>
        </div>
      </div>
    </div>
  </router-view>
</template>

<script setup>
const showSuccessMsg = ref(false);
const showErrorMsg = ref(false);

const onFormSubmit = (event) => {
  fetch("/dummy-contact-form-for-netlify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(new FormData(event.target)),
  })
    .then(() => {
      showSuccessMsg.value = true;
      showErrorMsg.value = false;
      event.target.reset(); // Clear the form
    })
    .catch((error) => {
      showSuccessMsg.value = false;
      showErrorMsg.value = true;
    });
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Annie+Use+Your+Telescope&display=swap");

.main-container {
  width: 100%;
  max-width: 606px;
  --openBtnTopPos: 33px;
  --openBtnHeight: 23px;
  margin-top: calc(2 * var(--openBtnTopPos) + var(--openBtnHeight));
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 2rem;

  @include media-breakpoint-up(sm) {
    --openBtnTopPos: 39px;
    --openBtnHeight: 29px;
  }

  @include media-breakpoint-up(md) {
    --openBtnTopPos: 41px;
    --openBtnHeight: 35px;
  }

  @include media-breakpoint-up(lg) {
    margin-top: 2rem;
    margin-bottom: 3rem;
  }
}

.title {
  color: #fff;
  font-family: "Annie Use Your Telescope", cursive;
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.583;

  @include media-breakpoint-up(lg) {
    font-size: 2.25rem;
  }
}

.subtitle {
  color: #fff;
  font-family: "Annie Use Your Telescope", cursive;
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.583;

  @include media-breakpoint-up(sm) {
    font-size: 1.5rem;
  }

  @include media-breakpoint-up(lg) {
    font-size: 2rem;
  }
}

.text-main {
  color: #f2f2f2;
  font-family: "NeueHaasGroteskText Pro55", sans-serif;
  font-feature-settings: "liga";
  font-size: 0.75rem;
  line-height: 1.679;
  font-weight: 400;
  text-shadow: 6px 6px 8px rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;
  margin: 0px;
  padding: 0px;

  &.caption {
    font-family: "Annie Use Your Telescope", cursive;
    font-size: 0.875rem;
    font-weight: 600;
    text-align: center;
  }

  @include media-breakpoint-up(sm) {
    font-size: 1rem;

    &.caption {
      font-size: 1.125rem;
    }
  }

  @include media-breakpoint-up(lg) {
    font-size: 1.25rem;
  }
}

.form-container {
  background-color: transparent;
  padding: 0px;

  .form-group {
    @apply relative;

    .form-label {
      @apply block text-et-body-16 text-white font-neueHaasGrotesk tracking-wider pointer-events-none;
      @apply absolute top-0 left-0 translate-x-3 translate-y-5 transition;

      &:has(+ textarea) {
        @apply translate-y-3;
      }

      &:has(
          + [type="text"]:focus,
          + [type="email"]:focus,
          + textarea:focus,
          + [type="text"]:not(:placeholder-shown),
          + [type="email"]:not(:placeholder-shown),
          + textarea:not(:placeholder-shown)
        ) {
        @apply text-et-body-12 font-semibold text-[#ddd];
        @apply translate-y-[9px];
      }
    }

    input[type="text"],
    input[type="email"],
    textarea {
      @apply w-full text-et-body-16 italic text-white font-neueHaasGrotesk tracking-wider;
      @apply border-[1px] border-solid border-white bg-black p-[10px] pt-6;
      @apply resize-y; // Allow the user to vertically resize the textarea (not horizontally)
    }
  }

  input[type="submit"] {
    @apply w-fit justify-self-center text-white text-et-body-16 font-medium bg-[rgba(255,255,255,0.16)];
    @apply py-3 px-9 border-[1px] border-solid border-white;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:focus {
    // avoid Chrome "internal-autofill-selected" style being applied
    // ref: https://stackoverflow.com/a/68240841
    transition: background-color 0s 600000s, color 0s 600000s !important;
  }
}
</style>
