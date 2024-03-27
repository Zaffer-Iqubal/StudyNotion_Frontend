import React, { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import CountryCode from '../../../data/countrycode.json';
import { apiConnector } from '../../../services/apiConector';
import { contactusEndpoint } from '../../../services/apis';
import toast from 'react-hot-toast';

function ContactForm() {
    const [loading, setLoading] = useState(false);
    
    const { register,
            handleSubmit,
            reset,
            formState: {errors, isSubmitSuccessful} 
          } = useForm();
    
    const submitContactForm = async (data) => {
        console.log('Form Data: ', data);
        try {
            setLoading(true)
            const res = await apiConnector(
              "POST",
              contactusEndpoint.CONTACT_US_API,
              data
            )
            toast.success('Mail Send Successfully')
            console.log("Email Res - ", res)
            setLoading(false)
          } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
            toast.error('Error While Sending Mail')
            setLoading(false)
          }
    }   

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                firstName: '',
                lastName: '',
                email: '',
                country_code: '',
                phoneNo: '',
                message: ''
            })
        }
    }, [reset, isSubmitSuccessful]);      
    return (
        <form onSubmit={handleSubmit(submitContactForm)} className='flex flex-col gap-7'>
            {/* First Name & Last Name */}
            <div className='flex flex-col gap-5 lg:flex-row'>
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor='firstName' className='lable-style'>
                        First Name<sup className='text-pink-200'>*</sup>                
                    </label>
                    <input 
                        type="text"
                        name='firstName'
                        id='firstName'
                        placeholder='Enter First Name'
                        className='form-style'
                        {...register('firstName', {required: true})} />
                        {errors.firstName && (<span>Last Name is required</span>)}
                </div>

                <div className='flex flex-col gap-2 lg:w-[48%]'>                
                    <label htmlFor='lastName' className='lable-style'> 
                        Last Name
                    </label>
                    <input 
                        type="text"
                        name='lastName'
                        id='lastName'
                        placeholder='Enter Last Name'
                        className='form-style'
                        {...register('lastName')} />
                </div>
            </div>

            {/* Email Address */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='lable-style'>
                    Email Address<sup className='text-pink-200'>*</sup>
                </label>
                <input type="email"
                name='email'
                id='email'
                placeholder='Enter Email Address'
                className='form-style'
                {...register('email', {required: true})} />
                {errors.email && (<span>Email Address is required</span>)}
            </div>

            {/* Phone Number */}
            <div className='flex flex-col gap-2'>
                <label className='lable-style' htmlFor='phoneNo'>
                    Phone Number <sup className='text-pink-200'>*</sup>
                </label>

                <div className='flex gap-5'>
                    {/* DropDown */}
                    <div className='flex w-[81px] flex-col gap-2'>
                        <select 
                        name="dropdown" 
                        id="dropdown"
                        className='form-style'
                        {...register('country_code', {required: true})}>
                            {CountryCode.map((ele, index) => {
                                return (
                                <option key={index} value={ele.code}>
                                    {ele.code} - {ele.country}
                                </option>
                            )
                            })}
                        </select>
                    </div>

                    <div className='flex w-[calc(100%-90px)] flex-col gap-2'>
                        <input type="text"
                        name='phoneNo'
                        id='phoneNo'
                        placeholder='Enter Phone Number'
                        className='form-style'
                        {...register('phoneNo', { required: 
                                            {   value: true,
                                                message: 'Please enter your Phone Number.'
                                            },
                                            minLength: { value: 10, message: 'Invalid Phone Number'},
                                            maxLength: { value: 12, message: 'Invalid Phone Number'}
                                            })}
                        />
                    </div>
                </div>
                {errors.phoneNo && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                    {errors.phoneNo.message}
                    </span>
                )}
            </div>
            
            {/* Message Form */}
            <div className='flex flex-col gap-2'>
                <label className='lable-style' htmlFor='message'>
                    Message<sup className='text-pink-200'>*</sup>
                </label>
                <textarea 
                name="message" 
                id="message" 
                cols="30" 
                rows="7"
                placeholder='Enter Your Message Here'
                className='form-style'
                {...register('message', {required: true})}/>
                {errors.message && (<span>Please enter your message</span>)}
            </div>

            {/* Submit Button */}
            <button
            type="submit"
            className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
            ${
                !loading &&
                "transition-all duration-200 hover:scale-95 hover:shadow-none"
              }  disabled:bg-richblack-500 sm:text-[16px]`} >
                Send Message
            </button>
    </form>
  )
}

export default ContactForm