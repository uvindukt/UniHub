const Assignment = require("../models/model.assignment");
const Solution = require("../models/model.solution");
const GCSService = require("../service/service.storage");
const bucketName = "unihub-student";

class SolutionController {

    /**
     * @desc Add solution for an assignment.
     * @param studentId
     * @param courseId
     * @param assignmentId
     * @param file
     * @returns {Promise<any>}
     */
    static addSolution(studentId, assignmentId, courseId, file) {

        return new Promise((resolve, reject) => {

            Assignment
                .findById(assignmentId)
                .exec()
                .then(assignment => {
                    if (assignment) {

                        let deadline;

                        try {
                            deadline = new Date(assignment.deadline);
                        } catch (err) {
                            reject({status: 500, msg: 'Something went wrong.'});
                        }

                        if (deadline >= Date.now()) {

                            let newSolution = new Solution({
                                student: studentId,
                                course: courseId,
                                assignment: assignmentId,
                                attachment: GCSService.getPublicUrl(bucketName, file.name)
                            });

                            GCSService
                                .uploadFileToGoogleCloudStorage(bucketName, file)
                                .then(() => {
                                    newSolution
                                        .save()
                                        .then(() => {
                                            resolve({ status: 200, msg: "Upload successful." });
                                        })
                                        .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));
                                })
                                .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));

                        } else {
                            reject({status: 400, msg: 'Assignment is overdue.'});
                        }

                    } else {
                        reject({status: 404, msg: 'Could not find the assignment.'});
                    }

                })
                .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));

        });

    }

}

module.exports = SolutionController;