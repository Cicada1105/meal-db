import { LOADING, NOT_LOADING } from '../actions.jsx';

const initialState = {
	isLoading: false
};

export const loadingReducer = (state = initialState, action) => {
	switch(action.type) {
		case LOADING:
			return {
				...state,
				isLoading: true
			};
		case NOT_LOADING:
			return {
				...state,
				isLoading:false
			};
		default: 
			return {
				...state,
				isLoading:false
			};
	}
}