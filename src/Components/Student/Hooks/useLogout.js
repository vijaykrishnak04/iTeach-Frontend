// useLogout.js
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetClassState } from '../../../Redux/Features/Student/ClassSlice';
import { resetCourseState } from '../../../Redux/Features/Student/CoursesSlice';
import { resetEnrollmentState } from '../../../Redux/Features/Student/EnrolledClassSlice';
import { StudentAuthReset } from '../../../Redux/Features/Student/AuthSlice';
import { resetExamState } from '../../../Redux/Features/Student/ExamSlice';

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = useCallback(() => {
    try {
      localStorage.removeItem("studentToken");
      dispatch(resetClassState());
      dispatch(resetCourseState());
      dispatch(resetEnrollmentState());
      dispatch(StudentAuthReset());
      dispatch(resetExamState());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }

  }, [dispatch, navigate]);

  return { handleLogout };
};

export default useLogout;

