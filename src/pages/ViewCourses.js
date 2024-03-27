import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import { setCourseSectionData, 
         setEntireCourseData, 
         setCompletedLectures, 
         setTotalNoOfLectures } from '../slices/viewCourseSlices';

export default function ViewCourses() {

  const {courseId} = useParams();
  const { token } = useSelector((state) => state.auth);   
  const { reviewModal } = useSelector((state) => state.viewCourse);  
  const dispatch = useDispatch();  
  
  useEffect(() => {
    const setCourseSpecificDetails = async() => {
        const courseData = await getFullDetailsOfCourse(courseId, token);
        dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
        dispatch(setEntireCourseData(courseData.courseDetails));
        dispatch(setCompletedLectures(courseData.completedVideos));
        let lectures = 0;
        courseData?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length;
        });
        dispatch(setTotalNoOfLectures(lectures));
    }
    setCourseSpecificDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
        <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
            {/* View course sidebar */}
            <div className='hidden md:block'>
                <VideoDetailsSidebar />
            </div>

            <div className='flex-1 h-[calc(100vh-3.5rem)] overflow-auto'>
                <div className='mx-6'>
                    <Outlet />
                </div>
            </div>
        </div>
        {reviewModal && <CourseReviewModal />}
    </div>
  )
}
