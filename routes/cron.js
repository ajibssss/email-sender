const Blog = require("../models/blog");
const cronJob = require('node-cron');
const express = require("express");
//const app = express();

const router = express.Router();
const nodemailer = require('nodemailer');
const EventEmitter = require('events');
const emitter = new EventEmitter()
emitter.setMaxListeners(0)
const upload = require("../middlewares/upload-file");
const event = new EventEmitter();


// create an instance to send a mail
let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GOOGLE_APP_EMAIL,
        pass: process.env.GOOGLE_APP_PW
    }
});
// make a post request
router.post(`/crons`, async (req, res) => {
    upload(req, res, function (err) {
        try {
            // data that would be sent to the server
            const data = {
                to: req.body.to,
                subject: req.body.subject,
                second: req.body.second,
                minute: req.body.minute,
                hour: req.body.hour,
                day: req.body.day,
                month: req.body.month,
                week: req.body.week,
                html: req.body.html,
                attachments: [{
                    path: req.file.path
                }]
            };
            console.log(data.minute, data.hour, data.day, data.month, data.week)
            //create a scheduler using node-cron
            const task = cronJob.schedule(`*/${data.minute} ${data.hour} ${data.day} ${data.month} ${data.week}    `, () => {

                // collect the data and send an email
                mailTransporter.sendMail(data, err => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.json({
                            status: true,
                            message: "email sent",
                        });
                        console.log("email sent");
                        event.emit('JOB COMPLETED');
                    }

                });
            })
            event.on('JOB COMPLETED', () => {
                // console.log('Job done!');
                task.stop();
            });


        } catch (error) {

        }

    })

});

router.get(`/blogs`, async (req, res) => {
    let filter = {};
    if (req.query.categories) {
        filter = {
            category: req.query.categories.split(",")
        };
    }
    try {
        let blogs = await Blog.find(filter)
            .populate("owner category")
            .eec();

        res.json({
            status: true,
            blogs: blogs
        });
    } catch (error) {
        res.status(500).json({
            success: false
        });
    }
});

module.exports = router;