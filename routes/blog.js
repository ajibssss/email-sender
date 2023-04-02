const Blog = require("../models/blog");
const express = require("express");
const cronJob = require('node-cron');
const nodemailer = require('nodemailer');

const EventEmitter = require('events');
const emitter = new EventEmitter()
emitter.setMaxListeners(0)
const event = new EventEmitter();
const router = express.Router();

router.post(`/blogs`, async (req, res) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_APP_EMAIL,
      pass: process.env.GOOGLE_APP_PW
    }
  });
  const data = {
    to: `${req.body.to}`,
    subject: `${req.body.subject}`,
    second: `${req.body.second}`,
    minute: `${req.body.minute}`,
    hour: `${req.body.hour}`,
    day: `${req.body.day}`,
    month: `${req.body.month}`,
    week: `${req.body.week}`,
    html: `${req.body.html} `
  };
  console.log(data.minute, data.hour,data.day, data.month, data.week)

  const task = cronJob.schedule(`*/${data.minute} ${data.hour} ${data.day} ${data.month} ${data.week}    `, () => {
    mailTransporter.sendMail(data, err => {
      if (err) {
        console.log(err)
        } else {
          res.json({
            status: true,
            message: "save succes",
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