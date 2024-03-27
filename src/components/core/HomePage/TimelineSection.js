import React from 'react'
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineImg from '../../../assets/Images/TimelineImage.png'

function TimelineSection() {
    const timeLine = [
        {
            Logo: logo1,
            heading: 'Leadership',
            description: 'Fully committed to the success company'
        },
        {
            Logo: logo2,
            heading: 'Responsibility',
            description: 'Students will always be our top priority'
        },
        {
            Logo: logo3,
            heading: 'Flexibility',
            description: 'The ability to switch is an important skills'
        },
        {
            Logo: logo4,
            heading: 'Solve the problem',
            description: 'Code your way to a solution'
        },

    ]
  return (
    <div>
        <div className='flex flex-col lg:flex-row gap-20 mb-20 items-center'>

            {/* Left Side */}
            <div className='lg:w-[45%] flex flex-col gap-14 lg:gap-3'>
                {
                    timeLine.map((item, key) => {
                        return (
                            <div className='flex flex-col lg:gap-3' key={key}>
                                
                                <div className='flex gap-6' key={key}>
                                    <div className='w-[52px] h-[52px] bg-white rounded-full flex items-center justify-center shadow-[#00000012] shadow-[0_0_62px_0]'>
                                        <img src={item.Logo} alt="Logo1" />
                                    </div>

                                    <div>
                                        <h2 className='font-semibold text-[18px]'>{item.heading}</h2>
                                        <p className='text-base'>{item.description}</p>
                                    </div>
                    
                                </div>
                                <div className={`hidden ${
                                        timeLine.length - 1 === key ? "hidden" : "lg:block"
                                    }  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}
                                ></div>
                            </div>
                            
                        )
                    })
                }
            </div>

            {/* Right side */}
            <div className='relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]'>
                <img src={timelineImg} alt="timeLineImage" className='shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit' />

                {/* Green Part */}
                <div className='absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10'>
                    <div className='flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14'>
                        <p className='text-3xl font-bold w-[75px]'>10</p>
                        <p className='text-caribbeangreen-300 text-sm w-[75px]'>Year of Experience</p>
                    </div>

                    <div className='flex gap-5 items-center lg:px-14 px-7'>
                        <p className='text-3xl font-bold w-[75px]'>250</p>
                        <p className='text-caribbeangreen-300 text-sm w-[75px]'>Type of courses</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default TimelineSection