import { ROUTES } from 'src/router/const'

export const NAV_LINKS = [
  {
    name: ROUTES.APP + '-home',
    path: `/${ROUTES.APP}`,
    label: 'Home',
    icon: 'layout-panel-top',
  },
  {
    name: ROUTES.TICKETS,
    path: `/${ROUTES.TICKETS}`,
    label: 'Requests',
    icon: 'clock-fading',
  },
]
