const Course = require("../models/model.course");
const MailService = require("../service/service.mail");

class CourseController {

    /**
     * @desc Create a new course.
     * @param data
     * @param instructor
     * @returns {Promise<JSON>}
     */
    static createCourse(data, instructor) {

        return new Promise((resolve, reject) => {

            let newCourse = new Course(data);

            Course
                .findOne({code: data.code})
                .exec()
                .then(course => {
                    if (course) {
                        reject({ status: 400, msg: "Course already exists."})
                    } else {
                        newCourse
                            .save()
                            .then(course => {
                                let message = MailService.getAddedToCourseMessage(course);
                                MailService.sendMail(instructor.email, "Assigned to a course", message);
                                return course;
                            })
                            .then(course => resolve({ status: 200, msg: "Course created successfully.", course }))
                            .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));
                    }
                })
                .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));

        });

    }

    /**
     * @desc Get all courses.
     * @returns {Promise<JSON>}
     */
    static getAllCourses() {

        return new Promise((resolve, reject) => {

            Course
                .find()
                .exec()
                .then(courses =>
                    courses.length >= 1
                        ? resolve({ status: 200, courses })
                        : reject({ status: 404, msg: "Could not find any courses." })
                )
                .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));

        });

    }

    /**
     * @desc Get course by id.
     * @param id
     * @returns {Promise<JSON>}
     */
    static getCourseById(id) {

        return new Promise((resolve, reject) => {

            Course
                .findById(id)
                .then(course =>
                    course
                        ? resolve({ status: 200, course })
                        : reject({ status: 404, msg: "Could not find the course." })
                )
                .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));

        });

    }

    /**
     * @desc Get course by code.
     * @param code
     * @returns {Promise<JSON>}
     */
    static getCourseByCode(code) {

        return new Promise((resolve, reject) => {

            Course
                .findOne({ code })
                .then(course =>
                    course
                        ? resolve({ status: 200, course })
                        : reject({ status: 404, msg: "Could not find the course." })
                )
                .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));

        });

    }

    /**
     * @desc Add a student to the course.
     * @param courseId
     * @param studentId
     * @returns {Promise<JSON>}
     */
    static addStudent(courseId, studentId) {

        return new Promise((resolve, reject) => {

            Course
                .findByIdAndUpdate(courseId, { $push: { students: studentId } })
                .exec()
                .then(course => resolve({ status: 200, msg: `Student added to the ${course.name}.`, course }))
                .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));

        });

    }

    /**
     * @desc Remove a student to the course.
     * @param courseId
     * @param studentId
     * @returns {Promise<JSON>}
     */
    static removeStudent(courseId, studentId) {

        return new Promise((resolve, reject) => {

            Course
                .findByIdAndUpdate(courseId, { $pull: { students: studentId } })
                .exec()
                .then(course => resolve({ status: 200, msg: `Student removed from ${course.name}.`, course }))
                .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));

        });

    }

    /**
     * @desc Assign a instructor to the course.
     * @param courseId
     * @param instructorId
     * @returns {Promise<any>}
     */
    static addInstructor(courseId, instructorId) {

        return new Promise((resolve, reject) => {

            Course
                .findByIdAndUpdate(courseId, { instructor: instructorId })
                .then(course => resolve({ status: 200, msg: `Instructor added to ${course.name}.`, course }))
                .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));

        });

    }

    /**
     * @desc Remove the instructor from the course.
     * @param courseId
     * @returns {Promise<any>}
     */
    static removeInstructor(courseId) {

        return new Promise((resolve, reject) => {

            Course
                .findByIdAndUpdate(courseId, { $unset: "instructor" })
                .then(course => resolve({ status: 200, msg: `Instructor removed from ${course.name}.`, course }))
                .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));

        });

    }

}

module.exports = CourseController;