import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      remotes: {
        mfe: "http://localhost:5000/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
});