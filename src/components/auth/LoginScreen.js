import React from 'react';
import './login.css';

import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { useForm } from '../../hooks/useForm';
import { authLogin, authRegister } from '../../actions/auth';

export const LoginScreen = () =>
{
	const dispatch = useDispatch();

	const [ login, setLogin ] = useForm(
	{
		email_login: '',
		pass_login: ''
	});

	const [ register, setRegister ] = useForm(
	{
		name_register: '',
		email_register: '',
		pass_register: '',
		pass2_register: ''
	});

	const { email_login, pass_login } = login;

	const { name_register, email_register, pass_register, pass2_register } = register;

	const handleLogin = ( e ) =>
	{
		e.preventDefault();

		dispatch( authLogin( email_login, pass_login ));
	}

	const handleRegister = ( e ) =>
	{
		e.preventDefault();

		if( pass_register !== pass2_register )
		{
			return Swal.fire('Error', 'Las constraseñas deben coincidir', 'error');
		}

		dispatch( authRegister( name_register, email_register, pass_register ));
	}

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input
								type="text"
								className="form-control"
								placeholder="Correo"
								name="email_login"
								value={ email_login }
								onChange={ setLogin }
							/>
                        </div>
                        <div className="form-group">
                            <input
								type="password"
								className="form-control"
								placeholder="Contraseña"
								name="pass_login"
								value={ pass_login }
								onChange={ setLogin }
							/>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btnSubmit" value="Login" />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>

                        <div className="form-group">
							<input
								type="text"
								className="form-control"
								placeholder="Nombre"
								name="name_register"
								value={ name_register }
								onChange={ setRegister }
							/>
                        </div>
                        <div className="form-group">
							<input
								type="email"
								className="form-control"
								placeholder="Correo"
								name="email_register"
								value={ email_register }
								onChange={ setRegister }
							/>
                        </div>
                        <div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
								name="pass_register"
								value={ pass_register }
								onChange={ setRegister }
							/>
                        </div>

                        <div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Repita la contraseña"
								name="pass2_register"
								value={ pass2_register }
								onChange={ setRegister }
							/>
                        </div>

                        <div className="form-group">
                            <input type="submit" className="btnSubmit" value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}