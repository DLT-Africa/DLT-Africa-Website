"use client";

import React from "react";
import CourseDetail from "../CourseDetails/CourseDetail";
import Button from "../Button/Button";

const courses = [
  {
    id: 1,
    question: "About this Course",
    answer:
      "The course is designed to provide a comprehensive introduction to Ethereum smart contract development. Students will learn how to develop and deploy smart contracts on the Ethereum blockchain using the Solidity programming language. They will also learn how to interact with smart contracts using web3.js and other Ethereum development tools.",
  },
  {
    id: 2,
    question: "What you will Learn",
    answer: [
      <ul className="list-disc">
        <li>The basics of Ethereum and how it works.</li>
        <li>
          The Solidity programming language and how to write smart contracts
          using Solidity.
        </li>
        <li>
          Advanced Solidity concepts such as modifiers, inheritance, and error
          handling.
        </li>
        <li>
          Ethereum development tools and environment setup using Truffle and
          Ganache
        </li>
        <li>
          Interacting with smart contracts through the web3.js library for
          stunning interfaces
        </li>
        <li>Advanced contract topics such as events and optimization.</li>
        <li>
          Security and best practices for writing secure and efficient smart
          contracts & Building and deploying a fully functional smart contract
          that solves a real-world problem
        </li>
      </ul>,
    ],
  },
  {
    id: 3,
    question: "Prerequisites",
    answer: [
      <>
        <p>
          You should have a computer with an internet connection and have access
          to a Solidity development environment such as Remix or Truffle.
          Familiarity with Ethereum and the Ethereum Virtual Machine (EVM) is
          also recommended.
        </p>
        <ul className="list-disc">
          <li>
            Familiarity with basic programming concepts (variables, functions,
            loops, etc.)
          </li>
          <li>
            Basic understanding of blockchain technology and cryptocurrencies
          </li>
          <li>
            Some experience with JavaScript is recommended but not require
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
        <li>Introduction to Ethereum</li>
        <li>Setting up the Development Environment</li>
        <li>Writing Solidity Contracts & Deploying Contracts</li>
        <li>Interacting with Contract & Advanced Contract Topics</li>
        <li>Security and Best Practices</li>
        <li>Final Project</li>
      </ul>,
    ],
  },
  {
    id: 5,
    question: "Class Schedule",
    answer: "Days of Class: Wednesdays, Fridays and Saturdays.",
  },
];

const BlockchainDetail = () => {
  return (
    <div className="py-8 md:py-16 bg-gray-100 px-6 md:px-12 lg:px-24 xl:px-32">
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

export default BlockchainDetail;
