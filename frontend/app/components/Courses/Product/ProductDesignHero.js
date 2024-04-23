import CourseSection from "../CoursesHero/CourseHeroSec";

const sectionData = [
  {
    id: 3,
    title: "UI/UX Design and Prototyping(Product Design)",
    text: "Step into our immersive program to master the principles of product design. Learn UX/UI, prototyping, user research, and design thinking. Dive into real-world projects to create impactful designs.",
    headline1:
      "Graduate in three months, part-time, and start working in the high-demand field of software development.",
    headline2:
      "Meet regularly with an experienced mentor to ask the questions you care about.",
    headline3: "Build your UI/UX skills and launch your product design career",
    button1: "Register for Offline",
    button2: "Register for Online",
    img: "/images/front-end-hero.png",
  },
];

const ProductDesignHero = () => {
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

export default ProductDesignHero;
