import { POST_SPRINT_FAIL, POST_SPRINT_SUCCESS } from "./actionTypes"

const INIT_STATE = {
  sprint: [],
  messages: [],
  error: {},
}

const Sprint = (state = INIT_STATE, action) => {
  switch (action.type) {
    case POST_SPRINT_SUCCESS:
      return {
        ...state,
        sprint: action.payload,
      }

    case POST_SPRINT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default Sprint
