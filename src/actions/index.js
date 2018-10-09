import { POSTS_REFRESH, INTRO_DONE } from '../constants'

export const postsRefresh = () => ({
  type: POSTS_REFRESH,
})

export const introDone = () => ({
  type: INTRO_DONE,
})
