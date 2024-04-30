"use client";

import Link from "next/link";

import {
  Button,
  Checkbox,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { FaCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import SelectField from "@/app/components/Application/SelectField";

const nigerianStates = [
  { id: 1, tag: "Abia" },
  { id: 2, tag: "Adamawa" },
  { id: 3, tag: "Akwa Ibom" },
  { id: 4, tag: "Anambra" },
  { id: 5, tag: "Bauchi" },
  { id: 6, tag: "Bayelsa" },
  { id: 7, tag: "Benue" },
  { id: 8, tag: "Borno" },
  { id: 9, tag: "Cross River" },
  { id: 10, tag: "Delta" },
  { id: 11, tag: "Ebonyi" },
  { id: 12, tag: "Edo" },
  { id: 13, tag: "Ekiti" },
  { id: 14, tag: "Enugu" },
  { id: 15, tag: "Gombe" },
  { id: 16, tag: "Imo" },
  { id: 17, tag: "Jigawa" },
  { id: 18, tag: "Kaduna" },
  { id: 19, tag: "Kano" },
  { id: 20, tag: "Katsina" },
  { id: 21, tag: "Kebbi" },
  { id: 22, tag: "Kogi" },
  { id: 23, name: "Kwara" },
  { id: 24, tag: "Lagos" },
  { id: 25, tag: "Nasarawa" },
  { id: 26, tag: "Niger" },
  { id: 27, tag: "Ogun" },
  { id: 28, tag: "Ondo" },
  { id: 29, tag: "Osun" },
  { id: 30, tag: "Oyo" },
  { id: 31, tag: "Plateau" },
  { id: 32, tag: "Rivers" },
  { id: 33, tag: "Sokoto" },
  { id: 34, tag: "Taraba" },
  { id: 35, tag: "Yobe" },
  { id: 36, tag: "Zamfara" },
  { id: 37, tag: "Federal Capital Territory" },
];

import { useRouter } from "next/navigation";
const Application = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    academicQualification: "",
    courseSelected: "",
    classType: "",
    stateOfOrigin: "",
    gender: "",
    phoneNo: "",
    emailAddress: "",
    codeExperience: "",
    stateOfResidence: "",
  });

  const gender = [
    { id: 1, tag: "Male" },
    { id: 2, tag: "Female" },
    { id: 3, tag: "Prefer Not To Mention" },
  ];

  const academicQual = [
    { id: 1, tag: "Senior Secondary School Certificate (SSCE)" },
    { id: 2, tag: "Ordinary National Diploma (OND)" },
    { id: 3, tag: "Higher National Diploma (HND)" },
    { id: 4, tag: "BSc" },
  ];

  const codeExperience = [
    { id: 1, tag: "Beginner" },
    { id: 2, tag: "Inter-Mediate" },
    { id: 3, tag: "Advanced" },
  ];

  const course =
    formData.classType === "Online"
      ? [
          { id: 1, tag: "Frontend Development", fee: 320000 },
          { id: 2, tag: "Blockchain Development", fee: 0 },
        ]
      : [
          { id: 1, tag: "Frontend Development" },
          { id: 2, tag: "Full-Stack Development" },
          { id: 3, tag: "Product UI/UX Design" },
          { id: 4, tag: "Blockchain Development" },
        ];

  const [checkboxesChecked, setCheckboxesChecked] = useState({
    newsletter: false,
    privacyPolicy: false,
    payment: false,
  });

  const [formValidMessage, setFormValidMessage] = useState();
  const [formCompleted, setFormCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormValidMessage("");
    const { name, value } = e.target;
    console.log(e.target.value);
    if (name === "classType" && value === "Online") {
      setFormData({
        ...formData,
        [name]: value,
        courseSelected: "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
    } = formData;

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
      setFormValidMessage(
        "Oops! required field are not filled. Go back and fill them"
      );
      return;
    }
    setIsSubmitting(true);

    axios
      .post(
        `https://dlt-backend.vercel.app/api/v1/cohorts/studentreg`,
        formData
      )
      .then(function (response) {
        console.log(response.data);
        console.log(formData);
        setIsSubmitting(false);
        setFormCompleted(true);
        router.push("/congrats");
      })
      .catch(function (error) {
        setIsSubmitting(false);
        if (error.response && error.response.status == 400) {
          setFormValidMessage(
            "Applicant with the same email address already exist"
          );
        } else {
          setFormValidMessage(
            "Server error, unable to process your registration"
          );
        }
      });
  };

  const handleCheckboxChange = (name) => {
    setCheckboxesChecked({
      ...checkboxesChecked,
      [name]: !checkboxesChecked[name],
    });
  };

  const allCheckboxesChecked = Object.values(checkboxesChecked).every(
    (value) => value
  );

  const [tuitionFee, setTuitionFee] = useState(0);

  const handleCourseChange = (value) => {
    setSelectedCourse(value);
  };

  return (
    <div
      className="bg-auto  bg-no-repeat bg-left-top"
      style={{ backgroundimg: `url(imgs/application-page-bg.svg)` }}
    >
      <div
        className="bg-auto  bg-no-repeat bg-[right_bottom_16rem]"
        style={{ backgroundimg: `url(imgs/application-page-right-bg.svg)` }}
      >
        <div className="flex flex-col pt-[103px] px-4 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 place-content-between">
            <div className="p-4">
              <h2 className="text-4xl font-bold mb-4">
                Apply to Join Our Bootcamp Class
              </h2>
              <p className="mb-4 text-lg">
                Once you've applied, our admissions team will contact you by
                email to schedule a short interview in order to discuss your
                application.
              </p>
            </div>
            <div className="p-4 flex justify-end ">
              <div className=" border rounded-2xl border-gray-600 bg-[#FFF] pt-10 pr-10 pb-9 pl-6 max-w-[404px]">
                <div className="flex flex-col">
                  <div className="flex  gap-2">
                    {" "}
                    <div className="mt-1 h-4 w-4">
                      {" "}
                      <FaCheck color="#FEA650" />
                    </div>{" "}
                    <p>Less than 5 minutes</p>
                  </div>
                  <div className="flex  gap-2">
                    {" "}
                    <div className="mt-1 h-4 w-4">
                      {" "}
                      <FaCheck color="#FEA650" />
                    </div>{" "}
                    <p>No prepayment and no commitment</p>
                  </div>
                  <div className="flex  gap-2">
                    <div className="mt-1 h-4 w-4">
                      {" "}
                      <FaCheck color="#FEA650" />
                    </div>{" "}
                    <p>300+ alumni have joined our community, so can you</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 mb-20 p-2">
            <form
              className="w-full lg:min-w-[75%] 2xl:min-w-[70%] lg:max-w-[75%] 2xl:max-w-[70%]  rounded-2xl bg-[#FFEFD4] py-[69px] px-8 lg:px-[86px] mx-auto "
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-14 gap-x-14">
                <Input
                  size="lg"
                  name="firstName"
                  variant="static"
                  label="First Name"
                  className="pl-4 text-[18px]"
                  labelProps={{
                    className: "!text-black",
                  }}
                  containerProps={{
                    className: "h-14 ",
                  }}
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />

                <Input
                  size="lg"
                  name="lastName"
                  variant="static"
                  label="Last Name"
                  className="pl-4 text-[18px]"
                  labelProps={{
                    className: "!text-black",
                  }}
                  containerProps={{
                    className: "h-14 ",
                  }}
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <SelectField
                  label="Gender"
                  name="gender"
                  className="pl-4 text-[18px]"
                  handleChange={handleChange}
                  options={gender}
                />

                <Input
                  size="lg"
                  name="dob"
                  type="date"
                  variant="static"
                  className="pl-4 text-[18px] text-gray-600"
                  labelProps={{
                    className: "!text-black",
                  }}
                  containerProps={{
                    className: "h-14 ",
                  }}
                  label="Date of Birth"
                  value={formData.dob}
                  onChange={handleChange}
                />

                <Input
                  size="lg"
                  name="phoneNo"
                  variant="static"
                  label="Phone Number"
                  className="pl-4 text-[18px]"
                  labelProps={{
                    className: "!text-black",
                  }}
                  containerProps={{
                    className: "h-14 ",
                  }}
                  placeholder="+2347123456789"
                  value={formData.phoneNo}
                  onChange={handleChange}
                />

                <Input
                  size="lg"
                  name="emailAddress"
                  variant="static"
                  label="Email Address"
                  className="pl-4 text-[18px] "
                  labelProps={{
                    className: "!text-black",
                  }}
                  containerProps={{
                    className: "h-14 ",
                  }}
                  placeholder="yourmail@gmail.com"
                  value={formData.emailAddress}
                  onChange={handleChange}
                />

                <SelectField
                  label="State Of Origin"
                  name="stateOfOrigin"
                  className="pl-4 text-[18px] "
                  handleChange={handleChange}
                  options={nigerianStates}
                />

                <SelectField
                  label="Academic Qualification"
                  name="academicQualification"
                  className="pl-4 text-[18px] "
                  handleChange={handleChange}
                  options={academicQual}
                />

                <SelectField
                  label="Coding Experience"
                  className="pl-4 text-[18px] "
                  handleChange={handleChange}
                  name="codeExperience"
                  options={codeExperience}
                  setTuitionFee={setTuitionFee}
                />
                <SelectField
                  className="pl-4 text-[18px] "
                  label="Class type"
                  name="classType"
                  handleChange={handleChange}
                  options={[
                    { id: 1, tag: "Online" },
                    { id: 2, tag: "Physical" },
                  ]}
                  value={formData.classType}
                />
                <div className="flex flex-col">
                  <SelectField
                    className="pl-4 text-[18px] "
                    label="Course Selected"
                    handleChange={handleChange}
                    name="courseSelected"
                    options={course}
                    setTuitionFee={setTuitionFee}
                    classType={formData.classType}
                  />
                  <span>
                    Course Fee:{" "}
                    {typeof tuitionFee === "number"
                      ? `₦${tuitionFee.toFixed(2)}`
                      : tuitionFee}
                  </span>
                </div>

                <SelectField
                  className="pl-4 text-[18px] "
                  label="State Of Residence"
                  name="stateOfResidence"
                  handleChange={handleChange}
                  options={nigerianStates}
                />
              </div>
              <div className="mt-5 flex w-full flex-col gap-3">
                <List className="flex-col">
                  <ListItem className="p-0 hover:bg-transparent">
                    <label className="flex w-full cursor-pointer items-center  py-2">
                      <ListItemPrefix className="mr-3">
                        <Checkbox
                          ripple={false}
                          containerProps={{ className: "p-0" }}
                          onChange={() => handleCheckboxChange("newsletter")}
                          checked={checkboxesChecked.newsletter}
                          required
                        />
                      </ListItemPrefix>
                      <Typography className="font-normal text-sm text-gray-600">
                        I would like to be kept up to date with new training
                        programs, events, promotions, and marketing.
                      </Typography>
                    </label>
                  </ListItem>
                  <ListItem className="p-0 hover:bg-transparent">
                    <label className="flex w-full cursor-pointer items-center py-2">
                      <ListItemPrefix className="mr-3">
                        <Checkbox
                          ripple={false}
                          containerProps={{ className: "p-0" }}
                          onChange={() => handleCheckboxChange("privacyPolicy")}
                          checked={checkboxesChecked.privacyPolicy}
                          required
                        />
                      </ListItemPrefix>
                      <Typography className="font-normal text-sm text-gray-600">
                        By submitting this form, I accept DLT Africa's Privacy
                        Policy.
                      </Typography>
                    </label>
                  </ListItem>
                  <ListItem className="p-0 hover:bg-transparent">
                    <label className="flex w-full cursor-pointer items-center py-2">
                      <ListItemPrefix className="mr-3">
                        <Checkbox
                          ripple={false}
                          containerProps={{ className: "p-0" }}
                          onChange={() => handleCheckboxChange("payment")}
                          checked={checkboxesChecked.payment}
                          required
                        />
                      </ListItemPrefix>
                      <Typography className="font-normal text-sm text-[#000] ">
                        Are you sure you want to apply for this course at the
                        specified fee of #{tuitionFee.toFixed(2)}?
                      </Typography>
                    </label>
                  </ListItem>
                </List>
              </div>
              <Button
                type="submit"
                size="large"
                className={`capitalize px-16 py-4 mt-5 bg-[#FC7C13] ${
                  !allCheckboxesChecked && "pointer-events-none opacity-50"
                }`}
                disabled={!allCheckboxesChecked}
              >
                {isSubmitting ? <p>Submitting...</p> : <span>Register</span>}
              </Button>
              {formValidMessage && (
                <div className="event-page-registration-error-message">
                  {formValidMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
