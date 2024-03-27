// const mongoose = require('mongoose')

// const courseSchema = new mongoose.Schema({
//     courseName: {
//         type: String,
//         trim: true,
//         required: true
//     },

//     courseDescription: {
//         type: String,
//         trim: true,
//         required: true
//     },

//     instructor: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },

//     whatYouWillLearn: {
//         type: String,
//         trim: true,
//         required: true
//     },

//     courseContent: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Section'
//         }
//     ],

//     ratingAndReview: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'RatingAndReview',
//             trim: true
//         }
//     ],

//     price: {
//         type: Number
//     },

//     thumbnail: {
//         type: String
//     },

//     tag: {
//         type: [String],
//         required: true
//     },
    
//     category: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Categorys'
//     },

//     studentEnrolled: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User',
//             required: true
//         }
//     ],

//     instructions: {
//         type: [String]
//     },

//     status: {
//         type: String,
//         enum: ['Draft', 'Published']
//     },
    
//     createdAt: {
//         type: Date,
//         default: Date.now(),
//     },
// })

// module.exports = mongoose.model('Course', courseSchema);

// import mongoose for creating a schema
const mongoose = require("mongoose");

// Create and export the schema
const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
  },
  courseDescription: {
    type: String,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  whatYouWillLearn: {
    type: String,
  },
  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],
  price: {
    type: Number,
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categorys",
  },
  tag: {
    type: [String],
    required: true,
  },
  studentsEntrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  instructions: {
    type: [String],
  },
  status: {
    type: String,
    enum: ["Draft", "Published"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Course", courseSchema);