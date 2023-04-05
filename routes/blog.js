const express = require("express");
const nodemailer = require('nodemailer');
const router = express.Router();
const upload = require("../middlewares/upload-file");

router.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    try {
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GOOGLE_APP_EMAIL,
          pass: process.env.GOOGLE_APP_PW
        }
      });
      const data = {
        to: req.body.to,
        subject: req.body.subject,
        html: req.body.html,
        attachments: [{
          path: req.file.path
        }]
      };
      //  console.log(attachments)
      mailTransporter.sendMail(data, err => {
        if (err) {
          console.log(err)
        } else {
          res.json({
            status: true,
            message: "email sent",
          });

          console.log("email sent");

        }

      });

    } catch (error) {

    }
  })






});



module.exports = router;