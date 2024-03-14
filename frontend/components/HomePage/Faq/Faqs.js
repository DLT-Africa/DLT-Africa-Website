import React from "react";
import FAQ from "./Faq";

const Faqs = () => {
  const faqOne = [
    {
      id: 1,
      question: "Select an option",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ligula lorem, varius vitae est eget, tempor mollis lorem. Nam vehicula commodo malesuada. Cras tempus metus id lorem vulputate facilisis. Morbi vel ipsum convallis, pellentesque eros et, elementum magna. Aenean convallis lobortis ipsum, non mollis est rutrum sit amet. Fusce imperdiet volutpat dolor sed scelerisque. Mauris neque risus, condimentum in ultrices vitae, ultrices sit amet eros. Vivamus suscipit imperdiet lacus, euismod condimentum nibh molestie sit amet. Nullam enim nulla, luctus eu tellus id, commodo ultricies nunc. Pellentesque iaculis, tellus et eleifend faucibus, magna tortor sodales mauris, in ullamcorper metus metus in eros. Nulla in molestie orci, nec tristique lorem.",
    },
  ];

  const faqTwo = [
    {
      id: 1,
      question: "Select an option",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ligula lorem, varius vitae est eget, tempor mollis lorem. Nam vehicula commodo malesuada. Cras tempus metus id lorem vulputate facilisis. Morbi vel ipsum convallis, pellentesque eros et, elementum magna. Aenean convallis lobortis ipsum, non mollis est rutrum sit amet. Fusce imperdiet volutpat dolor sed scelerisque. Mauris neque risus, condimentum in ultrices vitae, ultrices sit amet eros. Vivamus suscipit imperdiet lacus, euismod condimentum nibh molestie sit amet. Nullam enim nulla, luctus eu tellus id, commodo ultricies nunc. Pellentesque iaculis, tellus et eleifend faucibus, magna tortor sodales mauris, in ullamcorper metus metus in eros. Nulla in molestie orci, nec tristique lorem.",
    },
  ];

  const faqThree = [
    {
      id: 1,
      question: "Select an option",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ligula lorem, varius vitae est eget, tempor mollis lorem. Nam vehicula commodo malesuada. Cras tempus metus id lorem vulputate facilisis. Morbi vel ipsum convallis, pellentesque eros et, elementum magna. Aenean convallis lobortis ipsum, non mollis est rutrum sit amet. Fusce imperdiet volutpat dolor sed scelerisque. Mauris neque risus, condimentum in ultrices vitae, ultrices sit amet eros. Vivamus suscipit imperdiet lacus, euismod condimentum nibh molestie sit amet. Nullam enim nulla, luctus eu tellus id, commodo ultricies nunc. Pellentesque iaculis, tellus et eleifend faucibus, magna tortor sodales mauris, in ullamcorper metus metus in eros. Nulla in molestie orci, nec tristique lorem.",
    },
  ];

  const faqFour = [
    {
      id: 1,
      question: "Select an option",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ligula lorem, varius vitae est eget, tempor mollis lorem. Nam vehicula commodo malesuada. Cras tempus metus id lorem vulputate facilisis. Morbi vel ipsum convallis, pellentesque eros et, elementum magna. Aenean convallis lobortis ipsum, non mollis est rutrum sit amet. Fusce imperdiet volutpat dolor sed scelerisque. Mauris neque risus, condimentum in ultrices vitae, ultrices sit amet eros. Vivamus suscipit imperdiet lacus, euismod condimentum nibh molestie sit amet. Nullam enim nulla, luctus eu tellus id, commodo ultricies nunc. Pellentesque iaculis, tellus et eleifend faucibus, magna tortor sodales mauris, in ullamcorper metus metus in eros. Nulla in molestie orci, nec tristique lorem.",
    },
  ];

  const faqFive = [
    {
      id: 1,
      question: "Select an option",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ligula lorem, varius vitae est eget, tempor mollis lorem. Nam vehicula commodo malesuada. Cras tempus metus id lorem vulputate facilisis. Morbi vel ipsum convallis, pellentesque eros et, elementum magna. Aenean convallis lobortis ipsum, non mollis est rutrum sit amet. Fusce imperdiet volutpat dolor sed scelerisque. Mauris neque risus, condimentum in ultrices vitae, ultrices sit amet eros. Vivamus suscipit imperdiet lacus, euismod condimentum nibh molestie sit amet. Nullam enim nulla, luctus eu tellus id, commodo ultricies nunc. Pellentesque iaculis, tellus et eleifend faucibus, magna tortor sodales mauris, in ullamcorper metus metus in eros. Nulla in molestie orci, nec tristique lorem.",
    },
  ];

  const faqSix = [
    {
      id: 1,
      question: "Select an option",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ligula lorem, varius vitae est eget, tempor mollis lorem. Nam vehicula commodo malesuada. Cras tempus metus id lorem vulputate facilisis. Morbi vel ipsum convallis, pellentesque eros et, elementum magna. Aenean convallis lobortis ipsum, non mollis est rutrum sit amet. Fusce imperdiet volutpat dolor sed scelerisque. Mauris neque risus, condimentum in ultrices vitae, ultrices sit amet eros. Vivamus suscipit imperdiet lacus, euismod condimentum nibh molestie sit amet. Nullam enim nulla, luctus eu tellus id, commodo ultricies nunc. Pellentesque iaculis, tellus et eleifend faucibus, magna tortor sodales mauris, in ullamcorper metus metus in eros. Nulla in molestie orci, nec tristique lorem.",
    },
  ];

  const backgoundImage =
    "https://s3-alpha-sig.figma.com/img/e12b/f3f6/017ed28b632ffaaa6539c2f2c1ec403d?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=g4x3ZXmd843CbxEOUZjirzw9xVUYUunoiDqF~BdhyMSCkoheJkxrpa5MdULTTZcKn5RBUdjE0-iur7jjhxo8o6G4L7Y0OzLryowO69jTDFFHHE18UU-X4q3bO~FTch2IBIXPZR3IqKMNkLok1sFy3LLxYlxbcr-l552VJ8e0xRBNyaqEY4ebKq67Tp-FSiQfGYl6~Bp1UHLaezPxtaebXrOZgJnq6fGW6JfWq8G4dYKrVoSTvDgvoXjWbHI235gLSdMN4Sq6FdGk8vrHGNoYTrHY6FNj0ZCsE5du2u~W0DrcMBd1SFuJzFxPty0Y7pq~NoCinLQk4dsB~JS84GTZcg__";

  return (
    <section
      style={{
        backgroundImage: `url(${backgoundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="p-40 "
    >
      <div className="text-center mb-10 -m-20">
        <h1 className="text-4xl mb-5">Frequently asked questions</h1>
        <p className="text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasell <br/>
          lorem. Nam vehicula commodo malesuada. Cras tempus metus id lorem<br/>
          vulputate pellentesque eros et, elementum magna. Aenean convallis
          lobortis ipsum, non me lorem.
        </p>
      </div>

      <div className="bg-orange-300 p-5 mb-5 rounded-[10px]">
        {faqOne.map(({ question, answer, id }) => (
          <FAQ key={id} question={question} answer={answer} />
        ))}
      </div>

      <div className="bg-orange-300 p-5 mb-5 rounded-[10px]">
        {faqTwo.map(({ question, answer, id }) => (
          <FAQ key={id} question={question} answer={answer} />
        ))}
      </div>

      <div className="bg-orange-300 p-5 mb-5 rounded-[10px]">
        {faqThree.map(({ question, answer, id }) => (
          <FAQ key={id} question={question} answer={answer} />
        ))}
      </div>

      <div className="bg-orange-300 p-5 mb-5 rounded-[10px]">
        {faqFour.map(({ question, answer, id }) => (
          <FAQ key={id} question={question} answer={answer} />
        ))}
      </div>

      <div className="bg-orange-300 p-5 mb-5 rounded-[10px]">
        {faqFive.map(({ question, answer, id }) => (
          <FAQ key={id} question={question} answer={answer} />
        ))}
      </div>

      <div className="bg-orange-300 p-5 mb-5 rounded-[10px]">
        {faqSix.map(({ question, answer, id }) => (
          <FAQ key={id} question={question} answer={answer} />
        ))}
      </div>
    </section>
  );
};

export default Faqs;
