import { combineReducers } from 'redux';
import { uiReducer } from './uiReducer';
import { authReducer } from './authReducer';
import { calendarReducer } from './calendarReducer';

export const rootReducer = combineReducers(
{
	ui: uiReducer,
	auth: authReducer,
	calendar: calendarReducer
})