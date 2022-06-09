import { takeEvery, put, call } from "redux-saga/effects"
import { POST_SPRINT } from "./actionTypes"

import { postSprintSuccess, postSprintFail } from "./action"

import { onPostsprint } from "helpers/fakebackend_helper"
function* onPostSprint({ payload: sprint }) {
  try {
    const response = yield call(onPostsprint, sprint)
    yield put(postSprintSuccess(response))
  } catch (error) {
    yield put(postSprintFail(error))
  }
}
function* SprintSaga() {
  yield takeEvery(POST_SPRINT, onPostSprint)
}
export default SprintSaga
