import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';

import { uiCloseModal } from '../../actions/ui';
import { calendarClearActive, calendarAddNewEvent, calendarUpdateEvent } from '../../actions/calendar';

const customStyles = {
	content : {
		top                   : '50%',
		left                  : '50%',
		right                 : 'auto',
		bottom                : 'auto',
		marginRight           : '-50%',
		transform             : 'translate(-50%, -50%)'
	}
};
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const final = now.clone().add(1, 'hours');

const initEvent = {
	title: '',
	notes: '',
	start: now.toDate(),
	end: final.toDate()
}

export const CalendarModal = () =>
{
	const dispatch = useDispatch();

	const { modalOpen } = useSelector(state => state.ui);
	const { activeEvent } = useSelector(state => state.calendar);

	const [startDate, setStartDate] = useState( now.toDate() );
	const [endDate, setEndDate] = useState( final.toDate() );
	const [validTitle, setValidTitle] = useState( true );

	const [formValues, setFormValues] = useState( initEvent );
	const { title, notes, start, end } = formValues;

	useEffect(() =>
	{
		if( activeEvent )
		{
			setFormValues( activeEvent );
		}
		else
		{
			setFormValues( initEvent );
		}

	}, [ activeEvent, setFormValues ])

	const closeModal = () =>
	{
		dispatch( calendarClearActive() );
		dispatch( uiCloseModal() );

		setFormValues( initEvent );
	}

	const handleChange = ({ target }) =>
	{
		setFormValues(
		{
			...formValues,
			[ target.name ] : target.value
		});
	}

	const handleStartDateChange = ( e ) =>
	{
		setStartDate( e );

		setFormValues(
		{
			...formValues,
			start : e
		});
	}

	const handleEndDateChange = ( e ) =>
	{
		setEndDate( e );
		setFormValues(
		{
			...formValues,
			end : e
		});
	}

	const handleSubmit = ( e ) =>
	{
		e.preventDefault();

		const validateStart = moment( start );
		const validateEnd = moment( end );
		
		if( validateStart.isSameOrAfter( validateEnd ))
		{
			return Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error');
			
		}

		if( title.trim().length < 2 )
		{
			return setValidTitle(false);
		}

		if( activeEvent )
		{
			dispatch( calendarUpdateEvent( formValues ) );
		}
		else
		{
			// setTimeout
			dispatch( calendarAddNewEvent( formValues ));
		}


		setValidTitle(true);
		closeModal();
	}

	return (
		<Modal
			isOpen={ modalOpen }
			onRequestClose={ closeModal }
			style={ customStyles }
			closeTimeoutMS={ 200 }
			className="modal"
			overlayClassName="modal-fondo">

			{/* HTML */}

			<h1> { ( activeEvent ) ? 'Editar evento' : 'Nuevo evento' }</h1>
			<hr />
			<form className="container" onSubmit={ handleSubmit }>

				<div className="form-group">
					<label>Fecha y hora inicio</label>

					<DateTimePicker
						onChange={ handleStartDateChange }
						value={ startDate }
						className="form-control"
					/>
				</div>

				<div className="form-group">
					<label>Fecha y hora fin</label>
					
					<DateTimePicker
						onChange={ handleEndDateChange }
						value={ endDate }
						minDate={ startDate }
						className="form-control"
					/>
				</div>

				<hr />
				<div className="form-group">
					<label>Titulo y notas</label>
					<input 
						type="text" 
						className={ `form-control ${ !validTitle && 'is-invalid' }` }
						placeholder="Título del evento"
						name="title"
						autoComplete="off"
						value={ title }
						onChange={ handleChange }
					/>
					<small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
				</div>

				<div className="form-group">
					<textarea 
						type="text" 
						className="form-control"
						placeholder="Notas"
						rows="5"
						name="notes"
						value={ notes }
						onChange={ handleChange }
					></textarea>
					<small id="emailHelp" className="form-text text-muted">Información adicional</small>
				</div>

				<button
					type="submit"
					className="btn btn-outline-primary btn-block"
				>
					<i className="far fa-save"></i>
					<span> Guardar</span>
				</button>

			</form>

			{/* Fin HTML */}
		</Modal>
	)
}
