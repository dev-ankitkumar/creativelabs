import {
  POST_SPRINT,
  POST_SPRINT_FAIL,
  POST_SPRINT_SUCCESS,
} from "./actionTypes"

export const postSprint = message => ({
  type: POST_SPRINT,
  payload: message,
})

export const postSprintSuccess = message => ({
  type: POST_SPRINT_SUCCESS,
  payload: message,
})

export const postSprintFail = error => ({
  type: POST_SPRINT_FAIL,
  payload: error,
})
