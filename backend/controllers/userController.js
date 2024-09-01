const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { sendEmail, calculateTuitionFee } = require("../utils");

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
    referralOption,
    referralName
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
exports.validateUserInput = validateUserInput;

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
    const tuitionFee = calculateTuitionFee(user.courseSelected, user.classType);

    await sendEmail({
      from: process.env.EMAIL_USER,
      to: user.emailAddress,
      subject: "DLT Africa Training Registration Confirmation",
      html: `
        <img src="https://mir-s3-cdn-cf.behance.net/projects/404/6a6d3e181530247.Y3JvcCwxMDA3LDc4OCwxOTcsMA.png" alt="DLT Africa logo">\n
        <h1>Hello ${user.firstName},</h1> 
        <p>Thanks for applying for DLT Africa Training to study ${user.courseSelected
        }.</p>
        <p>Your application has been received and a member of our team will review and get back to you as soon as possible.</p>
        <p>What does this mean?</p>
        <p>If you do not already possess a laptop, it's time to acquire one with minimum specification of 8GB RAM and 250GB ROM SSD.</p>
        <p>If you lack basic knowledge of computers, now is the time to start learning.</p>
        <p>As part of our requirements to confirm your admission, you are required to make a tuition deposit of #${tuitionFee.toFixed(
          2
        )} of the total tuition fee on or before November 30th, 2024.</p>
        <p>ONLY those who make the tuition deposit will be considered to have secured a place, and those who have not completed their deposit shall lose their place to other candidates in the pipeline.</p>
        <p>For payment, kindly make use of the account details below:</p>
        <p>Bank Name: Access Bank</p>
        <p>Account Name: DLT AFRICA SPACE LIMITED</p>
        <p>Account Number: 1709346763</p>
        <p>Please share the receipt of payment on WhatsApp through either of these contacts: 08156509701 OR 08133083895.</p>
        <p>Once payment has been confirmed, we shall share resources to get you started ahead of the training.</p>
        <p>We look forward to embarking on this journey with you.</p>
        <p>Regards,</p>
        <p>DLT Africa Team</p>
      `,
    });

    const emailAddresses = [
      "info@dltafrica.io",
      "aliu@dltafrica.io",
      "rajiabdullahi907@gmail.com",
    ];
    await sendEmail({
      from: process.env.EMAIL_USER,
      to: emailAddresses.join(", "),
      subject: "New Registration Notification",
      html: `
        <h1>New Registration Notification</h1>
        <img src="https://mir-s3-cdn-cf.behance.net/projects/404/6a6d3e181530247.Y3JvcCwxMDA3LDc4OCwxOTcsMA.png" alt="DLT Africa logo">
        <p>A new student, ${user.firstName} ${user.lastName}, has registered for DLT Africa Training to study ${user.courseSelected} via ${user.classType}.</p>
        <p>Please take necessary actions to review the application.</p>
        <p>Regards,</p>
        <p>DLT Africa Team</p>
      `,
    });

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

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.status = status;
  await user.save();

  let emailSubject = "";
  let emailContent = "";

  switch (status) {
    case "paid":
      emailSubject = "Payment Confirmation";
      emailContent = `
        <img src="https://mir-s3-cdn-cf.behance.net/projects/404/6a6d3e181530247.Y3JvcCwxMDA3LDc4OCwxOTcsMA.png" alt="">\n
        <h1>Dear ${user.firstName},</h1>
        <p>We are pleased to inform you that your first payment has been received! This brings you one step closer to unlocking the full potential of our services.</p>
        <p>If you have any questions or concerns, please don't hesitate to contact our support team at +2348156509701 OR 08133083895.</p>
        <p>Best regards,</p>
        <p>DLT Africa Team</p>
      `;
      break;
    case "accepted":
      emailSubject = "Application Accepted";
      emailContent = `
        <img src="https://mir-s3-cdn-cf.behance.net/projects/404/6a6d3e181530247.Y3JvcCwxMDA3LDc4OCwxOTcsMA.png" alt="">\n
        <h1>Dear ${user.firstName},</h1>
        <p>We are pleased to inform you that your application has been accepted into DLT Africa Cohort 5.0 for ${user.courseSelected}! Welcome aboard 🎊!</p>
        <p>We request you to join the WhatsApp group for your batch <a href="https://chat.whatsapp.com/BrknqYS3BiJGD3ekWjcIom">here</a>.</p>
        <p>If you have any questions or concerns, please don't hesitate to contact our support team at +2348156509701 OR 08133083895.</p>
        <p>Best regards,</p>
        <p>DLT Africa Team</p>
      `;
      break;
    default:
      break;
  }

  await sendEmail({
    from: process.env.EMAIL_USER,
    to: user.emailAddress,
    subject: emailSubject,
    html: emailContent,
  });

  res.status(200).json({
    message: `User payment status updated to ${status}`,
  });
});

module.exports = { registerUser, getAdmissions, deleteAdmission, upgradeData };
