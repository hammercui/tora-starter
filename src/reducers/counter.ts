import { ADD, MINUS } from '../constants/counter'

const INITIAL_STATE = {
  num: 0
}

export default function counter (state = INITIAL_STATE, {type,payload}) {
  switch (type) {
    case ADD:
      return {
        ...state,
        num: state.num + payload
      }
     case MINUS:
       return {
         ...state,
         num: state.num - payload
       }
     default:
       return state
  }
}
