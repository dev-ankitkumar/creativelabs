import { takeEvery, put, call } from "redux-saga/effects"
import { POST_MILESTONE } from "./actionTypes"

import { postMilestoneSuccess, postMiletoneFail } from "./action"

import { onPostMileStone } from "helpers/fakebackend_helper"
function* onPostMilestone({ payload: milestone }) {
  console.log(milestone, "check mile")
  try {
    const response = yield call(onPostMileStone, milestone)
    yield put(postMilestoneSuccess(response))
  } catch (error) {
    yield put(postMiletoneFail(error))
  }
}
function* milestoneSaga() {
  yield takeEvery(POST_MILESTONE, onPostMilestone)
}
export default milestoneSaga
