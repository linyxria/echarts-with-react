import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'EChartsWithReact',
      fileName: 'echarts-with-react',
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom', 'echarts/core'],
      output: {
        globals: {
          react: 'React',
          'react/jsx-runtime': 'ReactJsxRuntime',
          'react-dom': 'ReactDOM',
          'echarts/core': 'EChartsCore',
        },
      },
    },
    copyPublicDir: false,
  },
  plugins: [react(), dts({ include: ['lib'], rollupTypes: true })],
})
