import { ADD, MINUS, CounterLoading, CounterNetResult } from '../constants/counter';

export interface Icounter {
	num: number;
	loading: boolean;
	netResult: string;
}
const INITIAL_STATE: Icounter = {
	num: 0,
	loading: false,
	netResult: '空'
};

export default function counter(state = INITIAL_STATE, { type, payload }): Icounter {
	switch (type) {
		case CounterLoading:
			return {
				...state,
				loading: payload
			};
		case CounterNetResult:
			return {
				...state,
				loading: false,
				netResult: JSON.stringify(payload)
			};
		case ADD:
			return {
				...state,
				loading: false,
				num: state.num + payload
			};
		case MINUS:
			return {
				...state,
				loading: false,
				num: state.num - payload
			};

		default:
			return state;
	}
}
