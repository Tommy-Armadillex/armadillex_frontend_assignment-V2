import { Notify } from 'quasar'

export const notifyService = {
  success: (message) => {
    Notify.create({
      group: 'success',
      message,
      color: 'brand',
      icon: 'check_circle',
      position: 'bottom-right',
      timeout: 3000, // Duration in milliseconds
      actions: [{ icon: 'close', color: 'white', handler: () => {} }],
      progress: true,
    })
  },
  info: (message) => {
    Notify.create({
      group: 'info',
      message,
      color: 'info',
      icon: 'info',
      position: 'bottom-right',
      timeout: 300000,
      actions: [{ icon: 'close', color: 'white', handler: () => {} }],
      progress: true,
    })
  },
  error: (message, group = 'error') => {
    Notify.create({
      group,
      message,
      color: 'warning',
      icon: 'error',
      position: 'bottom-right',
      timeout: 3000,
      actions: [{ icon: 'close', color: 'white', handler: () => {} }],
      progress: true,
    })
  },
  actions: (message, actions = []) => {
    Notify.create({
      message: 'This is a custom notification!',
      color: 'brand',
      icon: 'star',
      position: 'bottom-right',
      timeout: 5000,
      actions: [
        { icon: 'x-icon', color: 'white', handler: () => {} },
        ...actions,
      ],
      multiLine: true,
      progress: true,
    })
  },
}
