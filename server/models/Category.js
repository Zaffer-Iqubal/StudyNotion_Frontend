const mongoose =  require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please add a Category Name']
    },

    description: {
        type: String,
        trim: true,
        required: true
    },

    courses: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
        }
    ]
})

module.exports = mongoose.model('Categorys', categorySchema);