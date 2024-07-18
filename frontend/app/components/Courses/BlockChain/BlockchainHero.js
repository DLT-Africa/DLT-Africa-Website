import CourseSection from "../CoursesHero/CourseHeroSec";

const sectionData = [
  {
    id: 4,
    title: "Blockchain Development",
    text: "Embark on a journey to master blockchain technologies, smart contracts, and crypto applications. Learn Ethereum, Solidity, and dive into hands-on projects. Become a blockchain innovator",
    headline1:
      "Graduate in four months, part-time, and start working in the high-demand field of software development.",
    headline2:
      "Meet regularly with an experienced mentor to ask the questions you care about.",
    headline3:
      "Build your coding skills and launch your blockchain engineering career",
      headline4: "",
    button1: "Register for Offline",
    button2: "Register for Online",
    img: "/images/front-end-hero.png",
  },
];

const BlockChainHero = () => {
  return (
    <section className="course" id="course">
      <div>
        {sectionData.map(({ id, ...rest }) => (
          <CourseSection key={id} {...rest} showCheckbox={true} />
        ))}
      </div>
    </section>
  );
};

export default BlockChainHero;
