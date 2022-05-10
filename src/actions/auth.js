import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { calendarLogout } from './calendar';


export const authLogin = ( email, password ) =>
{
	return async ( dispatch ) =>
	{
		const response = await fetchWithoutToken( 'auth', { email, password }, 'POST' );
		const body = await response.json();

		if( body.ok )
		{
			const { id, name, token } = body;

			localStorage.setItem('token', token );
			localStorage.setItem('token-init-date', new Date().getTime() );

			dispatch( login( { id, name }) );
		}
		else
		{
			Swal.fire('Error', body.msg, 'error');
		}
	}
}

export const authRegister = ( name, email, password ) =>
{
	return async ( dispatch ) =>
	{
		const response = await fetchWithoutToken( 'auth/register', { name, email, password }, 'POST' );
		const body = await response.json();

		if( body.ok )
		{
			const { id, name, token } = body;

			localStorage.setItem('token', token );
			localStorage.setItem('token-init-date', new Date().getTime() );

			dispatch( login({ id, name }) );
		}
		else
		{
			Swal.fire('Error', body.msg, 'error');
		}
	}
}

export const authRenew = () =>
{
	return async ( dispatch ) =>
	{
		const response = await fetchWithToken( 'auth/renew' );
		const body = await response.json();

		if( body.ok )
		{
			const { id, name, token } = body;

			localStorage.setItem('token', token );
			localStorage.setItem('token-init-date', new Date().getTime() );

			dispatch( login({ id, name }) );
		}
		else
		{
			dispatch( clearCheck() );
		}
	}
}

export const authLogout = () =>
{
	return async ( dispatch ) =>
	{
		localStorage.clear();
		dispatch( logout() );
		dispatch( calendarLogout() );
	}
};

const login = ( user ) => (
{
	type: types.authLogin,
	payload: user
});

const clearCheck = () => ({ type: types.authClearChecking });

const logout = () => ({ type: types.authLogout });