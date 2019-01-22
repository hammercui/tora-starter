import {
  ADD,
  MINUS
} from '../constants/counter'

export const add = (payload:number) => {
  return {
    type: ADD,
    payload:payload
  }
}
export const minus = (payload:number) => {
  return {
    type: MINUS,
    payload:payload
  }
}

// 异步的action
export function asyncAdd (payload:number) {
  return dispatch => {
    setTimeout(() => {
      dispatch(add(payload))
    }, 2000)
  }
}
