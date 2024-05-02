import userService from './userService';

const courseService = {
  getAllCourses: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        const localValue = localStorage.getItem('Courses');

        resolve({
          success: true,
          data: localValue ? JSON.parse(localValue) : [],
        });
      }, 500); // Simulate delay for API call
    });
  },

  createCourse: course => {
    return new Promise(resolve => {
      setTimeout(() => {
        const localValue = localStorage.getItem('Courses');
        const courses = localValue ? JSON.parse(localValue) : [];

        const author = userService.getUser(course.authorId);
        course.author = author.name;

        const courseId = courses.length + 1;

        const newCourse = {id: courseId.toString(), ...course};
        courses.push(newCourse);
        localStorage.setItem('Courses', JSON.stringify(courses));

        resolve({success: true, data: newCourse});
      }, 500); // Simulate delay for API call
    });
  },

  updateCourse: course => {
    return new Promise(resolve => {
      setTimeout(() => {
        const localValue = localStorage.getItem('Courses');
        const courses = JSON.parse(localValue);

        const updatedCourse = courses.map(c =>
          c.id === course.id ? {...c, ...course} : c,
        );
        localStorage.setItem('Courses', JSON.stringify(updatedCourse));

        resolve({success: true});
      }, 500); // Simulate delay for API call
    });
  },

  deleteCourse: id => {
    return new Promise(resolve => {
      setTimeout(() => {
        const localValue = localStorage.getItem('Courses');
        const courses = JSON.parse(localValue);

        const result = courses.filter(c => c.id !== id);
        localStorage.setItem('Courses', JSON.stringify(result));

        resolve({success: true});
      }, 500); // Simulate delay for API call
    });
  },
};

export default courseService;
