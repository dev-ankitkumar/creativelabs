import {
  POST_MILESTONE,
  POST_MILESTONE_FAIL,
  POST_MILESTONE_SUCCESS,
} from "./actionTypes"

export const postMilestone = message => ({
  type: POST_MILESTONE,
  payload: message,
})

export const postMilestoneSuccess = message => ({
  type: POST_MILESTONE_SUCCESS,
  payload: message,
})

export const postMiletoneFail = error => ({
  type: POST_MILESTONE_FAIL,
  payload: error,
})
