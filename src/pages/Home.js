import React from 'react'
import {NavLink} from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import HighLight from '../components/core/HomePage/HighLight';
import CTAButton from '../components/core/HomePage/CTAButton';
import Banner from '../assets/Images/banner.mp4'
import CodeBlock from '../components/core/HomePage/CodeBlock';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InsructorSection from '../components/core/HomePage/InsructorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';
import Footer from '../components/common/Footer'

function Home() {
  return (
    <div>
        {/* Section - 1 */}
        <div className='relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white'>

            <NavLink to={'/signup'}>
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none'> 
                    <div className='flex flex-row items-center gap-2 rounded-full px-7 py-[5px] group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </NavLink>

            <div className='text-center text-4xl font-semibold mt-10'>
                Empower Your Future with <HighLight text={'Coding Skills'}/>
            </div>

            <div className='-mt-3 text-center w-[90%] text-lg font-bold text-richblack-300'>
                With our online coding courses, you can learn at your own pace, from
                anywhere in the world, and get access to a wealth of resources,
                including hands-on projects, quizzes, and personalized feedback from
                instructors.
            </div>

            <div className='flex flex-row justify-center gap-7 mt-3'>
                <CTAButton active={true} linkto={'/login'}>
                    Learn More
                </CTAButton>

                <CTAButton linkto={'/login'}>
                    Book a Demo
                </CTAButton>
            </div>


            {/* Adding Video */}
            <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
                <video className="shadow-[20px_20px_rgba(255,255,255)]" muted loop autoPlay>
                    <source src={Banner}/>
                </video>
            </div>

            {/* Code-Section-1 */}
            <div>
                <CodeBlock position={'lg: flex-row'}
                heading={<div className='text-4xl font-semibold'>
                    Unlock your{" "} 
                    <HighLight text={'coding potential'}/>
                    {" "}with our online courses.
                </div>}

                subHeading={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
                
                ctabtn1={
                    {
                        active: true,
                        btnText: 'Try Yourself',
                        linkto: '/signup'
                    }
                }
                
                ctabtn2={
                    {
                        active: false,
                        btnText: 'Learn More',
                        linkto: '/signup'
                    }
                }
                
                codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                
                
                codeColor={"text-yellow-25"}

                bgGradient={<div className='codeblock1 absolute'></div>}
                />
            </div>
            

            {/* Code Section - 2  */}
            <div>
                <CodeBlock position={'lg: flex-row-reverse'}
                heading={<div className='w-[100%] text-4xl font-semibold lg:w-[50%]'>
                    Start{" "} 
                    <HighLight text={'coding in seconds'}/>
                </div>}

                subHeading={`Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.`}
                
                ctabtn1={
                    {
                        active: true,
                        btnText: 'Continue Lesson',
                        linkto: '/signup'
                    }
                }
                
                ctabtn2={
                    {
                        active: false,
                        btnText: 'Learn More',
                        linkto: '/signup'
                    }
                }
                
                codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                
                codeColor={"text-white"}

                bgGradient={<div className='codeblock2 absolute'></div>}
                />
            </div>

            <div>
                <ExploreMore/>
            </div>    

        </div>

        {/* Section - 2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
            {/* Pattern White Background */}
            <div className='homePage h-[310px]'>
                <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto justify-center'>
                    <div className='lg:h-[150px]'></div>
                    <div className='flex flex-row gap-7 text-white lg:mt-8'>
                        <CTAButton active={true} linkto={'/signup'}>
                            <div className='flex gap-3 items-center'>
                                Explore Full Catalog
                                <FaArrowRight/>
                            </div>
                        </CTAButton>

                        <CTAButton linkto={'/login'}>
                            Learn More
                        </CTAButton>
                    </div>
                </div>
            </div>

            {/* White Bg */}
            <div className='w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-center gap-7'>

                <div className='flex flex-row gap-5 justify-between mt-[95px] mb-10'>
                    <div className='text-4xl font-semibold lg:w-[45%]'>
                        Gets the skills you need for a <HighLight text={'job that is in demand.'}/>
                    </div>

                    <div className='flex flex-col items-start gap-10 lg:w-[40%]'>
                    <div className='text-[16px]'>
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                    </div>
                    <CTAButton active={true} linkto={'/signup'}>
                        Learn More
                    </CTAButton>
                    </div>
                </div>
            

                <TimelineSection/>

                <LearningLanguageSection/>

            </div>

        </div>
        
        {/* Section - 3 */}
        <div className='relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>

            <InsructorSection/>

            <h2 className='text-center text-4xl font-semibold mt-10'>Reviews from others learners
            </h2>    
            
        </div>
        <div className='relative mx-auto my-20  w-11/12 max-w-maxContent gap-8'>
            <ReviewSlider/>
        </div>
        
        {/* Footer/ */}
        <Footer/>
    </div>
  )
}

export default Home