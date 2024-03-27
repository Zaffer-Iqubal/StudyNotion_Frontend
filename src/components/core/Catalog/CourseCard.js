import React, { useEffect, useState } from 'react'
import RatingStar from '../../common/RatingStars';
import GetAvgRating from '../../../utils/GetAvgRating';
import { Link } from 'react-router-dom';

export default function CourseCard({course, Height}) {

  const [avgReviewCount, setAvgReviewCount] = useState(0);
  
  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews)
    setAvgReviewCount(count);
  }, [course])

  return (
    <div>
        <Link to={`/courses/${course._id}`}>
          <div>
            <div>
              <img className={`h-[250px] sm:${Height} w-full rounded-lg object-cover`} 
              src={course?.thumbnail} 
              alt={course?.courseName}
              loading='lazy' />
            </div>
            <div className='flex flex-col gap-2 px-1 py-3'>
              {/* Name */}
              <p className='text-xl text-richblack-5'>
                {course.courseName}
              </p>
              {/* Instructor Name */}
              <p className='text-sm text-richblack-50'>
              {course?.instructor?.firstName ? `Instructor : ${course?.instructor?.firstName}` : ''} {course?.instructor?.lastName}
              </p>

              {/* Rating */}
              <div className='flex items-center gap-2'>
                <span className='text-yellow-5'>{avgReviewCount || 0}</span>
                <RatingStar Review_Count={avgReviewCount}/>
                <span className='text-richblack-400'>{course?.ratingAndReviews?.length} Ratings</span>
              </div>
              {/* Price */}
              <p className='text-xl text-richblack-5'>Rs. {course?.price}</p>
            </div>
          </div>
        </Link>
    </div>
  )
}
