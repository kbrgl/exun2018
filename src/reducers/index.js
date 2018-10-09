import { POSTS_REFRESH, POSTS_REFRESH_SUCCESS, INTRO_DONE } from '../constants'

const initialState = {
  listing: {
    refreshing: false,
  },
  introDone: false,
  posts: [],
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
    default:
      return state
  }
}

export default exunApp
