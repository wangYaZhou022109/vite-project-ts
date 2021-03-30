import { loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import path from 'path'
import { injectHtml } from 'vite-plugin-html'
// @ts-ignore
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [
      vue(),
      styleImport({
        libs: [
          {
            libraryName: 'ant-design-vue',
            esModule: true,
            resolveStyle: name => {
              return `ant-design-vue/es/${name}/style/css`
            }
          }
        ]
      }),
      injectHtml({
        injectData: {
          VITE_DEPLOY_ENV: env.VITE_DEPLOY_ENV
        }
      })
    ],
    define: {
      'process.env': {}
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  })
}
