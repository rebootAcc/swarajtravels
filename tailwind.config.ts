import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "typeograph-1": "#222222",
        "typeograph-2": "#666666",
        primary: "#EF7237",
        secondary: "#009DFF",
      },
      fontFamily: {
        "el-missiri": "var(--font-el-missiri)",
      },
      backgroundImage: {
        "custom-dash-border": `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%23EF7237FF' stroke-width='3' stroke-dasharray='15%2c15' stroke-dashoffset='96' stroke-linecap='round'/%3e%3c/svg%3e")`,
      },
      boxShadow: {
        "custom-shadow": "0px 8px 20px 0px rgba(0, 0, 0, 0.25)",
      },
      screens: {
        xs: "280px",
        xlg: "1440px",
        xxl: "1780px",
      },

    },
  },
  plugins: [],
} satisfies Config;
