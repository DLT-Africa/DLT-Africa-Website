import React from "react";
import FAQ from "./Faq";
import Link from "next/link";

const Faqs = () => {
  const faqOne = [
    {
      id: 1,
      question:
        "What are the requirements to join the software development training ?",
      answer:
        "Anyone with burning passion to build solution that solve real world use cases are eligible to join. We appreciate people who already have idea of what they are looking to build but we encourage everyone to apply.",
    },
  ];

  const faqTwo = [
    {
      id: 2,
      question: "What is the overview of the training ?",
      answer:
        "The training is to take an absolute beginners from ground zero to a smart contract developer with the curriculum including UI/UX, Javascript, NodeJs, ReactJS and smart contract development with Solidity.",
    },
  ];

  const faqThree = [
    {
      id: 3,
      question: "What are the key dates and how to apply for the training ?",
      answer: "The training durations depend on the chosen  ",
      url: "/courses",
      linkText: "courses",
    },
  ];

  const faqFour = [
    {
      id: 4,
      question:
        "What kind of company can participate in the incubation program ?",
      answer:
        "There are no restrictions on companies that can participate. Existing projects and new builders who wish to develop an impact-driven projects using Web3 can apply.",
    },
  ];

  const faqFive = [
    {
      id: 1,
      question: "What is the overview of the incubation program ?",
      answer:
        "The program is 3 months online program that include mentorship, management skills training, regular web3 session and networking events to help put the business in the right position. A demo day will be held during the final week, where there will be opportunity to pitch to global leaders and VC within Web3 space.",
    },
  ];

  const faqSix = [
    {
      id: 1,
      question: "How to apply for the incubation program and key dates ?",
      answer:
        "After submitting the application on our website, we will sent an email to confirm the application has been received. We will also follow up to schedule a time for screening and interview for successful application. Only the one who are successful after the interview will be selected to participate in the incubation program. The timeline from application to when successful application will be announced is eight weeks.",
    },
  ];

  const backgoundImage =
    "https://s3-alpha-sig.figma.com/img/e12b/f3f6/017ed28b632ffaaa6539c2f2c1ec403d?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MI3aVsECxE0e1mjJ63fDU2fljO6rk503uaGvQLut9nnLMjNps5EKjusN355eE~dnGWuT3GWuEXmJ7XZ7J2ybcfDxilz3gibbQzudZgOvId2fE9F9NjpZB6gsnoBK60Gj0xK1lhzc6BcGyNVFOif8CSRZa2F5BW0R0jf-Vo~bfZiHEZDWbZpdgl9O31ATRxiXezI~WzCIfsFUpBanXSii02QiSH8Cfgp4DivaojcnNERAAJ4SPbCu~ixGbl98dAc8QvDnIraU05qZqrl-0F76jywV-Butym8Hcjm628Hoc7Q6MCWOpmdL8qJugUQfE97Am-hG7lQluS-ffjc5QSj~Tw__";

  return (
    <section
      style={{
        backgroundImage: `url(${backgoundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="p-10 sm:p-20 flex flex-col items-center"
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl mb-5">
        Frequently asked questions
      </h1>
      <p className="text-center text-sm sm:text-base mb-10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
        lorem.
      </p>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-orange-300 p-5 mb-5 rounded-[10px]    sm:align-items-center lg:w-[725px]   w-[100%]">
          {faqOne.map(({ question, answer, id }) => (
            <FAQ key={id} question={question} answer={answer} />
          ))}
        </div>
        <div className="bg-orange-300 p-5 mb-5 rounded-[10px]   sm:align-items-center lg:w-[725px]   w-[100%]">
          {faqTwo.map(({ question, answer, id }) => (
            <FAQ key={id} question={question} answer={answer} />
          ))}
        </div>
        <div className="bg-orange-300 p-5 mb-5 rounded-[10px]   sm:align-items-center lg:w-[725px]   w-[100%]">
          {faqThree.map(({ question, answer, url, linkText, id }) => (
            <FAQ
              key={id}
              question={question}
              answer={`${answer}`}
              url={url}
              linkText={linkText}
            />
          ))}
        </div>
        <div className="bg-orange-300 p-5 mb-5 rounded-[10px]   sm:align-items-center lg:w-[725px]   w-[100%]">
          {faqFour.map(({ question, answer, id }) => (
            <FAQ key={id} question={question} answer={answer} />
          ))}
        </div>
        <div className="bg-orange-300 p-5 mb-5 rounded-[10px]   sm:align-items-center lg:w-[725px]   w-[100%]">
          {faqFive.map(({ question, answer, id }) => (
            <FAQ key={id} question={question} answer={answer} />
          ))}
        </div>
        <div className="bg-orange-300 p-5 mb-5 rounded-[10px]   sm:align-items-center lg:w-[725px]   w-[100%]">
          {faqSix.map(({ question, answer, id }) => (
            <FAQ key={id} question={question} answer={answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;
