import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { log } from 'src/services/app/log.service'
import { QUERY_KEYS } from 'src/services/consts/queries.const'
import { notifyService } from 'src/services/app/notify.service'
import { ticketService } from 'src/services/api/ticket.service'

/**
 * Composable for fetching all tickets
 * Uses TanStack Query with mocked API call (ticketService.getTickets)
 * Service handles all transformation and enrichment
 */
export function useTicketsQuery() {
  const ticketsQuery = useQuery({
    queryKey: [QUERY_KEYS.TICKETS],
    queryFn: async () => {
      try {
        const tickets = await ticketService.getTickets()
        return { tickets }
      } catch (error) {
        log.error('Failed to load ticket', error)
        notifyService.error('Failed to load ticket')
        throw error
      }
    },
  })

  const isLoading = computed(
    () => ticketsQuery.isLoading.value || ticketsQuery.isFetching.value
  )

  return {
    tickets: ticketsQuery.data,
    isLoading,
    error: ticketsQuery.error,
    refetch: ticketsQuery.refetch,
  }
}
