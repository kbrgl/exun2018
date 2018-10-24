import {
  POSTS_REFRESH,
  POSTS_REFRESH_SUCCESS,
  INTRO_DONE,
  RECEIVED_NOTIFICATION,
  CLEAR_NOTIFICATIONS,
  READ_NOTIFICATIONS,
} from './constants'

const initialState = {
  listing: {
    refreshing: false,
  },
  introDone: false,
  posts: [],
  notifications: [],
}

const exunApp = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_REFRESH:
      return {
        ...state,
        listing: {
          refreshing: true,
        },
      }
    case POSTS_REFRESH_SUCCESS:
      return {
        ...state,
        listing: {
          refreshing: false,
        },
        posts: action.posts,
      }
    case INTRO_DONE:
      return {
        ...state,
        introDone: true,
      }
    case RECEIVED_NOTIFICATION:
      return {
        ...state,
        // Most recent first
        notifications: [action.payload, ...state.notifications],
      }
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
      }
    case READ_NOTIFICATIONS:
      return {
        ...state,
        notifications: state.notifications.map(notification => ({
          ...notification,
          read: true,
        })),
      }
    default:
      return state
  }
}

export default exunApp
