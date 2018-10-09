import { put, takeLatest, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { POSTS_REFRESH, POSTS_REFRESH_SUCCESS } from '../constants'
import api from '../api'

function* fetchPosts() {
  const posts = yield call(api.fetchPosts)
  yield call(delay, 400)
  yield put({ type: POSTS_REFRESH_SUCCESS, posts })
}

function* rootSaga() {
  yield takeLatest(POSTS_REFRESH, fetchPosts)
}

export default rootSaga
