<template>
  <router-view v-slot="{ route }">
    <div :key="route.fullPath">
      <Head>
        <Title>Contact & Credits</Title>
      </Head>

      <div class="main-container w-full px-4">
        <h2 class="title">With gratitude,</h2>

        <ul class="text-main list-none flex flex-col">
          <li>Eoin O'Malley: web developer</li>
          <li>Jim Edgar: audio engineering</li>
          <li>Lala Coyle and Jacob Dulisse: additional photography</li>
          <li>John Sebastian “Daydream”</li>
          <li>Henry Diltz: photos and calligraphy</li>
          <li>Cindy @Tamtravel</li>
        </ul>

        <h2 class="title text-center mt-4 mb-3">
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

        <h2 class="title text-center mt-4 mb-3">
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

        <h2 class="title text-center mt-4 mb-3">
          Would You Like to Get in Touch?
        </h2>

        <!-- CONTACT FORM -->
        <div class="form-containerS">
          <form
            name="contact"
            method="POST"
            netlify
            data-netlify-honeypot="bot-field"
          >
            <input
              type="hidden"
              name="form-name"
              value="contact"
            />
            <!-- Hidden honeypot field to prevent against bot spam -->

            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
            />

            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
            />

            <label for="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              style="height: 200px"
            ></textarea>

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

<script></script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Annie+Use+Your+Telescope&display=swap");

.main-container {
  --openBtnTopPos: 33px;
  --openBtnHeight: 23px;
  margin-top: calc(2 * var(--openBtnTopPos) + var(--openBtnHeight));
  margin-right: auto;
  margin-left: auto;

  @include media-breakpoint-up(sm) {
    --openBtnTopPos: 39px;
    --openBtnHeight: 29px;
  }

  @include media-breakpoint-up(md) {
    --openBtnTopPos: 41px;
    --openBtnHeight: 35px;
  }
}

.title {
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
    font-size: 2.25rem;
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

/* Form adapted from https://www.w3schools.com/howto/howto_css_contact_form.asp */
.form-container {
  background-color: transparent;
  padding: 20px 0;

  label {
    display: inline-block;
    color: #406689;
    font-family: "NeueHaasGroteskText Pro55", sans-serif;
    font-feature-settings: "liga";
    font-size: 1.3125rem;
    font-weight: 400;
    text-shadow: 6px 6px 8px rgba(0, 0, 0, 0.5);
    line-height: 1.3125rem;
    letter-spacing: 5px;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  input[type="text"],
  input[type="email"],
  textarea#message {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box; /* Make sure that padding and width stays in place */
    margin-top: 6px;
    margin-bottom: 16px;
    resize: vertical; /* Allow the user to vertically resize the textarea (not horizontally) */
    color: #91465a;
    background-color: #ddd;
    font-family: Helvetica, "Helvetica Neue", Arial, sans-serif;
    font-size: 1rem;
    font-style: italic;
  }

  input[type="text"]:hover,
  input[type="email"]:hover,
  textarea:hover,
  input[type="text"]:focus,
  input[type="email"]:focus,
  textarea:focus {
    background-color: #fff;
  }

  /* Style the submit button with a specific background color etc */
  input[type="submit"] {
    background-color: #406689;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: "NeueHaasGroteskText Pro55", sans-serif;
    font-weight: 400;
    font-size: 1.125em;
    letter-spacing: 5px;
    text-transform: uppercase;
    margin-bottom: 1rem;
    line-height: 23px;
    &:focus {
      outline: none; // remove blue border in iOS Chrome
    }
    &:hover {
      color: #eecf49;
    }
  }
}
</style>
