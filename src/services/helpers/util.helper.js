import {
  format,
  subDays,
  subWeeks,
  subMonths,
  addDays,
  addWeeks,
  addMonths,
} from 'date-fns'

export const formatDateByFormat = (dateString, dateFormat = 'MMM d') => {
  try {
    return format(new Date(dateString), dateFormat)
  } catch {
    return 'Unknown'
  }
}

/**
 * Generic sort function for data arrays
 * @param {Array} items - Array of items to sort
 * @param {String} sortBy - Field to sort by
 * @param {Boolean} descending - Sort in descending order
 * @returns {Array} - Sorted array
 */
export function sortItems(items, sortBy, descending) {
  const sorted = [...items].sort((a, b) => {
    const aVal = a[sortBy] || ''
    const bVal = b[sortBy] || ''

    // Handle date fields
    if (sortBy.toLowerCase().includes('date')) {
      const aDay = aVal ? new Date(aVal).getDate() : 0
      const bDay = bVal ? new Date(bVal).getDate() : 0
      return aDay - bDay
    }

    // Handle string fields
    if (sortBy === 'productName' || sortBy === 'companyName') {
      return aVal.localeCompare(bVal)
    }

    // Default comparison
    return aVal < bVal ? -1 : aVal > bVal ? 1 : 0
  })

  return descending ? sorted.reverse() : sorted
}

/**
 * Calculate cutoff date based on date range
 * @param {String} dateRange - Date range string ('1d', '1w', '1m', '3m')
 * @param {Boolean} future - If true, calculate future date, otherwise past date
 * @returns {Date|null} - Cutoff date or null if no range
 */
export function getCutoffDate(dateRange, future = false) {
  if (!dateRange) return null

  const now = new Date()

  // Choose the appropriate date functions based on direction
  const dayFn = future ? addDays : subDays
  const weekFn = future ? addWeeks : subWeeks
  const monthFn = future ? addMonths : subMonths

  switch (dateRange) {
    case '1d':
      return dayFn(now, 1)
    case '1w':
      return weekFn(now, 1)
    case '1m':
      return monthFn(now, 1)
    case '3m':
      return monthFn(now, 3)
    case '6m':
      return monthFn(now, 6)
    case '1y':
      return monthFn(now, 12)
    default:
      return null
  }
}

export function normalizeWebsite(website) {
  if (!website) return ''
  // Handle array case - take first element if it's an array
  if (Array.isArray(website)) {
    return website.length > 0 ? website[0] : ''
  }
  return website
}

export function formatWebsiteUrl(website) {
  const normalizedWebsite = normalizeWebsite(website)
  if (!normalizedWebsite) return ''
  // If it already has a protocol, return as is, otherwise add https://
  return normalizedWebsite.match(/^https?:\/\//)
    ? normalizedWebsite
    : `https://${normalizedWebsite}`
}

export function extractDomainFromUrl(url) {
  if (!url) return ''

  let domain = url

  // stripping protocol, www, path, and query params
  domain = domain.replace(/^https?:\/\//, '')
  domain = domain.replace(/^www\./, '')
  domain = domain.split('/')[0]
  domain = domain.split('?')[0]

  // Check for invalid characters (spaces, special chars that aren't valid in domains)
  if (
    !domain ||
    domain.length < 2 ||
    domain.includes(' ') ||
    (!domain.includes('.') && domain.length < 3) ||
    !/^[a-zA-Z0-9.-]+$/.test(domain)
  ) {
    return ''
  }

  return domain
}
