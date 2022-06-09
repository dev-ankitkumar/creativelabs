import { takeEvery, put, call } from "redux-saga/effects"
import { POST_RISK } from "./actionTypes"

import { postRiskSuccess, postRiskFail } from "./action"

import { onPostRiskRegister } from "helpers/fakebackend_helper"
function* onPostRisk({ payload: sprint }) {
  try {
    const response = yield call(onPostRiskRegister, sprint)
    yield put(postRiskSuccess(response))
  } catch (error) {
    yield put(postRiskFail(error))
  }
}
function* RiskSaga() {
  yield takeEvery(POST_RISK, onPostRisk)
}
export default RiskSaga
