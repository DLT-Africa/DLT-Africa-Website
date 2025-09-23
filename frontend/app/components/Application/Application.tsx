"use client";

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
import { useRouter } from "next/navigation";

interface Option {
  id: number;
  tag: string;
  fee?: number;
}

interface FormData {
  firstName: string;
  lastName: string;
  dob: string;
  academicQualification: string;
  courseSelected: string;
  classType: string;
  stateOfOrigin: string;
  gender: string;
  phoneNo: string;
  emailAddress: string;
  codeExperience: string;
  stateOfResidence: string;
  referralOption: string;
  referralName: string;
}

interface CheckboxesChecked {
  newsletter: boolean;
  privacyPolicy: boolean;
  payment: boolean;
}

const nigerianStates: Option[] = [
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
  { id: 23, tag: "Kwara" },
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

const Application: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
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
    referralOption: "",
    referralName: "",
  });

  const gender: Option[] = [
    { id: 1, tag: "Male" },
    { id: 2, tag: "Female" },
    { id: 3, tag: "Prefer Not To Mention" },
  ];

  const refOptions: Option[] = [
    { id: 1, tag: "Social Media (Facebook, Twitter, LinkedIn, etc.)" },
    { id: 2, tag: "Friend or Colleague" },
    { id: 3, tag: "Online Search (Google, Bing, etc.)" },
    { id: 4, tag: "Newsletter or Email" },
    { id: 5, tag: "DLT Africa Website" },
    { id: 6, tag: "Event or Conference" },
    { id: 7, tag: "Blog or Online Article" },
    { id: 8, tag: "Webinar or Online Workshop" },
    { id: 9, tag: "University or School" },
    { id: 10, tag: "Advertisements (Online, Print, etc.)" },
    { id: 11, tag: "Community Forum or Group" },
    { id: 12, tag: "Other (Please Specify)" },
  ];

  const academicQual: Option[] = [
    { id: 1, tag: "Senior Secondary School Certificate (SSCE)" },
    { id: 2, tag: "Ordinary National Diploma (OND)" },
    { id: 3, tag: "Higher National Diploma (HND)" },
    { id: 4, tag: "BSc" },
  ];

  const codeExperience: Option[] = [
    { id: 1, tag: "Beginner" },
    { id: 2, tag: "Inter-Mediate" },
    { id: 3, tag: "Advanced" },
  ];

  const course: Option[] =
    formData.classType === "Online"
      ? [
          { id: 1, tag: "Frontend Development", fee: 320000 },
          { id: 2, tag: "Product UI/UX Design", fee: 170000 },
          { id: 3, tag: "Graphics Design", fee: 150000 },
        ]
      : [
          { id: 1, tag: "Frontend Development" },
          { id: 2, tag: "Full-Stack Development" },
          { id: 3, tag: "Product UI/UX Design" },
          { id: 4, tag: "Graphics Design" },
        ];

  const [checkboxesChecked, setCheckboxesChecked] = useState<CheckboxesChecked>(
    {
      newsletter: false,
      privacyPolicy: false,
      payment: false,
    }
  );

  const [formValidMessage, setFormValidMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setFormValidMessage("");
    const { name, value } = e.target;
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
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
        "Oops! required field are not filled. Please, go back and fill them"
      );
      return;
    }
    setIsSubmitting(true);

    const data = {
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
      referralOption: formData.referralOption,
      referralName: formData.referralName,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cohorts/studentreg`, data)
      .then(function (response) {
        setIsSubmitting(false);
        router.push("/congrats");
      })
      .catch(function (error: any) {
        setIsSubmitting(false);
        if (error.response && error.response.status == 400) {
          setFormValidMessage(
            "Applicant with the same email address already exist"
          );
          return;
        }

        setFormValidMessage(
          "Server error, unable to process your registration"
        );
      });
  };

  const handleCheckboxChange = (name: keyof CheckboxesChecked): void => {
    setCheckboxesChecked({
      ...checkboxesChecked,
      [name]: !checkboxesChecked[name],
    });
  };

  const allCheckboxesChecked = Object.values(checkboxesChecked).every(
    (value) => value
  );

  const [tuitionFee, setTuitionFee] = useState<number>(0);
  const [isApplicationClosed, setIsApplicationClosed] =
    useState<boolean>(false);

  useEffect(() => {
    const checkApplicationDeadline = (): void => {
      const currentDate = new Date();
      const deadlineDate = new Date("2025-05-30");
      if (currentDate >= deadlineDate) {
        setIsApplicationClosed(true);
      }
    };
    checkApplicationDeadline();
  }, []);

  return (
    <div
      className="bg-auto  bg-no-repeat bg-left-top"
      style={{ backgroundImage: `url(/images/application-page-bg.svg)` }}
    >
      <div
        className="bg-auto  bg-no-repeat bg-[right_bottom_16rem]"
        style={{
          backgroundImage: `url(/images/application-page-right-bg.svg)`,
        }}
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
              <div className=" border rounded-2xl border-gray-600 bg-[#FFF] p-6 max-w-[404px]">
                <div className="flex flex-col">
                  <div className="flex gap-2">
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
                    <div className="mt-1 w-4">
                      {" "}
                      <FaCheck color="#FEA650" />
                    </div>{" "}
                    <p>350+ alumni have joined our community, so can you</p>
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
                  crossOrigin={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
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
                  crossOrigin={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
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
                  crossOrigin={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
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
                  crossOrigin={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
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
                  crossOrigin={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
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

                <SelectField
                  className="pl-4 text-[18px] "
                  label="How did you hear about us?(optional) "
                  handleChange={handleChange}
                  name="referralOption"
                  options={refOptions}
                />

                <Input
                  size="lg"
                  name="referralName"
                  variant="static"
                  label="Referrals Name"
                  className="pl-4 text-[18px] "
                  labelProps={{
                    className: "!text-black",
                  }}
                  containerProps={{
                    className: "h-14 ",
                  }}
                  placeholder="e.g John Doe"
                  value={formData.referralName}
                  onChange={handleChange}
                  crossOrigin={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              </div>

              <div className="mt-5 flex w-full flex-col gap-3">
                <List
                  className="flex-col"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <ListItem
                    className="p-0 hover:bg-transparent"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <label className="flex w-full cursor-pointer items-center  py-2">
                      <ListItemPrefix
                        className="mr-3"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <Checkbox
                          ripple={false}
                          containerProps={{ className: "p-0" }}
                          onChange={() => handleCheckboxChange("newsletter")}
                          checked={checkboxesChecked.newsletter}
                          required
                          crossOrigin={undefined}
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        />
                      </ListItemPrefix>
                      <Typography
                        className="font-normal text-sm text-gray-600"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        I would like to be kept up to date with new training
                        programs, events, promotions, and marketing.
                      </Typography>
                    </label>
                  </ListItem>
                  <ListItem
                    className="p-0 hover:bg-transparent"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <label className="flex w-full cursor-pointer items-center py-2">
                      <ListItemPrefix
                        className="mr-3"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <Checkbox
                          ripple={false}
                          containerProps={{ className: "p-0" }}
                          onChange={() => handleCheckboxChange("privacyPolicy")}
                          checked={checkboxesChecked.privacyPolicy}
                          required
                          crossOrigin={undefined}
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        />
                      </ListItemPrefix>
                      <Typography
                        className="font-normal text-sm text-gray-600"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        By submitting this form, I accept DLT Africa's Privacy
                        Policy.
                      </Typography>
                    </label>
                  </ListItem>
                  <ListItem
                    className="p-0 hover:bg-transparent"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <label className="flex w-full cursor-pointer items-center py-2">
                      <ListItemPrefix
                        className="mr-3"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <Checkbox
                          ripple={false}
                          containerProps={{ className: "p-0" }}
                          onChange={() => handleCheckboxChange("payment")}
                          checked={checkboxesChecked.payment}
                          required
                          crossOrigin={undefined}
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        />
                      </ListItemPrefix>
                      <Typography
                        className="font-normal text-sm text-[#000] "
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Are you sure you want to apply for this course at the
                        specified fee of ₦{tuitionFee.toFixed(2)}?
                      </Typography>
                    </label>
                  </ListItem>
                </List>
              </div>
              <Button
                type="submit"
                size="lg"
                className={`capitalize px-16 py-4 mt-5 bg-[#FC7C13] ${
                  !allCheckboxesChecked && "pointer-events-none opacity-50"
                }`}
                disabled={
                  !allCheckboxesChecked || isSubmitting || isApplicationClosed
                }
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
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
