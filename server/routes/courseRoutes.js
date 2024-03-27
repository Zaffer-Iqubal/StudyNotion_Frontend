const express = require('express')
const router = express.Router()

//Import Middleware
const {auth, isStudent, isInstructor, isAdmin} = require('../middleware/authorization');

//Import Course Controller
const {createCourse, getCourseDetails, editCourse, getInstructorCourses, deleteCourse,  getFUllCourseDetails, showAllCourses} = require('../controllers/CourseController');

//Import Section Controller
const {createSection, updateSection, deleteSection} = require('../controllers/SectionController');

//Import Sub-Section Controller
const {createSubSection, updateSubSection, deleteSubSection} = require('../controllers/subSectionController');

//Import Category Controller
const {createCategory, showAllCategories, categoryPageDetails} = require('../controllers/CategoryController');

//Import Rating and Review
const {getAverageRating, createRating, getAllRating} = require('../controllers/Rating&ReviewController');
const { updateCourseProgress } = require('../controllers/CourseProgress');



// ***************************************************************************************************

//                                      Course routes

// ***************************************************************************************************

//Create Course
router.post('/createCourse', auth, isInstructor, createCourse);

//Edit Course
router.post("/editCourse", auth, isInstructor, editCourse);

// Get all course details
router.post("/getFullCourseDetails", auth, getFUllCourseDetails);

// Get all courses for a soecific instuctor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);

// Get details for a specific course
router.post("/getCourseDetails", getCourseDetails);

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// delete course
router.delete("/deleteCourse", deleteCourse);

//add Section to Course
router.post('/addSection', auth, isInstructor, createSection);

//Update Section
router.post('/updateSection', auth, isInstructor, updateSection);

//Delete Section
router.post('/deleteSection', auth, isInstructor, deleteSection);

//Add Sub-section in Section of Course
router.post('/addSubSection', auth, isInstructor, createSubSection);
//Update Sub-Section
router.post('/updateSubSection', auth, isInstructor, updateSubSection);
//delete Sub-Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);


// get all courses
router.get("/showAllCourses", showAllCourses);

//get Details for Specific Course
router.get('/specificCourse', getCourseDetails);



// ***************************************************************************************************

//                                      Category routes (only Admin)

// ***************************************************************************************************

router.post('/createCategory', auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories)
router.post('/getCategoryPageDetails', categoryPageDetails);



// ***************************************************************************************************

//                                      Rating and Review routes

// ***************************************************************************************************


router.post('/createRating', auth, isStudent, createRating);
router.get('/getAverageRating', getAverageRating);
router.get('/getReviews', getAllRating);

module.exports = router;