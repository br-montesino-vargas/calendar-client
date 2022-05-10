import { types } from '../types/types';

const initialState = {
	check : true
	// uid		 : null,
	// name	 : null
}

export const authReducer = ( state = initialState, action ) =>
{
	switch ( action.type )
	{
		case types.authLogin:
			return {

				...state,
				...action.payload,
				check: false
			}

		case types.authClearChecking:

			return {
				...state,
				check: false
			}

		case types.authLogout:

			return {
				check: false
			}
	
		default:
			return state;
	}
}