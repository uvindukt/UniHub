const bcrypt = require("bcryptjs");
const Admin = require("../models/model.admin");

class AdminController {

    /**
     * @desc Create a new admin.
     * @param data
     * @returns {Promise<JSON>}
     */
    static createAdmin(data) {

        return new Promise((resolve, reject) => {

            let newAdmin = new Admin(data);

            Admin.findOne({ email: data.email })
                .exec()
                .then(admin => {
                    if (admin) {
                        return reject({ status: 400, msg: "Admin already exists." });
                    } else {
                        //Hashing the password before storing in database.
                        bcrypt.genSalt(10)
                            .then(salt => {
                                bcrypt.hash(newAdmin.password, salt)
                                    .then(hash => newAdmin.password = hash)
                                    .then(() => {
                                        newAdmin.save()
                                            .then(admin => {
                                                //Removing the password from returning admin object.
                                                admin.password = undefined;
                                                resolve({ status: 200, success: "Admin created successfully." });
                                            })
                                            .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));
                                    })
                                    .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));
                            })
                            .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));
                    }
                })
                .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));

        });

    }

    /**
     * @desc Get all admins.
     * @returns {Promise<JSON>}
     */
    static getAllAdmins() {

        return new Promise((resolve, reject) => {

            Admin.find()
                .select("-password")
                .exec()
                .then(admins => {
                    admins.length >= 1
                        ? resolve({ status: 200, admins })
                        : reject({ status: 404, msg: "There are no any admins." });
                })
                .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));

        });

    }

    /**
     * @desc Get admin by id.
     * @param id
     * @returns {Promise<JSON>}
     */
    static getAdminById(id) {

        return new Promise((resolve, reject) => {

            Admin.findById(id)
                .select("-password")
                .exec()
                .then(admin => {
                    admin
                        ? resolve({ status: 200, admin })
                        : reject({ status: 404, msg: "Admin does not exist." });
                })
                .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));

        });

    }

    /**
     * @desc Get admin by email.
     * @param email
     * @returns {Promise<JSON>}
     */
    static getAdminByEmail(email) {

        return new Promise((resolve, reject) => {

            Admin.findOne({ email })
                .select("-password")
                .exec()
                .then(admin => {
                    admin
                        ? resolve({ status: 200, admin })
                        : reject({ status: 404, msg: "Admin does not exist." });
                })
                .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));

        });

    }

    /**
     * @desc Update admin by id.
     * @param id
     * @param data
     * @returns {Promise<JSON>}
     */
    static updateAdminById(id, data) {

        return new Promise((resolve, reject) => {

            let updAdmin = new Admin(data);

            if (updAdmin.password) {

                if (!updAdmin.currentPassword) {

                    return reject({ status: 400, msg: "Please enter current password." });

                } else {

                    bcrypt.genSalt(10)
                        .then(salt => {
                            bcrypt.hash(updAdmin.password, salt)
                                .then(hash => updAdmin.password = hash)
                                .then(() => {
                                    Admin.findByIdAndUpdate(id, updAdmin, { new: true })
                                        .select("-password")
                                        .exec()
                                        .then(admin => resolve({ status: 200, msg: "Admin updated.", admin }))
                                        .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));
                                })
                                .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));
                        })
                        .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));

                }

            } else {

                Admin.findByIdAndUpdate(id, updAdmin, { new: true })
                    .select("-password")
                    .exec()
                    .then(admin => resolve({ status: 200, msg: "Admin updated.", admin }))
                    .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));

            }

        });

    }

    /**
     * @desc Delete admin by id.
     * @param id
     * @returns {Promise<JSON>}
     */
    static deleteAdminById(id) {

        return new Promise((resolve, reject) => {

            Admin.findByIdAndRemove(id, { new: true })
                .select("-password")
                .exec()
                .then(admin => resolve({ status: 200, msg: "Admin deleted.", admin }))
                .catch(err => reject({ status: 500, msg: "Something went wrong.", err }));

        });

    }

}

module.exports = AdminController;