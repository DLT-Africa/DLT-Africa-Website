import Image from "next/image";
import Link from "next/link";

import Course1 from "../../public/Course1.png";
import Course2 from "../../public/Course2.png";
import Course3 from "../../public/Course3.png";
import Course4 from "../../public/Course4.png";

const coursesList = [
  {
    id: 1,
    courseName: "UI/UX and Prototyping (Product Design)",
    description:
      "User Interface (UI) and User Experience(UX) design are in great demand and are applicable across products and industry domain. With customer experience being the centerfold...  ",
    media: Course3,
    url: "/product",
  },
  {
    id: 2,
    courseName: "Frontend Web Development",
    description:
    
      "Start off your career today as a Front-End Web Developer. Learn to build high quality websites with dynamic applications to create stunning user experiences… ",
    media: Course2,
    url: "/frontend",
  },
  {
    id: 3,
    courseName: "Fullstack Web Development",
    description:
      "Acquire the skills and knowledge needed build a complete web development project from scratch to finish. Our Full-Stack Developer's Program is a 6 months program.",
    media:  Course1,
    url: "/fullstack",
  },
  {
    id: 4,
    courseName: "Blockchain Development (Smart Contract)",
    description:
      "Acquire the skills and knowledge needed to be a Blockchain Developer. The course is designed to provide a comprehensive introduction to Ethereum smart contract development.",
    media: Course4,
    url: "/blockchain",
  },
];

const page = () => {
  return (
    <div>
      <div className="mt-12">
        <h1 className="text-4xl font-semibold text-center mb-8">
          Our Courses
        </h1>
      </div>

      <div className="flex flex-wrap gap-4 md:gap-x-8 md:gap-y-8 p-4 md:p-12 items-center justify-center font-serif">
        {coursesList.map(({ id, courseName, description, media, url }) => (
          <Link href={url} key={id}>
            <div className="w-full md:w-[502px] transition duration-300 transform hover:-translate-y-1 hover:shadow-lg ">
              <Image
                src={media}
                alt="courses"
                className="w-full h-52 md:rounded-t-lg md:h-60 object-cover cursor-pointer rounded-tr-lg rounded-tl-lg "
              />

              <div className="w-full md:rounded-b-lg bg-[#ffc072] p-4 md:p-6 h-40 md:h-30 rounded-br-lg rounded-bl-lg">
                <p className="text-[20px] text-black mb-1 md:mb-4 font-[600] ">
                  {courseName}
                </p>
                <p className="text-sm md:text-base text-black line-clamp-3">
                  {description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
