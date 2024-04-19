<<<<<<< HEAD

=======
import CourseSection from "../CoursesHero/CourseHeroSec";


const sectionData = [
  {
    id: 4,
    title: "Blockchain Development",
    text: "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    headline1: "Graduate in six months, part-time, and start working in the high-demand field of software development.",
    headline2: "Meet regularly with an experienced mentor to ask the questions you care about.",
    headline3: "Build your coding skills and launch your software engineering career",
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
>>>>>>> 36b0419f4978be004ef7bba0f7d1ebea57b5e3d8
