import { getCutoffDate } from 'src/services/helpers/util.helper'
import {
  TICKET_FILTER_FIELDS,
  TICKET_SORT_PAGINATION_FIELDS,
  TICKET_STATUS,
  TICKET_STATUS_CONFIG,
} from 'src/services/consts/ticket.const'

export function filterTickets(tickets, filterBy) {
  const ticketsToFilter = [...tickets]

  const searchTerm = filterBy.search ? filterBy.search.toLowerCase() : null
  const cutoffDate = getCutoffDate(filterBy.dateRange)
  const status = filterBy.status || 'in-review'

  return ticketsToFilter.filter((ticket) => {
    // Search filter condition
    const matchesSearch =
      !searchTerm ||
      ticket.companyName?.toLowerCase().includes(searchTerm) ||
      ticket.productName?.toLowerCase().includes(searchTerm)

    // Status filter condition
    let matchesStatus = true
    if (status) {
      switch (status) {
        case 'in-review':
          matchesStatus = isTicketUnderReview(ticket.ticketStatus)
          break
        case 'approved':
          matchesStatus =
            ticket.ticketStatus === TICKET_STATUS.CLOSED &&
            ticket.approved === true
          break
        case 'denied':
          matchesStatus =
            ticket.ticketStatus === TICKET_STATUS.CLOSED &&
            ticket.approved === false
          break
        case 'drafts':
          matchesStatus = ticket.ticketStatus === TICKET_STATUS.OPENED
          break
        default:
          matchesStatus = true
      }
    }

    // Date range condition
    const matchesDateRange =
      !cutoffDate || new Date(ticket.dateCreated) <= cutoffDate

    // Return true only if all conditions match
    return matchesSearch && matchesStatus && matchesDateRange
  })
}

export function getDefaultFilter() {
  return {
    ...TICKET_FILTER_FIELDS,
  }
}

export function getDefaultSort() {
  return {
    ...TICKET_SORT_PAGINATION_FIELDS,
  }
}

// Transform snake_case ticket to camelCase
export function refactorTicket(ticket) {
  return {
    ticketId: ticket.ticket_id,
    companyId: ticket.company_id,
    productId: ticket.product_id,
    ticketStatus: ticket.ticket_status,
    approved: ticket.approved,
    dateCreated: ticket.date_created,
    dateSubmitted: ticket.date_submitted,
    companyName: ticket.company_name,
    productName: ticket.product_name,
    website: ticket.website || '',
  }
}

export function refactorTicketDetails(rawTicket) {
  const ticketData = rawTicket.ticket_info || rawTicket

  return {
    ticketId: ticketData.ticket_id,
    ticketStatus: ticketData.ticket_status,
    approved: ticketData.approved,
    companyName: ticketData.company_name,
    productName: ticketData.product_name,
    website: ticketData.website || '',
    dateCreated: ticketData.date_created,
    dateSubmitted: ticketData.date_submitted,
    lastUserUpdate: ticketData.last_user_update,
    answers: ticketData.questions_answers || {},
    denyReason: ticketData.deny_reason,
    approvalConditions: ticketData.auth_conditions,
  }
}

// Combined status that merges ticketStatus and approved
export function getCombinedTicketStatus(ticketStatus, approved) {
  if (isTicketUnderReview(ticketStatus)) {
    return TICKET_STATUS_CONFIG.processing
  }

  if (ticketStatus === TICKET_STATUS.CLOSED) {
    if (approved === true) {
      return TICKET_STATUS_CONFIG.approved
    } else if (approved === false) {
      return TICKET_STATUS_CONFIG.denied
    }
  }

  return TICKET_STATUS_CONFIG.draft
}

// Helper to check if ticket is under review (preprocess or processing)
export function isTicketUnderReview(ticketStatus) {
  return (
    ticketStatus === TICKET_STATUS.PROCESSING ||
    ticketStatus === TICKET_STATUS.PREPROCESS
  )
}
