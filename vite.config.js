import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  //CORS 우회를 위해 아래 설정으로 백엔드 url 지정
  server: {
    proxy: {
      "/server": {
        target: "http://localhost:8080/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/server/, ""),
        secure: false,
        ws: true,
      },
    },
  },
});
