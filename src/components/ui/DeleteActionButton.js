import React from 'react';
import { useDispatch } from 'react-redux';
import { calendarDeleteEvent } from '../../actions/calendar';

export const DeleteActionButton = () =>
{
	const dispatch = useDispatch();

	const handleDelete = () =>
	{
		dispatch( calendarDeleteEvent() );
	}

	return (
		<button className="btn btn-danger fab-danger" onClick={ handleDelete }>
			<i className="fas fa-trash"></i>
			<span> Borrar evento</span>
		</button>
	)
}
