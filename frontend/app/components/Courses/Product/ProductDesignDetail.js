"use client";

import React from "react";
import CourseDetail from "../CourseDetails/CourseDetail";
import Button from "../Button/Button";

const courses = [
  {
    id: 1,
    question: "About this Course",
    answer:
      "UI (User Interface) pertains to a product's visual and interactive design, focusing on layout and aesthetics. UX (User Experience) covers the holistic user journey, ensuring an enjoyable, efficient experience through research, user-centric design, and usability testing. Together, UI and UX create products that are visually appealing and user-friendly.",
  },
  {
    id: 2,
    question: "What you will Learn",
    answer: [
      <>
        <p>
          Are you ready to embark on an exciting journey into the world of
          product design? Our comprehensive Product Design Course is designed to
          equip you with the knowledge, skills, and tools necessary to excel in
          this dynamic field. Here's a glimpse of what you can expect to learn
          during this engaging course:
        </p>
        <ul className="list-disc">
          <li>Understanding the Fundamentals</li>
          <li>Design Research and User Analysis</li>
          <li>Ideation and Concept Development</li>
          <li>Prototyping and Testing</li>
          <li>Understanding User Interface and Experience</li>
          <li>Real - World Projects and Case Studies</li>
        </ul>
        ,
      </>,
    ],
  },
  {
    id: 3,
    question: "Prerequisites",
    answer: [
      <>
        <ul className="list-disc">
          <li>
            A computer on which you can install software (Windows, MacOS, or
            Linux)
          </li>
          <li>
            No prior experience is required. We will start from the very basics
          </li>
        </ul>
        ,
      </>,
    ],
  },
  {
    id: 4,
    question: "Course Outline",
    answer: [
      <ul className="list-disc">
        <li>
          Fundamentals of Design, Design Research and User Analysis, Ideation
          and Concept Development
        </li>
        <li>
          Prototyping and Testing, User Interface (UI) and User Experience (UX)
          Design
        </li>
        <li>Tools and Real-World Projects, Professional Development</li>
        <li>2 Projects</li>
      </ul>,
    ],
  },
  {
    id: 5,
    question: "Class Schedule",
    answer: "Days of Class: Wednesdays, Fridays and Saturdays.",
  },
];

const ProductDesignDetail = () => {
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

export default ProductDesignDetail;
