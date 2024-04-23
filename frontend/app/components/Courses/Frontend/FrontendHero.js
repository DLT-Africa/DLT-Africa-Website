import CourseSection from "../CoursesHero/CourseHeroSec";

const sectionData = [
  {
    id: 2,
    title: "Front End Web Development",
    text: "Dive into our comprehensive program to master frontend development. Gain hands-on experience with real-world projects and elevate your frontend development skills.",
    headline1:
      "Graduate in four months, part-time, and start working in the high-demand field of software development.",
    headline2:
      "Meet regularly with an experienced mentor to ask the questions you care about.",
    headline3:
      "Build your coding skills and launch your career as a front-end software engineer ",
    button1: "Register for Offline",
    button2: "Register for Online",
    img: "/images/front-end-hero.png",
  },
];

const FrontEndHero = () => {
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

export default FrontEndHero;
