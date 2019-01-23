import { CounterLoading, CounterNetResult } from '../constants/counter';
import { ADD, MINUS } from '../constants/counter';
import request from '../utils/request';

export const add = (payload: number) => {
	return {
		type: ADD,
		payload: payload
	};
};
export const minus = (payload: number) => {
	return {
		type: MINUS,
		payload: payload
	};
};

const setLoading = (payload:boolean) => {
	return {
    type: CounterLoading,
    payload: payload
	};
};

// redux-thunk实现的异步：本质是返回一个function
export function asyncByThunk(payload: number) {
	return dispatch => {
		//1 首先通知start loading
		dispatch(setLoading(true));
		//2 异步请求
		// setTimeout(() => {
		//   dispatch(add(payload))
		// }, 2000)
		request<any,Igithub>('https://api.github.com/users/octocat')
			.then(success => {
        dispatch({
          type:CounterNetResult,
          payload:success
        });
      })
      .catch(error => {dispatch(setLoading(false));});
	};
}
