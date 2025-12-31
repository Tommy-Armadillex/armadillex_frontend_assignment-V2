import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { log } from 'src/services/app/log.service'
import { QUERY_KEYS } from 'src/services/consts/queries.const'
import { notifyService } from 'src/services/app/notify.service'
import { ticketService } from 'src/services/api/ticket.service'
import { useTicketStore } from 'src/stores/ticket'

/**
 * Composable for fetching a single ticket by ID
 * Uses TanStack Query with mocked API call (ticketService.getTicketById)
 * Includes simulated network delay for realistic behavior
 */
export function useTicketQuery(ticketIdRef) {
  const ticketStore = useTicketStore()

  const ticketQuery = useQuery({
    queryKey: [QUERY_KEYS.TICKET, ticketIdRef],
    enabled: computed(() => !!ticketIdRef.value && !ticketStore.isLoading),
    refetchOnMount: 'always',
    refetchOnReconnect: 'always',
    refetchOnWindowFocus: 'always',

    queryFn: async () => {
      try {
        if (!ticketIdRef.value) return null
        // Uses mocked API call with simulated delay (200ms)
        return await ticketService.getTicketById(ticketIdRef.value)
      } catch (error) {
        log.error('Failed to load ticket', error)
        notifyService.error('Failed to load ticket')
        throw error
      }
    },
  })

  const isLoading = computed(
    () =>
      ticketQuery.isLoading.value ||
      ticketQuery.isFetching.value ||
      ticketStore.isLoading
  )

  return {
    ticket: ticketQuery.data,
    isLoading,
    error: ticketQuery.error,
    refetch: ticketQuery.refetch,
  }
}
