import { POST_MILESTONE_FAIL, POST_MILESTONE_SUCCESS } from "./actionTypes"

const INIT_STATE = {
  milestone: [],
  messages: [],
  error: {},
}

const Milestone = (state = INIT_STATE, action) => {
  switch (action.type) {
    case POST_MILESTONE_SUCCESS:
      return {
        ...state,
        milestone: action.payload,
      }

    case POST_MILESTONE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default Milestone
