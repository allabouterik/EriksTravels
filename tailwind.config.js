const prefix = "et-";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: "black",
        white: "white",
        [`${prefix}yellow`]: "#E5D052",
      },
    },
    fontFamily: {
      avenir: [
        "Avenir Medium",
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      neueHaasGrotesk: [
        "NeueHaasGroteskText Pro55",
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    fontSize: {
      [`${prefix}heading-42`]: [
        "2.625rem",
        {
          lineHeight: 1.167,
          fontWeight: 400,
        },
      ],
      [`${prefix}heading-24`]: [
        "1.5rem",
        {
          lineHeight: 1.42,
          fontWeight: 400,
        },
      ],
      [`${prefix}heading-22`]: [
        "1.375rem",
        {
          lineHeight: 1.545,
          fontWeight: 400,
        },
      ],
      [`${prefix}body-24`]: [
        "1.5rem",
        {
          lineHeight: "normal",
          fontWeight: 400,
        },
      ],
      [`${prefix}body-18`]: [
        "1.125rem",
        {
          lineHeight: 1.333,
          fontWeight: 400,
        },
      ],
      [`${prefix}body-15`]: [
        "0.9375rem",
        {
          lineHeight: "normal",
          fontWeight: 400,
        },
      ],
    },
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1500px",
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
