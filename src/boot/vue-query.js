import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import { devMode } from 'src/config'
import { log } from 'src/services/app/log.service'

export default ({ app }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          log.error('Query error', error)
          // Only retry once for errors
          return failureCount < 1
        },
        staleTime: 1000 * 60 * 30, // Consider data stale after 30 minutes
        cacheTime: 1000 * 60 * 30, // Cache data for 30 minutes
        refetchOnWindowFocus: devMode ? false : true, // Disable refetch on window focus in dev mode
        refetchOnMount: true,
      },
      mutations: {
        retry: (failureCount, error) => {
          log.error('Mutation error', error)
          // Only retry once for errors
          return failureCount < 1
        },
      },
    },
  })

  app.use(VueQueryPlugin, {
    queryClient,
  })
}
