import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

function localApi() {
  return {
    name: 'local-api',
    configureServer(server) {
      console.log('[local-api] middleware registered')
      server.middlewares.use('/api', async (req, res, next) => {
        try {
          const url = new URL(req.url, 'http://localhost')
          const name = url.pathname.replace(/^\//, '')
          if (!/^[\w-]+$/.test(name)) return next()

          console.log('[local-api] handling', req.url)
          const mod = await server.ssrLoadModule(`/api/${name}.js`)
          req.query = Object.fromEntries(url.searchParams)
          res.status = (code) => { res.statusCode = code; return res }
          res.json = (obj) => {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(obj))
            return res
          }
          await mod.default(req, res)
        } catch (e) {
          console.error(e)
          next(e)
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    localApi(),
  ],
})