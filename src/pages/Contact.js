import React from 'react'
import Footer from '../components/common/Footer';
import ContactDetails from '../components/core/ContactPage/ContactDetails';
import ContactFormContact from '../components/core/ContactPage/ContactFormContact';
import ReviewSlider from '../components/common/ReviewSlider';

export default function Contact() {
  return (
        <div>
            <div className='mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row'>
                <div className='lg:w-[40%]'>
                    <ContactDetails/>
                </div>

                <div className='lg:w-[60%]'>
                    <ContactFormContact/>
                </div>
            </div>

            <section className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
                {/* Reviws from Other Learner */}
                <h1 className="text-center text-4xl font-semibold mt-10">
                Reviews from other learners
                </h1>
                <ReviewSlider />
            </section>

        {/* Footer */}
        <Footer/>
    </div>

  )
}
