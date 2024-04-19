import { useEffect, useState, useMemo, useCallback } from 'react';
import { useCerbos } from '@cerbos/react';
import courseService from '../services/courseService';

const useCourses = () => {
  const cerbos = useCerbos();

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const fetchCourses = useCallback(async () => {
    console.log('Fetching courses...');
    setLoading(true);

    try {
      const res = await courseService.getAllCourses();

      const authorizedCourses = await Promise.all(
        res.data.map(async (course) => {
          const check = await cerbos.checkResource({
            resource: {
              kind: 'course',
              id: course.id,
              attr: JSON.parse(JSON.stringify(course)),
            },
            actions: ['view', 'update', 'delete'],
          });

          return (
            check.isAllowed('view') && {
              ...course,
              canUpdate: check.isAllowed('update'),
              canDelete: check.isAllowed('delete'),
            }
          );
        })
      );

      setCourses(authorizedCourses.filter(Boolean));
    } catch (error) {
      console.error('Error during course retrieval or authorization check:', error);
      setError(error.message);
    } finally {
      console.log('Course fetching completed.');
      setLoading(false);
    }
  }, [cerbos]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  console.log('Returning courses:', courses);
  return { courses, error, isLoading, setCourses, setError, fetchCourses };
};

export default useCourses;