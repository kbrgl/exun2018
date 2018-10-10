import {
  POSTS_REFRESH,
  INTRO_DONE,
  RECEIVED_NOTIFICATION,
  CLEAR_NOTIFICATIONS,
  READ_NOTIFICATIONS,
} from '../constants'

export const postsRefresh = () => ({
  type: POSTS_REFRESH,
})

export const introDone = () => ({
  type: INTRO_DONE,
})

export const receivedNotification = notification => ({
  type: RECEIVED_NOTIFICATION,
  payload: {
    id: notification.payload.notificationID,
    title: notification.payload.title,
    body: notification.payload.body,
    read: false,
  },
})

export const clearNotifications = () => ({
  type: CLEAR_NOTIFICATIONS,
})

export const readNotifications = () => ({
  type: READ_NOTIFICATIONS,
})
