import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import userService from '../services/userService';
import {setAccessToken} from '../services/tokenStorage';

const HomePage = () => {
	const [authForm, setAuthForm] = useState(null); // uses the useState hook to manage the state of the authentication form (authForm), and the useForm hook to manage the form data.
	const {register, handleSubmit, reset} = useForm();

	const navigate = useNavigate();

	const onSubmitHandler = async formData => {
		try {
			let response;
			if (authForm === 'login')
				response = await userService.logIn(formData);

			if (authForm === 'signup')
				response = await userService.signUp(formData);

			if (response.success) {
				setAccessToken(response.access_token);
				navigate('/courses');
				reset();
			}
		} catch (error) {
			alert(error);
		}
	};

	return (
		<>
			<h1>Cerbos React Demo</h1>

			<div className='buttons'>
				<span onClick={() => setAuthForm('login')}>Sign In </span>|
				<span onClick={() => setAuthForm('signup')}> Sign Up</span>
			</div>

			{authForm === 'login' && (
				<form onSubmit={handleSubmit(onSubmitHandler)} className="form">
					<input type="email" placeholder="email" {...register('email')} />
					<input
						type="password"
						placeholder="password"
						{...register('password')}
					/>
					<button type="submit">Login</button>
				</form>
			)}

			{authForm === 'signup' && (
				<form onSubmit={handleSubmit(onSubmitHandler)} className="form">
					<input type="text" placeholder="name" {...register('name')} />
					<input type="email" placeholder="email" {...register('email')} />
					<input
						type="password"
						placeholder="password"
						{...register('password')}
					/>
					<button type="submit">Signup</button>
				</form>
			)}
		</>
	);
};

export default HomePage;
