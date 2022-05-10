const apiURL = process.env.REACT_APP_CALENDAR_API_URL;

const fetchWithToken = ( endpoint, data, method = 'GET' ) =>
{
	const url = `${ apiURL }/${ endpoint }`;
	const token = localStorage.getItem('token') || '';

	if( method === 'GET' )
	{
		return fetch( url,
		{
			method,
			headers: {
				'X-TOKEN': token
			}
		});
	}
	else
	{
		return fetch( url,
		{
			method,
			headers: {
				'Content-type': 'application/json',
				'X-TOKEN': token
			},
			body: JSON.stringify( data )
		});
	}
}

const fetchWithoutToken = ( endpoint, data, method = 'GET' ) =>
{
	const url = `${ apiURL }/${ endpoint }`;

	if( method === 'GET' )
	{
		return fetch( url );
	}
	else
	{
		return fetch( url,
		{
			method,
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify( data )
		});
	}
}

export { fetchWithToken, fetchWithoutToken };