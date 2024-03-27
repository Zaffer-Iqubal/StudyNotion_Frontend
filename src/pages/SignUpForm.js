import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Tab from '../components/common/Tab';
import { ACCOUNT_TYPE } from '../utils/Constants';
import { setSignupData } from '../slices/authSlices';
import { sendOtp } from '../services/operations/authAPI';


function SignUpForm() {
  // eslint-disable-next-line
  const [formData, setFormData] = useState({firstName: '', lastName: '', email: '', password: '', confirmPassword: ''});

  const [showPassword, setShowPassword] = useState(false);  
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const changeHandler = (event) => {
    const {name, value} = event.target;
    setFormData( prevData => ({...prevData, [name]:value}))
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {firstName, lastName, email, password, confirmPassword} = formData;

  const submitHandler = (event) => {
    event.preventDefault()

    if(password !== confirmPassword){
        toast.error('Password not matched.')
        return;
    }

    const signupData = {
        ...formData,
        accountType
    }

    //Setting signup data to state
    //To be used after OTP Verification
    dispatch(setSignupData(signupData))

    //send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate));
    
    // Reset
    setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)  
  }

  const tabData = [
    {
        id: 1,
        tabName: 'Instructor',
        type: ACCOUNT_TYPE.INSTRUCTOR
    },
    {
        id: 2,
        tabName: 'Student',
        type: ACCOUNT_TYPE.STUDENT
    }
  ]


  return (
    <div>
        <Tab tabData={tabData} field={accountType} setField={setAccountType}/>
        <form onSubmit={submitHandler} className='flex w-full flex-col gap-y-4' >
            {/* First Name and Last Name */}
            <div className='flex gap-x-4'>
                <label>
                    <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                        First Name <sup className='text-pink-200'>*</sup>
                    </p>
                    <input 
                    type="text" 
                    name='firstName' 
                    placeholder='Enter First Name' 
                    onChange={changeHandler} 
                    value={firstName} 
                    required
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }} 
                    className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5' />
                </label>

                <label>
                    <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                        Last Name <sup className='text-pink-200'>*</sup>
                    </p>
                    <input 
                    type="text" 
                    name='lastName' 
                    placeholder='Enter Last Name' 
                    onChange={changeHandler} 
                    value={lastName} 
                    required
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }} 
                    className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5' />
                </label>
            </div>

            {/* Create Email Address */}
            <div className='mt-2'>
                <label className='w-full'>
                    <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                        Email Address <sup className='text-pink-200'>*</sup>
                    </p>
                    <input 
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={changeHandler} 
                    placeholder='Enter Email Address' 
                    required  style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />  
                </label>
            </div>

            {/* Create Passowrd and ConfirmPassword */}
            <div className='flex gap-x-4'>
                <label className='relative'>
                    <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                        Create Password <sup className='text-pink-200'>*</sup>
                    </p>
                    <input 
                    type={`${showPassword ? ('text'):('password')}`} 
                    name='password' 
                    value={password} 
                    placeholder='Enter Password' 
                    onChange={changeHandler} 
                    required 
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                    />
                    <span className='absolute right-3 top-[38px] z-[10] cursor-pointer' onClick={() => setShowPassword(prev => !prev)}>
                        {/* show password button */}
                        {
                            showPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/> : <AiOutlineEye fontSize={24} fill='#AFB2BF'/>
                        }
                    </span>
                </label>

                <label className='relative'>
                    <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                        Create Password <sup className='text-pink-200'>*</sup>
                    </p>
                    <input 
                    type={`${showConfirmPassword ? ('text'):('password')}`} 
                    name='confirmPassword' 
                    value={confirmPassword} 
                    placeholder='Confirm Your Password' 
                    onChange={changeHandler} 
                    required 
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                    />
                    <span className='absolute right-3 top-[38px] z-[10] cursor-pointer' onClick={() => setShowConfirmPassword(prev => !prev)}>
                        {/* show password button */}
                        {
                            showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/> : <AiOutlineEye fontSize={24} fill='#AFB2BF'/>
                        }
                    </span>
                </label>
            </div>

            <button
            type='submit' 
            className='mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900'>Create Account</button>
        </form>
    </div>
  )
}

export default SignUpForm;