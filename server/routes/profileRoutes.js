const express = require('express')
const router = express.Router()

const {updateProfile, updateProfilePicture, deleteProfile, getProfile, getEnrolledCourses, instructorDashboard} = require('../controllers/ProfileController')
const {auth, isStudent, isInstructor} = require('../middleware/authorization')


// ***************************************************************************************************

//                                      Profile routes

// ***************************************************************************************************
router.put("/updateDisplayPicture", auth, updateProfilePicture);
router.put('/updateProfile', auth, updateProfile);
router.delete('/deleteProfile', auth, deleteProfile);
router.get('/getUserDetails', auth, getProfile);
router.get('/getEnrolledCourses', auth, isStudent, getEnrolledCourses);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

module.exports = router;