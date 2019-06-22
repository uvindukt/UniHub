const Assignment = require("../models/model.assignment");
const GCSService = require("../service/service.storage");
const bucketName = "unihub-assignments";

class AssignmentController {

    static createAssignment(file, data) {

        return new Promise((resolve, reject) => {

            let newAssignment = new Assignment(data);

            newAssignment.attachment = `https://storage.googleapis.com/${bucketName}/${filename}`;

            let deadline = new Date(data.deadline);

            if (deadline <= Date.now()) {

                reject({ status: 400, msg: "Please select a date and time in the future." });

            } else {

                newAssignment
                    .save()
                    .then(() => {
                        GCSService.uploadFileToGoogleCloudStorage(file.name, file)
                            .then(() => resolve({ status: 200, msg: "Upload successful." }))
                            .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));
                        /*file.mv(`${__dirname}/uploads/${file.name}`)
                            .then(() => resolve({ status: 200, msg: "Upload successful." }))
                            .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));*/
                    })
                    .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));

            }

        });

    };

}

module.exports = AssignmentController;