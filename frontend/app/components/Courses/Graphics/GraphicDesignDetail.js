"use client";

import React from "react";
import CourseDetail from "../CourseDetails/CourseDetail";
import Button from "../Button/Button";

const courses = [
  {
    id: 1,
    question: "About this Course",
    answer:
      "Graphic design is about creating compelling visual content that communicates messages effectively. You will learn how to combine elements like typography, color, imagery, and layout to develop designs that enhance branding, marketing, and digital media communication.",
  },
  {
    id: 2,
    question: "What you will Learn",
    answer: [
      <>
        <p>
          Dive into the world of graphic design with our comprehensive course, designed to help you master the essential tools and techniques needed to succeed. Here's what you will learn:
        </p>
        <ul className="list-disc">
          <li>Principles of Graphic Design</li>
          <li>Color Theory and Typography</li>
          <li>Branding and Visual Identity</li>
          <li>Digital Illustration and Layout Design</li>
          <li>Tools like Adobe Photoshop, Illustrator, and Canva</li>
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
          <li>A computer (Windows, MacOS, or Linux) capable of running design software</li>
          <li>No prior experience is required. The course covers everything from the basics.</li>
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
        <li>Typography, Color Theory, and Layout Design</li>
        <li>Branding, Visual Identity, and Digital Illustration</li>
        <li>Practical Training with Design Tools (Photoshop, Illustrator, Canva)</li>
        <li>Real-World Design Projects and Portfolio Development</li>
        <li>2 Projects for hands-on experience</li>
      </ul>,
    ],
  },
  {
    id: 5,
    question: "Class Schedule",
    answer: "Days of Class: Mondays, Wednesdays & Fridays",
  },
];


const GraphicDesignDetail = () => {
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
