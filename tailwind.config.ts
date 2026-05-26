import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f1117",
        surface: "#1a1d27",
        "surface-alt": "#202433",
        border: "rgba(255, 255, 255, 0.1)",
        accent: "#f97316",
        muted: "#94a3b8",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(249, 115, 22, 0.25), 0 18px 45px rgba(15, 17, 23, 0.45)",
      },
    },
  },
};

export default config;
