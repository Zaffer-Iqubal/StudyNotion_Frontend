import React, { useState } from 'react'
import {sidebarLinks} from '../../../data/dashboard-links';
import {logout} from '../../../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { VscSignOut } from 'react-icons/vsc';
import Spinner from '../../common/Spinner';
import SideBarLinks from './SideBarLinks';
import ConfirmationModal from '../../common/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

export default function SliderBar() {
    const {user, loading: profileLoading} = useSelector((state) => state.profile);
    const {loading: authLoading} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [confirmationModal, setConfirmationModal] = useState(null)

    //Setting Media Query
    const isMediumScreenOrLarger = useMediaQuery({minWidth: 768});

    if(profileLoading || authLoading) {
        return ( 
        <div className='grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800'>
            <Spinner/>
        </div>
        )}
    
    return (
    <div>
        <div className={`flex flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 ${isMediumScreenOrLarger ? "h-[calc(100vh-3.5rem)] min-w-[220px] py-10" : 
        "min-w-[200px] py-6 rounded-md transition-all ease-in-out duration-1000"}`}>
            
            {/* Top Part of SlideBar */}
            <div className='flex flex-col'>
                {
                    sidebarLinks.map((link, index) => {
                        if(link.type && user?.accountType !== link.type){
                            return null;
                        }
                        return <SideBarLinks link={link} key={index} index={link.id} iconName={link.icon}/>
                    })
                }
            </div>

            {/* Create Horizontal Line */}
            <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700'/>

            {/* Setting and logout Btn */}
            <div className='flex flex-col'>
                <SideBarLinks link={{name: 'Settings', path: 'dashboard/settings' }}
                iconName='VscSettingsGear'/>

                <button
                onClick={() => setConfirmationModal({
                    text1: 'Are You Sure?',
                    text2: 'You will be logged out of your account.',
                    btn1Text: 'Logout',
                    btn2Text: 'Cancel',
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModal(null)
                    })
                }
                className='px-8 py-2 text-sm font-medium text-richblack-300'
                >
                    <div className='flex items-center gap-x-2'>
                        <VscSignOut className='text-lg'/>
                        <span>Logout</span>
                    </div>
                </button>
            </div>
        </div>

        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}
