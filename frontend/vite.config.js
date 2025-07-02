// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   base: "/", // ✅ 루트 경로로 반드시 명시
//   server: {
//     port: 5173,
//     proxy: {
//       "/api": {
//         target: "https://백엔드주소",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // ✅ 반드시 있어야 Netlify 경로 문제 해결
  plugins: [react()],
});
