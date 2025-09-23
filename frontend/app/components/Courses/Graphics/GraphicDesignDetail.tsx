"use client";

import React from "react";
import CourseDetail from "../CourseDetails/CourseDetail";
import Button from "../Button/Button";

const courses = [
  {
    id: 1,
    question: "About this Course",
    answer:
      "Graphic design involves crafting striking visual content that conveys messages with impact. You'll discover how to blend components such as typography, color, imagery, and layout to create designs that elevate branding, marketing, and digital media communication.",
  },
  {
    id: 2,
    question: "What you will Learn",
    answer: [
      <>
        <p>
          Dive into the world of graphic design with our comprehensive course,
          designed to help you master the essential tools and techniques needed
          to succeed. Here's what you will learn:
        </p>
        <ul className="list-disc">
          <li>Principles of Graphic design</li>
          <li>Color Theory and Typography</li>
          <li>Digital Illustration and Layout Design</li>
          <li>Proficiency in softwares like Coreldraw & Photoshop</li>
          <li>Real-World Projects and Portfolio Building</li>
        </ul>
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
            A computer (Windows, MacOS, or Linux) capable of running design
            software
          </li>
          <li>
            No prior experience is required. The course covers everything from
            the basics.
          </li>
        </ul>
      </>,
    ],
  },
  {
    id: 4,
    question: "Course Outline",
    answer: [
      <ul className="list-disc">
        <li>Introduction to Graphic Design and Design Principles</li>
        <li>Essential tools and techniques </li>
        <li>Working with colors and files</li>
        <li>Layers and groups</li>
        <li>Preparing artwork for output</li>
        <li>Design Principles and project </li>
        <li>2 Projects for hands-on experience </li>
      </ul>,
    ],
  },
  {
    id: 5,
    question: "Class Schedule",
    answer: "Days of Class: Mondays, Wednesdays & Fridays",
  },
];

const GraphicDesignDetail: React.FC = () => {
  return (
    <div className="py-8 md:py-16 bg-gray-100 md:px-12 lg:px-24 xl:px-32 font-serif px-[35px]">
      <div>
        {courses.map(({ id, question, answer }) => (
          <CourseDetail key={id} question={question} answer={answer} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button to="/application">Apply Now</Button>
      </div>
    </div>
  );
};

export default GraphicDesignDetail;
