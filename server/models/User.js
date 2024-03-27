const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  
  lastName: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    trim: true
  },
  
  password: {
    type: String,
    required: true
  },

  accountType: {
    type: String,
    enum: ['Student', 'Instructor', 'Admin'],
    required: true
  },

  active: {
    type: Boolean,
    default: true
  },

  approved: {
    type: Boolean,
    default: true
  },

  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },

  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }
  ],

  cartItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  
  image: {
    type: String
  },

  token: {
    type: String
  },

  resetPasswordExpires: {
    type: Date
  },

  courseProgess: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseProgess'
  }],

  // Add timestamps for when the document is created and last modified
  
  createdAt: {
    type: Date,
    default: Date.now()
  },

  updatedAt: {
    type: Date,
    default: Date.now()
  },
},

{ timestamps: true }
)

module.exports = mongoose.model('User', userSchema);