// Ticket Status Constants
export const TICKET_STATUS = {
  OPENED: 'opened', // Draft - not yet submitted
  PREPROCESS: 'preprocess', // Submitted, initial processing
  PROCESSING: 'processing', // Under review by admin
  CLOSED: 'closed', // Review complete (approved or denied)
}

export const DIRECTORIES = {
  inReview: 'in-review',
  approved: 'approved',
  denied: 'denied',
  drafts: 'drafts',
}

export const TICKET_DIRECTORIES = [
  { id: DIRECTORIES.inReview, label: 'Under review', icon: 'hourglass' },
  { id: DIRECTORIES.approved, label: 'Approved', icon: 'badge-check' },
  { id: DIRECTORIES.denied, label: 'Denied', icon: 'badge-x' },
  { id: DIRECTORIES.drafts, label: 'Drafts', icon: 'file-edit' },
]

export const TICKET_FILTER_FIELDS = {
  search: '', // string
  dateRange: null, // '1d', '1w', '1m', '3m', 'all'
  status: DIRECTORIES.inReview, // 'in-review', 'approved', 'denied', 'drafts'
}

export const TICKET_SORT_PAGINATION_FIELDS = {
  sortBy: 'dateCreated',
  descending: true,
  page: 1,
  rowsPerPage: 15,
}

export const DATE_RANGE_OPTIONS = [
  { label: 'All time', value: null },
  { label: 'Last Week', value: '1w' },
  { label: 'Last Month', value: '1m' },
  { label: 'Last 3 Months', value: '3m' },
  { label: 'Last 6 Months', value: '6m' },
]

export const TICKET_COLUMNS = [
  {
    name: 'productName',
    label: 'Product',
    field: 'productName',
    align: 'left',
    sortable: true,
    classes: 'product-name',
    headerClasses: 'product-name',
  },
  {
    name: 'dateSubmitted',
    label: 'Submitted on',
    field: 'dateSubmitted',
    align: 'left',
    sortable: true,
    classes: 'date',
    headerClasses: 'date',
  },
  {
    name: 'dateCreated',
    label: 'Created on',
    field: 'dateCreated',
    align: 'right',
    sortable: true,
    classes: 'date',
    headerClasses: 'date',
  },
]

export const TICKET_TABS = {
  information: {
    name: 'information',
    label: 'Information',
    icon: 'info',
  },
  details: {
    name: 'details',
    label: 'Details',
    icon: 'list',
  },
}

export const TICKET_STATUS_CONFIG = {
  approved: {
    type: 'approved',
    label: 'Approved',
    icon: 'badge-check',
    color: 'positive',
    title: 'Your request has been approved',
    detailLabel: 'Approval conditions',
  },
  denied: {
    type: 'denied',
    label: 'Denied',
    icon: 'badge-x',
    color: 'negative',
    title: 'Your request has been denied',
    detailLabel: 'Deny Reason',
  },
  processing: {
    type: 'in-review',
    label: 'In Review',
    icon: 'hourglass',
    color: 'cta',
    title: 'Your request is in review',
    detailLabel: null,
  },
  draft: {
    type: 'draft',
    label: 'Draft',
    icon: 'file-edit',
    color: 'accent',
    title: 'Draft Request',
    message:
      'This request is still a draft. Complete and submit it to start the review process.',
  },
}
