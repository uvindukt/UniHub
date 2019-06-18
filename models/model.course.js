const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    code: {
        type: String,
        required: true,
        unique: true
    },

    instructor: {
        type: String
    },

    students: {
        type: Array
    }

});

module.exports = mongoose.model("Course", CourseSchema);