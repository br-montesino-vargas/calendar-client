import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { authRenew } from '../actions/auth';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () =>
{
	const dispatch = useDispatch();
	const { check, id } = useSelector(state => state.auth);

	useEffect(() =>
	{
		dispatch( authRenew() );

	}, [dispatch]);

	if( check )
	{
		return <h5> Espere... </h5>;
	}

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
						exact
						path="/login"
						component={ LoginScreen }
						isAuthenticated={ !!id }
					/>

                    <PrivateRoute
						exact
						path="/"
						component={ CalendarScreen }
						isAuthenticated={ !!id }
					/>

                    <Redirect to="/" />   
                </Switch>
            </div>
        </Router>
    )
}
