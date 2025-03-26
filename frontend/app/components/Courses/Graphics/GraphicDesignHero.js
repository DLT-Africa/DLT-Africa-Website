import CourseSection from "../CoursesHero/CourseHeroSec";

const sectionData = [
    {
        id: 4,
        title: "Graphic Design and Visual Communication",
        text: "Join our dynamic program to master the art of visual storytelling. Learn key skills like branding, typography, color theory, and digital design. Work on real-world projects to create compelling visuals.",
        headline1:
          "Experience a 3-month full-time learning journey and prepare for career opportunities in the growing creative industry.",
        headline2:
          "Connect regularly with a seasoned mentor to gain insights and guidance on your design path.",
        headline3: "Develop your graphic design skills and kickstart your creative career",
        button1: "Register for Offline",
        button2: "Register for Online",
        img: "/images/graphic-design-hero.png",
        // img: "/images/front-end-hero.png",
      }
    
];

const GraphicDesignHero = () => {
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

export default GraphicDesignHero;
