import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from 'src/router/routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

// Create a variable to hold the router instance
let router

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  router = createRouter({
    scrollBehavior(to, from, savedPosition) {
      // Ignore query changes
      const pathChanged = to.path !== from.path
      if (savedPosition) {
        // Back/forward button: restore scroll
        return savedPosition
      } else if (pathChanged) {
        // Path or params changed: scroll to top smoothly
        return { top: 0, behavior: 'smooth' }
      }

      // Query change only: preserve scroll position (no scrolling)
      return false
    },
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  return router
})

// Export the router instance
export { router }
