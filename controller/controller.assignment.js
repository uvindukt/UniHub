const Assignment = require("../models/model.assignment");
const GCSService = require("../service/service.storage");
const bucketName = "unihub-instructor";

class AssignmentController {

    static createAssignment(file, data) {

        return new Promise((resolve, reject) => {

            let newAssignment = new Assignment(data);

            newAssignment.attachment = GCSService.getPublicUrl(bucketName, file.name);

            let deadline = new Date(data.deadline);

            if (deadline <= Date.now()) {

                reject({ status: 400, msg: "Please select a date and time in the future." });

            } else {

                GCSService.uploadFileToGoogleCloudStorage(bucketName, file)
                    .then(() => {
                        newAssignment
                            .save()
                            .then(() => {
                                resolve({ status: 200, msg: "Upload successful." });
                            })
                            .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));
                    })
                    .catch(err => reject({ status: 500, msg: "Something wrong.", err }));

            }

        });

    };

}

module.exports = AssignmentController;