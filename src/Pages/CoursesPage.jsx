import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {getAccessToken, removeAccessToken} from '../services/tokenStorage';
import useCourses from '../hooks/useCourses';

const CoursesPage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!getAccessToken()) navigate('/');
	}, [navigate]);

	const logOut = () => {
		removeAccessToken();
		navigate('/');
	};

	const {courses, isLoading} = useCourses();

	if (isLoading) {
		return <>Loading...</>;
	}

	return (
		<>
			<button onClick={logOut} className="logout">
				Log Out
			</button>
			{courses.map((course, index) => {
				return (
					<div key={index} className="course">
						<span>{course.title}</span>
						<span>${course.price}</span>
						<span>{course.status}</span>
						<span>{course.author}</span>
						<label htmlFor="update">
							Update
							<input
								type="checkbox"
								name="update"
								id="update"
								defaultChecked={course.canUpdate}
								disabled
							/>
						</label>
						<label htmlFor="delete">
							Delete
							<input
								type="checkbox"
								name="delete"
								id="delete"
								defaultChecked={course.canDelete}
								disabled
							/>
						</label>
					</div>
				);
			})}
		</>
	);
};

export default CoursesPage;
