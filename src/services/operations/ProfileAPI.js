import toast from "react-hot-toast";
import { apiConnector } from "../apiConector";
import { profileEndpoints } from '../apis';

export async function getEnrolledCourses(token) {
    const toastId = toast.loading('Loading...')
    let result = [];
    try {
        const response = await apiConnector("GET", profileEndpoints.GET_USER_ENROLLED_COURSE_API, null, {
            Authorization : `Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response.data.data;
    } catch (error) {
        console.log('GET_USER_ENROLLED_COURSE_API API ERROR................',error);
        toast.error('Could Not Get Enrolled Courses')
    }
    toast.dismiss(toastId);
    return result;
} 

export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", profileEndpoints.GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("GET_INSTRUCTOR_DATA_API RESPONSE...", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response.data.courses;
  } catch (error) {
    console.log("GET_INSTRUCTOR_DATA_API ERROR...", error);
    toast.error("Could not get Instructor data");
  }
  toast.dismiss(toastId);
  return result;
}