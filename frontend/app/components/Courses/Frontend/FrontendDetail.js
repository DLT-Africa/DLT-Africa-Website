"use client";

import React from "react";
import CourseDetail from "../CourseDetails/CourseDetail";
import Button from "../Button/Button";

const courses = [
  {
    id: 1,
    question: "About this Course",
    answer:
      "Frontend development is the process of creating the user interface and user experience of a website. It's what users see and interact with when they visit a site in a web browser. The frontend, also known as the 'client-side,' focuses on the visual and interactive elements of a website",
  },
  {
    id: 2,
    question: "What you will Learn",
    answer: [
      <ul className="list-disc">
        <li>Fundamentals.</li>
        <li>Dynamic web development.</li>
        <li>Responsive design for all devices</li>
        <li>Popular front-end frameworks and libraries.</li>
        <li>Principles for stunning interfaces</li>
      </ul>,
    ],
  },
  {
    id: 3,
    question: "Prerequisites",
    answer: [
      <ul className="list-disc">
        <li>
          A computer on which you can install software (Windows, MacOS, or
          Linux)
        </li>
        <li>4 Months to learn and work hard to build a career in tech.</li>
        <li>
          No prior programming experience is required. We will start from the
          very basics
        </li>
      </ul>,
    ],
  },
  {
    id: 4,
    question: "Course Outline",
    answer: [
      <ul className="list-disc">
        <li>HTML Basics</li>
        <li>CSS Styling.</li>
        <li>Tailwind CSS</li>
        <li>JavaScript Fundamentals</li>
        <li>ReactJs library</li>
        <li>
          Students will build different projects and create a portfolio that
          will be use to get their first gig.
        </li>
      </ul>,
    ],
  },
  {
    id: 5,
    question: "Class Schedule",
    answer: "Days of Class: Mondays, Tuesdays, Wednesdays and Thursdays.",
  },
];

const FrontendDetail = () => {
  return (
    <div className="py-[95.5px] bg-[#F6F6F6] px-[286px] ">
      <div>
        {courses.map(({ id, question, answer }) => (
          <CourseDetail key={id} question={question} answer={answer} />
        ))}
      </div>
      <div className="flex justify-center ">
        <Button to="/application">Apply Now</Button>
      </div>
    </div>
  );
};

export default FrontendDetail;
