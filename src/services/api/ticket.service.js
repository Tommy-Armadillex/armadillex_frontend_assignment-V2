import { log } from 'src/services/app/log.service'
import {
  refactorTicket,
  refactorTicketDetails,
} from 'src/services/helpers/ticket.helper'
import {
  getMockRequestsResponse,
  getMockTicketById,
} from 'src/services/mock/mockData'

export const ticketService = {
  getTickets,
  getTicketById,
}

// Mock API call - returns transformed tickets
async function getTickets() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const data = getMockRequestsResponse()
  const tickets = data.tickets.map(refactorTicket)
  log.info('Fetched tickets:', tickets)
  return tickets
}

// Mock API call - returns transformed ticket details
async function getTicketById(ticketId) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const mockData = getMockTicketById(ticketId)
  const ticket = refactorTicketDetails(mockData)
  log.info('Fetched ticket details:', ticket)
  return ticket
}
