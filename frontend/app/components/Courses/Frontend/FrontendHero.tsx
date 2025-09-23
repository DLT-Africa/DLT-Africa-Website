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
    id: 2,
    title: "Front End Web Development",
    text: "Dive into our comprehensive program to master frontend development. Gain hands-on experience with real-world projects and elevate your frontend development skills.projects.",
    headline1:
      "Experience a four months full-time learning experience and be ready to take up job opportunities in the high-demand software development industry.",
    headline2:
      "Meet regularly with an experienced mentor to ask the questions you care about.",
    headline3:
      "Build your coding skills and launch your career as a front-end software engineer ",
    button1: "Register for Offline",
    button2: "Register for Online",
    img: "/images/front-end-hero.png",
  },
];

const FrontEndHero: React.FC = () => {
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
