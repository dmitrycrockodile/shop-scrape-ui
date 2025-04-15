import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

export default defineConfig({
    base: '/bermas.dmytro.ui.quest.groupbwt.dev/',
    plugins: [ vue() ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            'assets': 'src/assets/',
          },
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: true,
      },
})