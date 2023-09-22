var express = require('express');
var router = express.Router();

const nodemailer = require('nodemailer');
const multer = require("multer");
const upload = multer({ dest: './uploads/' });

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // e.g., Gmail, SMTP server details
  port: 587,
  secure: false,
  auth: {
    user: 'testforopiom@gmail.com',
    pass: 'phezpefokghhwsww',
  },
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    success : true,
    data: {
      message : 'Hello'
    }
  })
});

router.post('/send-mail', upload.single('media'), async function (req, res, next) {
  const {to, cc = null, bcc = null, subject, html} = req.body;
  const media = req.file;
  console.log(media)
  const mailOptions = {
    to,
    cc,
    bcc,
    subject,
    html,
    // attachments: [
    //   {
    //     filename: media.originalname, // Customize the filename as needed
    //     path: media.path,
    //   },
    // ],
  };

  if (media){
    mailOptions.attachments = [
      {
        filename: media.originalname, // Customize the filename as needed
        path: media.path,
      },
    ]
  }

  // console.log(JSON.stringify(mailOptions))

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Email sending failed');
  }
});

module.exports = router;
