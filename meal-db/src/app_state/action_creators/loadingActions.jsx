/*
	This file contains functions for receiving loading state data, 
	and dispatching proper data for updating state
*/

import { LOADING, NOT_LOADING } from '../actions.jsx';

export const isLoading = () => {
	return {
		type: LOADING
	}
}
export const isPending = () => {
	return {
		type: NOT_LOADING
	}
}
