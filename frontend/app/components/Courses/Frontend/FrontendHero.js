import CourseSection from "../CoursesHero/CourseHeroSec";


const sectionData = [
  {
    id: 2,
    title: "Front End Web Development",
    text: "Discover the art of web development with our program. Dive into HTML, CSS, JavaScript, and create stunning sites. Real-world projects and expert guidance await you. Start your journey today!",
    headline1: "Graduate in six months, part-time, and start working in the high-demand field of software development.",
    headline2: "Meet regularly with an experienced mentor to ask the questions you care about.",
    headline3: "Build your coding skills and launch your software engineering career",
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