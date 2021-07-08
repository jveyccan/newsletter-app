const nodemailer = require('nodemailer');
const emailTemplate = require('../email.template');
const jwt = require('jsonwebtoken');

/**
 * @typedef {import('mongoose').Document} MongooseDocument
 */

const transporter = nodemailer.createTransport({
    host: "mail.smtp2go.com",
    port: 2525,
    auth: {
    user: "",
    pass: ""
    }
    });

    const mailOptions = {
    from: 'admin@mailinator.com',
    to: '',
    subject: 'Newsletter',
    text: 'That was easy!'
};

/**
 * Creates an array of args to be spread into `sendEmail()` 
 * @param {{email: string, caseDetails: MongooseDocument, startTime: string}} emailComponents
 * @return {[string, string, {}, string]} array of args
 */
exports.createScheduleEmailComponents = ({ email, caseDetails, startTime }) => {
    const token = jwt.sign({ id: caseDetails.clientId.toString() }, 'top_secret');

    const subject = 'E-prescribe case created';

    const content = {
        ...caseDetails.toObject(),
        id: caseDetails._id.toString(),
        client: token,
        email,
        startTime,
        reason: ''
    }

    return [email, subject, content, 'case-status-change'];
}


exports.sendEmail = async function send(to, content, name, username) {
    return new Promise(async(resolve,reject)=>{
        try{
            mailOptions.to=to;
            mailOptions.html = await emailTemplate.getContent(subject+ " " + name, text, content, username);
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                resolve(false)
            } else {
                resolve(true)
            }
        });
    }catch(error){
        console.log(error);
        resolve(false)
        
    }

    })
}