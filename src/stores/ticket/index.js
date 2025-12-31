import { ref, computed } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

import { useTicketsQuery } from 'src/composables/ticket/useTicketsQuery'
import {
  filterTickets,
  getDefaultFilter,
  getDefaultSort,
} from 'src/services/helpers/ticket.helper'
import {
  TICKET_DIRECTORIES,
  DIRECTORIES,
} from 'src/services/consts/ticket.const'
import { sortItems } from 'src/services/helpers/util.helper'

export const useTicketStore = defineStore('ticket', () => {
  // Data fetching via composable
  const { tickets, isLoading, error, refetch } = useTicketsQuery()

  // UI state
  const filterBy = ref(getDefaultFilter())
  const tableState = ref(getDefaultSort())
  const selectedTicketId = ref(null)

  // Computed
  const allTickets = computed(() => tickets.value.tickets)
  const totalTickets = computed(() => allTickets.value.length)
  const filteredTickets = computed(() => {
    return filterTickets(allTickets.value, filterBy.value)
  })
  const sortedTickets = computed(() => {
    return sortItems(
      filteredTickets.value,
      tableState.value.sortBy,
      tableState.value.descending
    )
  })
  const hasActiveFilters = computed(() => {
    return !!filterBy.value.search || filterBy.value.dateRange !== null
  })
  const directoryCounts = computed(() => {
    return TICKET_DIRECTORIES.reduce((counts, directory) => {
      const statusTickets = filterTickets(allTickets.value, {
        search: '',
        dateRange: null,
        status: directory.id,
      })
      counts[directory.id] = statusTickets.length
      return counts
    }, {})
  })

  const updateTableState = (stateToUpdate) => {
    tableState.value = { ...tableState.value, ...stateToUpdate }
  }
  const updateFilters = (filterToUpdate) => {
    const oldStatus = filterBy.value.status
    const newStatus = filterToUpdate.status
    const currentSortBy = tableState.value.sortBy
    const newFilter = { ...filterBy.value, ...filterToUpdate }

    // Switch sort column when changing to drafts from other statuses (No dateSubmitted column)
    if (newStatus === DIRECTORIES.drafts && newStatus !== oldStatus) {
      if (currentSortBy === 'dateSubmitted') {
        tableState.value.sortBy = 'dateCreated'
        tableState.value.descending = true
      }
    }

    filterBy.value = newFilter
    tableState.value.page = 1
  }
  const clearFilters = () => {
    const currentStatus = filterBy.value.status
    filterBy.value = { ...getDefaultFilter(), status: currentStatus }
    tableState.value.page = 1
  }
  const setSelectedTicketId = (ticketId) => {
    selectedTicketId.value = ticketId
  }

  return {
    // State
    filterBy,
    tableState,
    selectedTicketId,
    activeDirectory: computed(() => filterBy.value.status || 'in-review'),

    // Data
    tickets,
    isLoading,
    error,

    // Computed
    allTickets,
    filteredTickets,
    sortedTickets,
    totalTickets,
    hasActiveFilters,
    directoryCounts,

    // Actions
    updateTableState,
    updateFilters,
    clearFilters,
    setSelectedTicketId,
    refetch,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTicketStore, import.meta.hot))
}
