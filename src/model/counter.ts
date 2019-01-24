import { Imodel } from '.';
import { fetchGithub } from '../services/api';
import action from '../utils/action';

export interface Icounter {
	num: number;
	netResult: string;
}
const INITIAL_STATE: Icounter = {
	num: 0,
	netResult: '空'
};

const counter: Imodel = {
	namespace: 'counter',
	state: INITIAL_STATE,
	effects: {
    //异步功能展示
		*asyncDva({}, { call, put }) {
      try{
        const response: Igithub = yield call(fetchGithub);
        yield put(action('setNetResult',response));
      }catch(error){
      }
		}
	},
	reducers: {
		add(state: Icounter, { payload }): Icounter {
			return { ...state, num: state.num + payload };
		},
		minus(state: Icounter, { payload }): Icounter {
			return { ...state, num: state.num - payload };
		},
		setNetResult(state: Icounter, { payload }): Icounter {
			return { ...state, netResult: payload };
		}
	}
};

export default counter;
