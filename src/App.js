import "./App.css";
import {Routes, Route} from 'react-router-dom';
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Home from './pages/Home';
import Login from './pages/Login';
import Catalog from "./pages/Catalog";
import SignUp from "./pages/SignUp";
import Navbar from './components/common/Navbar'
import ForgotPassWordPg from "./pages/ForgotPassWordPg";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error from './pages/Error';
import Dashboard from "./pages/Dashboard";
import MyProfile from './components/core/Dashboard/MyProfile';
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import {ACCOUNT_TYPE} from './utils/Constants';
import Cart from "./components/core/Dashboard/Cart/Cart";
import Settings from "./components/core/Dashboard/Settings/Settings";
import MyCourse from "./components/core/Dashboard/MyCourse";
import CourseDetails from "./pages/CourseDetails";
import AddCourse from './components/core/Dashboard/AddCourse/index';
import { useSelector } from "react-redux";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import ViewCourse from "./pages/ViewCourses";
import VideoDetails from './components/core/ViewCourse/VideoDetails';
import InstructorDashboard from "./components/core/Dashboard/InstructorDashBoard/InstructorDashboard";
import toast from "react-hot-toast";
import { useState } from "react";
import picture from './assets/Logo/Logo-Small-Dark.png';

function App() {
  
  const {user} = useSelector((state) => state.profile);
  const [toastStatus, settoastStatus] = useState(true);

  if (toastStatus) {
    toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-10 w-10 rounded-full"
              src={picture}
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              Zaffer Iqubal
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Backend server is using free hoisting service which may require 8-10 sec to warm-up initially,
              sorry for the inconvenience.
            </p>
          </div>
        </div>
      </div>
    </div>
    ), {
      duration: 4000,
    })
    settoastStatus(false)
  }
  
  return (
    <main className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
        <Navbar/>
        <Routes>

          {/* Home Route */}
          <Route 
          path="/" 
          element={<Home/>}/>

          {/* Catalog Route */}
          <Route 
          path="catalog/:catalogName" 
          element={<Catalog/>}/>

          {/* Catalog Route */}
          <Route 
          path="courses/:courseId" 
          element={<CourseDetails />}/>
          
          {/* Login Route */}
          <Route 
          path="/login" 
          element={
          <OpenRoute>
            <Login/>
          </OpenRoute>
          }/>
          
          {/* SignUp Route */}
          <Route 
          path="/signup" 
          element={
            <OpenRoute>
              <SignUp/>
            </OpenRoute>
          }/>
          
          {/* Forget Password */}
          <Route 
          path="/forgot-password" 
          element={
            <OpenRoute>
              <ForgotPassWordPg/>
            </OpenRoute>
            }/>
          
          {/* Update Password Route */}
          <Route
            path="/reset-password/:id"
            element={
                <UpdatePassword />
            }
          />

          {/* Verify Email Route */}
          <Route
            path="/verify-email"
            element={
                <VerifyEmail />
            }
          />

          {/* About Us Page */}
          <Route
          path="about"
          element={
            <About />
          }
          />
          {/* Contact Us Page */}
          <Route
          path="contact"
          element={
            <Contact />
          }
          />

          {/* Dashboard */}
          <Route
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }>
            {/* DashBoard My Profile Page */}
            <Route
            path="/dashboard/my-profile"
            element={<MyProfile/>}
            />
            
            {/* Dashboard Setting Page */}
              <Route
              path="dashboard/settings"
              element={<Settings/>}/>
              {
                user?.accountType === ACCOUNT_TYPE.STUDENT && (
                  <>
                  <Route path="dashboard/cart" element={<Cart />} />
                  <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                  </>
                )
              }

              {
                user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                  <>
                  <Route path="dashboard/instructor" element={<InstructorDashboard />} />
                  <Route path="dashboard/add-course" element={<AddCourse />} />
                  <Route path="dashboard/my-courses" element={<MyCourse />} />
                  <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
                  </>
                )
              }
            </Route>

            <Route 
            element={
              <PrivateRoute>
                <ViewCourse/>
              </PrivateRoute>
            }>
              {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}/>
                </>
              )}
            </Route>
          <Route path="*" element={<Error/>}/>
        </Routes>      
    </main>
  );
}

export default App;
