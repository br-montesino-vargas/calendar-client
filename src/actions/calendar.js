import Swel from 'sweetalert2';

import { types } from "../types/types";
import { fetchWithToken } from "../helpers/fetch";
import { formatEvent } from "../helpers/formatEvent";

export const calendarGetEvents = () =>
{
	return async ( dispatch ) =>
	{
		try
		{
			const response = await fetchWithToken('calendar');
			const body = await response.json();

			const events = formatEvent( body.eventos );

			dispatch( getEvents( events ));
		}
		catch (error)
		{
			console.log(error);
		}
	}
}

export const calendarAddNewEvent = ( event ) =>
{
	return async ( dispatch, getState ) =>
	{
		const { id, name } = getState().auth;

		try
		{
			const response = await fetchWithToken('calendar', event, 'POST');
			const body = await response.json();

			if( body.ok )
			{
				event.id = body.evento.id;
				event.user = { id, name };

				dispatch( addNewEvent( event ));
			}	
		}
		catch (error)
		{
			console.log(error);
		}
	}
};

export const calendarUpdateEvent = ( event ) =>
{
	return async ( dispatch ) =>
	{
		try
		{
			const response = await fetchWithToken(`calendar/${ event.id }`, event, 'PUT');
			const body = await response.json();

			if( body.ok )
			{
				dispatch( updateEvent( event ));
			}
			else
			{
				Swel.fire('Error', body.msg );
			}
		}
		catch (error)
		{
			console.log(error);
		}
	}
};

export const calendarDeleteEvent = ( event ) =>
{
	return async ( dispatch, getState ) =>
	{
		const { id } = getState().calendar.activeEvent;

		try
		{
			const response = await fetchWithToken(`calendar/${ id }`, {}, 'DELETE');
			const body = await response.json();

			if( body.ok )
			{
				dispatch( deleteEvent());
			}
			else
			{
				Swel.fire('Error', body.msg );
			}
		}
		catch (error)
		{
			console.log(error);
		}
	}
};

export const calendarSetActive = ( event ) =>
({
	type: types.calendarSetActive,
	payload: event
});

export const calendarClearActive = () => ({ type: types.calendarClearActive });
export const calendarLogout = () => ({ type: types.calendarLogout });

const getEvents = ( events ) =>
({
	type: types.calendarGetEvents,
	payload: events
});

const addNewEvent = ( event ) =>
({
	type: types.calendarAddNewEvent,
	payload: event
});

const updateEvent = ( event ) =>
({
	type: types.calendarUpdateEvent,
	payload: event
});

const deleteEvent = () => ({ type: types.calendarDeleteEvent });
