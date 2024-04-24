const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");

const validateUserInput = (reqBody) => {
  const {
    firstName,
    lastName,
    dob,
    academicQualification,
    courseSelected,
    classType,
    stateOfOrigin,
    gender,
    phoneNo,
    emailAddress,
    codeExperience,
    stateOfResidence,
  } = reqBody;

  if (
    !firstName ||
    !lastName ||
    !dob ||
    !academicQualification ||
    !courseSelected ||
    !classType ||
    !stateOfOrigin ||
    !gender ||
    !phoneNo ||
    !emailAddress ||
    !codeExperience ||
    !stateOfResidence
  ) {
    throw new Error("Please fill in all the required fields.");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { emailAddress } = req.body;

  validateUserInput(req.body);

  const userExists = await User.findOne({ emailAddress });

  if (userExists) {
    res.status(400);
    throw new Error("Email already in use.");
  }

  const user = await User.create(req.body);

  if (user) {
    sendEmail(user.firstName, user.courseSelected, user.emailAddress, user);

    const {
      _id,
      firstName,
      lastName,
      dob,
      academicQualification,
      courseSelected,
      classType,
      stateOfOrigin,
      gender,
      phoneNo,
      emailAddress,
      codeExperience,
      stateOfResidence,
      status,
    } = user;

    res.status(201).json({
      _id,
      firstName,
      lastName,
      dob,
      academicQualification,
      courseSelected,
      classType,
      stateOfOrigin,
      gender,
      phoneNo,
      emailAddress,
      codeExperience,
      stateOfResidence,
      status,
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

function sendEmail(firstName, courseSelected, emailAddress, user) {
  let tuitionFee;

  switch (courseSelected) {
    case "Frontend Development":
      tuitionFee = 0.5 * 370000;
      break;
    case "Full-Stack Development":
      tuitionFee = 0.5 * 570000;
      break;
    case "Product UI/UX Design":
      tuitionFee = 0.5 * 150000;
      break;
    case "Blockchain Development":
      tuitionFee = 0;
      break;
    default:
      tuitionFee = 0;
  }

  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: emailAddress,
    subject: "DLT Africa Training Registration Confirmation",
    html: `
    
    <h1>Hello ${firstName},</h1> 


    <p>Thanks for applying for DLT Africa Training to study ${courseSelected}.</p>
    
    <p>Your application has been received and a member of our team will review and get back to you as soon as possible.</p>

    <p>What does this mean?</p>

    <p>If you do not already possess a laptop, it's time to acquire one with minimum specification of 8GB RAM and 250GB ROM SSD.</p>

    <p>If you lack basic knowledge of computers, now is the time to start learning.</p>


    <p>As part of our requirements to confirm your admission, you are required to make a tuition deposit of #${tuitionFee.toFixed(
      2
    )} of the total tuition fee starting from November 20th until December 15th, 2023.</p>

    <p>ONLY those who make the tuition deposit will be considered to have secured a place, and those who have not completed their deposit shall lose their place to other candidates in the pipeline.</p>

    <p>For payment, kindly make use of the account details below:</p>

    <p>Bank Name: Access Bank</p>

    <p>Account Name: DLT AFRICA SPACE LIMITED</p>

    <p>Account Number: 1709346763</p>

    <p>Please share the receipt of payment on WhatsApp through either of these contacts: 08156509701 OR 08133083895.</p>

    <p>Once payment has been confirmed, we shall share resources to get you started ahead of the training.</p>

    <p>We look forward to embarking on this journey with you.</p>
    
    <p>Regards,</p>
    
    <p>DLT Africa Team</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending mail:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

const getAdmissions = asyncHandler(async (req, res) => {
  const datas = await User.find().sort("-createdAt");
  if (!datas) {
    res.status(500);
    throw new Error("Something went wrong");
  }
  res.status(200).json(datas);
});

const deleteAdmission = asyncHandler(async (req, res) => {
  const data = User.findById(req.params.id);

  if (!data) {
    res.status(404);
    throw new Error("Data not found");
  }

  await data.deleteOne();
  res.status(200).json({
    message: "Data deleted successfully",
  });
});

const upgradeData = asyncHandler(async (req, res) => {
  const { status, id } = req.body;

  const user = await User.findById(id);
  console.log(user)

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.status = status;
  await user.save();

  if (status === "paid") {
    sendPaymentConfirmationEmail(
      user.emailAddress,
      user.firstName,
      user.courseSelected
    );
  } else if (status === "accepted") {
    sendAcceptanceEmail(user.emailAddress, user.firstName, user.courseSelected);
  }

  res.status(200).json({
    message: `User payment status updated to ${status}`,
  });
});

const sendPaymentConfirmationEmail = async (
  emailAddress,
  firstName,
  courseSelected
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emailAddress,
    subject: "Payment Confirmation",
    html: `

    <h1>Dear ${firstName},</h1>

    <p>We are pleased to inform you that your first payment has been received! This brings you one step closer to unlocking the full potential of our services.</p>
    
    <p>If you have any questions or concerns, please don't hesitate to contact our support team at +2348156509701.</p>
    
    <p>Best regards,</p>
    
    <p>DLT Africa Team</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Payment confirmation email sent successfully.");
  } catch (error) {
    console.error("Error sending payment confirmation email:", error);
  }
};

const sendAcceptanceEmail = async (emailAddress, firstName, courseSelected) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emailAddress,
    subject: "Application Accepted",
    html: `
    
      <h1>Dear ${firstName},</h1>
  
      <p>We are pleased to inform you that your application has been accepted into DLT Africa Cohort 5.0 for ${courseSelected}! Welcome aboard!</p>
  
      <p>We request you to join the WhatsApp group for your batch <a href="your_whatsapp_group_link_here">here</a>.</p>
  
      <p>If you have any questions or concerns, please don't hesitate to contact our support team at +2348156509701.</p>
  
      <p>Best regards,</p>
  
      <p>DLT Africa Team</p>
    `,
  };

  // Send acceptance email
  await sendEmailMessage(mailOptions);
};

const sendEmailMessage = async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { registerUser, getAdmissions, deleteAdmission, upgradeData };
