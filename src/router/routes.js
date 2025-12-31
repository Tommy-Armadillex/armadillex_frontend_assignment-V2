import { ROUTES } from 'src/router/const'

const routes = [
  {
    path: '/',
    redirect: '/' + ROUTES.APP,
  },

  // App routes
  {
    path: '/' + ROUTES.APP,
    name: ROUTES.APP,
    component: () => import('src/pages/AppIndex.vue'),
    children: [
      {
        path: '',
        name: ROUTES.APP + '-home',
        component: () => import('src/pages/HomeIndex.vue'),
      },
      {
        path: '/' + ROUTES.TICKETS,
        name: ROUTES.TICKETS,
        component: () => import('src/pages/TicketIndex.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
