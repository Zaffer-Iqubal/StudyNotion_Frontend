const Course = require('../models/Course');
const Profile = require('../models/Profile');
const User = require('../models/User');
require('dotenv');
const convertSecondsToDuration = require('../utils/convertSecondsToDuration');
const CourseProgress = require('../models/CourseProgress');
const cloudinary = require('cloudinary').v2;

const uploadImageToCloudinary  = async (file, folder, height, quality) => {
    const options = {folder};
    if(height) {
        options.height = height;
    }
    if(quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.updateProfile = async(req, res) => {
    try {
        //Fetch Data from Req.Body
        const {
        firstName = "",
        lastName = "",
        dateOfBirth = "",
        about = "",
        contactNumber = "",
        gender = "",
        } = req.body

        //Find userId
        const id = req.user.id

        //Extract User Details
        const userDetails = await User.findById(id);
        console.log(userDetails);

        const profile = await Profile.findById(userDetails.additionalDetails)
        console.log(profile);

        const user = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
          })
        
        await user.save();

        // Update the profile fields
        profile.dateOfBirth = dateOfBirth
        profile.about = about
        profile.contactNumber = contactNumber
        profile.gender = gender

        // Save the updated profile
        await profile.save()

        //Update User Schema
        const updatedUserDetails = await User.findByIdAndUpdate(userDetails._id).populate('additionalDetails').exec();

        return res.status(200).json({
            success: true,
            updatedUserDetails,
            message: 'Profile Details updated successfully.'
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error While Updating Profile.'
        })
    }
}

//Delete Account
exports.deleteProfile = async(req, res) => {
    try {
        //Get UserId
        const id = req.user.id;

        //Validate User Id
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            })
        }

        //Delete Profile    
        await Profile.findByIdAndDelete({_id: userDetails.additionalDetails});

        //Delete User from Enrolled Course
        for(const courseId of userDetails.courses){
            await Course.findByIdAndUpdate({_id: courseId}, {$pull: {studentEnrolled: id}}, {new: true});
        };

        //Delete User
        await User.findByIdAndDelete({_id: id});

        return res.status(200).json({
            success: true,
            message: 'Account Delete Successfully.'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error While Deleting the Profile.'
        });
    };
};

exports.getProfile = async(req, res) => {
    try {
        const id = req.user.id;
        console.log(id);
        const userDetails = await User.findById({_id: id}).populate('additionalDetails').exec()
        return res.status(200).json({
            success: true,
            data: userDetails,
            message: 'User Details'
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error While Fetching the Profile.'
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
      const id = req.user.id;
      const userDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec()
      console.log(userDetails)
      res.status(200).json({
        success: true,
        message: "User Data fetched successfully",
        data: userDetails,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id;
  
      let userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
          path: "courses",
          populate: { path: "courseContent", populate: { path: "subSection" } },
        })
        .exec();
  
      userDetails = userDetails.toObject();
  
      var subSecLength = 0;
      for (var i = 0; i < userDetails.courses.length; i++) {
        subSecLength = 0;
        let totalDurationinSeconds = 0;
        for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
          totalDurationinSeconds += userDetails.courses[i].courseContent[
            j
          ].subSection.reduce(
            (acc, curr) => acc + parseInt(curr.timeDuration),
            0
          );
          // Calculate total duration for each course
          userDetails.courses[i].totalDuration = convertSecondsToDuration(
            totalDurationinSeconds
          );
          // calculate sub section length
          subSecLength +=
            userDetails.courses[i].courseContent[j].subSection.length;
        }
  
        // calculate progress for each course
        let courseProgressCount = await CourseProgress.findOne({
          courseID: userDetails.courses[i],
          userId: userId,
        });
  
        courseProgressCount = courseProgressCount?.completedVideos.length;
  
        if (subSecLength === 0) {
          userDetails.courses[i].progressPercentage = 100;
        } else {
          const mul = Math.pow(10, 2);
          userDetails.courses[i].progressPercentage =
            Math.round((courseProgressCount / subSecLength) * 100 * mul) / mul;
        }
      }

      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        });
      }
  
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
        // data: coursesWithTotalDuration,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};

exports.updateProfilePicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}

exports.instructorDashboard = async(req, res) => {
  try {
    const user = req.user.id;
    const courseDetails = await Course.find({instructor: user});

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEntrolled.length;
      const totalAmountGenerated = course.price * totalStudentsEnrolled;

      // create a new object with the required data
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescourseDesc: course.courseDescription,
        totalStudents: totalStudentsEnrolled,
        totalAmount: totalAmountGenerated,
      }

      return  courseDataWithStats;
    })

    return res.status(200).json({
      success: true,
      courses: courseData,
      message: "Instructor details fetched successfully",
    });
    
  } catch (error) {
    console.log("Error occured while getting instructor info", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}