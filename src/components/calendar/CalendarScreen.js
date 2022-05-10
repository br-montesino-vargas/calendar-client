import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import { messages } from '../../helpers/calendar-messages';

import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { FloatingActionButton } from '../ui/FloatingActionButton';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { uiOpenModal } from '../../actions/ui';
import { calendarSetActive, calendarClearActive, calendarGetEvents } from '../../actions/calendar';
import { DeleteActionButton } from '../ui/DeleteActionButton';

moment.locale('es');
const localizer = momentLocalizer(moment);


export const CalendarScreen = () =>
{
	const { id } = useSelector(state => state.auth);
	const { events, activeEvent } = useSelector(state => state.calendar);
	const dispatch = useDispatch();

	const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

	useEffect(() =>
	{
		dispatch( calendarGetEvents() );

	}, [dispatch])

	const onDoubleClick = (e) =>
	{
		dispatch( uiOpenModal() );
	}

	const onSelect = (e) =>
	{
		dispatch( calendarSetActive( e ) );
	}

	const onSelectSlot = (e) =>
	{
		dispatch( calendarClearActive() );
	}

	const onViewChange = ( view ) =>
	{
		setLastView( view );
		localStorage.setItem( 'lastView', view );
	}

	const eventStyleGetter = ( event, start, end, isSelected ) =>
	{
		const style = {
			backgroundColor:  ( id === event.user._id || event.user._id === undefined ) ? '#367CF7' : '#465660',
			borderRadius: '0px',
			opacity: 0.8,
			display: 'block',
			color: 'white'
		}

		return {
			style
		}
	}

	return (
		<div className="calendar__screen">
			<Navbar />

			<Calendar
				localizer={ localizer }
				events={ events }
				startAccessor="start"
				endAccessor="end"
				messages={ messages }
				eventPropGetter={ eventStyleGetter }
				onDoubleClickEvent={ onDoubleClick }
				onSelectEvent={ onSelect }
				onSelectSlot={ onSelectSlot }
				selectable={ true }
				onView={ onViewChange }
				view={ lastView }
				components={{ event: CalendarEvent }}
			/>

			<FloatingActionButton />
			{ activeEvent && <DeleteActionButton /> }

			<CalendarModal />
		</div>
	)
}