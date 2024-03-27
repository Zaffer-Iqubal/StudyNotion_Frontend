import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner';
import { Outlet } from 'react-router-dom';
import SliderBar from '../components/core/Dashboard/SliderBar';

export default function Dashboard() {
    const {loading: authLoading} = useSelector((state) => state.auth);    
    const {loading: profileLoading} = useSelector((state) => state.profile);
    
    if(authLoading || profileLoading) {
        return(
        <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
            <Spinner/>
        </div>
    )}

    return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
        <div className='hidden md:block'>
            <SliderBar/>
        </div>

        <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}
