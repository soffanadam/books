import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    middleware?: string | string[]
  }
}
