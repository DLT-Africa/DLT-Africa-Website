import CourseSection from "../CoursesHero/CourseHeroSec";

interface SectionDataItem {
  id: number;
  title: string;
  text: string;
  headline1: string;
  headline2: string;
  headline3: string;
  button1: string;
  button2: string;
  img: string;
}

const sectionData: SectionDataItem[] = [
  {
    id: 1,
    title: "Full Stack Web Development",
    text: "Experience a six months full-time learning experience and be ready to take up job opportunities in the high-demand software development industry.",
    headline1:
      "Graduate in six months, part-time, and start working in the high-demand field of software development.",
    headline2:
      "Meet regularly with an experienced mentor to ask the questions you care about.",
    headline3:
      "Build your coding skills and launch your software engineering career",
    button1: "Register for Offline",
    button2: "Register for Online",
    img: "/images/front-end-hero.png",
  },
];

const FullStackHero: React.FC = () => {
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

export default FullStackHero;
