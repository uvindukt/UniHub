const nodeMailer = require("nodemailer");

class MailService {

    /**
     * Creating the email template.
     * @param user
     * @param password
     * @param type
     * @returns {string}
     */
    static getMessage(user, password, type) {

        return `<h1 style="color: #5cb85c">New UniHub Account Login Details</h1>
                <p>Type: ${type}<br/>Email: ${user.email}<br/>Password: ${password}</p>`;

    }

    /**
     * Sending the email to the User.
     * @param user
     * @param password
     * @param type
     */
    static sendMail(user, password, type) {

        this.transporter = nodeMailer.createTransport({
            service: "gmail",
            secure: false,
            port: 25,
            auth: {
                user: "unihubsystems@gmail.com",
                pass: "ab12AB!@"
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        this.mailOptions = {
            from: "unihubsystems@gmail.com",
            to: user.email,
            subject: "UniHub Account",
            html: MailService.getMessage(user, password, type)
        };

        MailService.transporter.sendMail(this.mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    }

}

module.exports = MailService;