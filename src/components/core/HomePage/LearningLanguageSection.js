import React from 'react'
import HighLight from './HighLight';
import knownYourProgress from '../../../assets/Images/Know_your_progress.png';
import comparesWithOthers from '../../../assets/Images/Compare_with_others.svg';
import planYourLessons from '../../../assets/Images/Plan_your_lessons.png';
import CTAButton from './CTAButton';

function LearningLanguageSection() {
  return (
    <div className='mt-[120px] mb-28'>
        <div className='flex flex-col items-center gap-5'>
          
          <div className='text-4xl font-semibold text-center'>
            Your Swiss Knife for 
            <HighLight text={' learning any language'}/>
          </div>

          <div className='text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.    
          </div>
          
          <div className='flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0'>
            <img src={knownYourProgress} alt="Know Your Progress" className='object-contain  lg:-mr-32' />
            <img src={comparesWithOthers} alt="Compares With Others" className='object-contain lg:-mb-10 lg:-mt-0 -mt-12' />
            <img src={planYourLessons} alt="Plan Your Lessons" className='object-contain  lg:-ml-36 lg:-mt-5 -mt-16' />
          </div>

          <div className='w-fit mx-auto lg:mb-20 mb-8 mt-[50px]'>
            <CTAButton active={true} linkto={'/signup'}>
              <div className=''>Learn More</div>
            </CTAButton>
          </div>
        </div>
    </div>
  )
}

export default LearningLanguageSection