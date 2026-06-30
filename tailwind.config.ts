import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"

const config: Config = {
  content: [
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Montessori "measured materials" palette
        pine: {
          DEFAULT: "#33503F",
          deep: "#26402F",
        },
        sage: {
          DEFAULT: "#5F8D76",
          deep: "#4E7A66",
        },
        moss: {
          DEFAULT: "#9DBCAA",
          light: "#C8DBCF",
        },
        mist: "#E2ECE5",
        paper: "#F7F5EF",
        linen: "#EDE7DB",
        ink: "#2C322D",
        beech: "#C28E5C",
      },
      fontFamily: {
        display: ["var(--font-display)", "Hahmlet", "serif"],
        sans: [
          "var(--font-sans)",
          "IBM Plex Sans KR",
          "system-ui",
          "sans-serif",
        ],
        mono: ["var(--font-mono)", "Geist Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [typography],
}
export default config
