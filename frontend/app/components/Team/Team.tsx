"use client";

import { BsLinkedin, BsTwitterX } from "react-icons/bs";

interface TeamMember {
  id: number;
  img: string;
  name: string;
  role: string;
  description: string;
  linkedinLink: string | null;
  twitterLink: string;
}

const teamMember: TeamMember[] = [
  {
    id: 1,
    img: "/images/soliu.jpeg",
    name: "Soliu Ahmad",
    role: "Software Developer",
    description:
      "Soliu is a software developer, he is a very good team worker. He is always ready to face any challenging projects.",
    linkedinLink: "https://www.linkedin.com/in/soliu-ahmad-31b049240",
    twitterLink: "https://twitter.com/Ahmadsoliu1",
  },
  {
    id: 2,
    img: "/images/naheem.jpeg",
    name: "Naheem Oloyede",
    role: "Software Developer & Team Lead",
    description:
      "Naheem is a witty and result oriented full stack developer. Naheem is astuteness and zeal for getting excellent results coupled with his exceptional leadership, and HR skills earned him job at DLT Africa..",
    linkedinLink: "https://www.linkedin.com/in/naheem-oloyede-593809251",
    twitterLink: "https://twitter.com/OloyedeNaheem",
  },
  {
    id: 3,
    img: "/images/jordan.jpeg",
    name: "Jordan Muthemba",
    role: "Blockchain Developer",
    description:
      "Jordan is driven by his passion for software development and his desire to use technology to make a positive impact on communities. He is committed to sharing his knowledge with others and is always eager to talk about his journey in Blockchain technology.",
    linkedinLink: "https://www.linkedin.com/in/jordan-muthemba/",
    twitterLink: "https://twitter.com/type_jordan",
  },
  {
    id: 4,
    img: "/images/abdullah.jpeg",
    name: "Abdullah Raji",
    role: "Software Developer",
    description:
      "With a passion for coding, I have dedicated expertise to shaping innovative solutions in the realm of technology.",
    linkedinLink: "www.linkedin.com/in/alameer98",
    twitterLink: "https://twitter.com/17_alAmeer",
  },
  {
    id: 5,
    img: "/images/anate.jpeg",
    name: "Aliyu Anate",
    role: "Software Developer",
    description:
      "Creative software engineer blending innovation with hard work and humor for impactful solutions",
    linkedinLink: "https://www.linkedin.com/in/aliyu-anate-9773b22b8",
    twitterLink: "https://twitter.com/anate669288",
  },
  {
    id: 6,
    img: "/images/fawaz.jpeg",
    name: "Fawaz Dada",
    role: "Graphic Designer",
    description:
      "A highly creative, fast-working, and adaptable graphic designer who can quickly grasp the concept of the brief he has been given. He has a strong understanding of the principles of design and he is able to apply them to create visually appealing and effective designs..",
    linkedinLink: null,
    twitterLink: "https://twitter.com/dadaXxf",
  },
  {
    id: 7,
    img: "/images/seyi.jpeg",
    name: "Oluwaseyi Abolaji",
    role: "Product Designer & Manager",
    description:
      "Oluwaseyi is a Product designer with a background in Computer Science. Keeping the users needs and expectations in mind while not losing sight of the business goals, enables him to make sound design decisions that benefit the user and the business.",
    linkedinLink: "https://www.linkedin.com/in/oluwaseyi-abolaji-8b936a213",
    twitterLink: "https://twitter.com/Oluwaseyi_7",
  },
  // {
  //   id: 8,
  //   img: "/images/herlew.jpeg",
  //   name: "Aliu Musa",
  //   role: "Chief Servant Officer",
  //   description:
  //     "Aliu Musa has wealth of experience in Software Engineering and Business Operations, having worked with top web3 companies across the world including OKX, Real Items and Celo Foundation  and also worked at Arbitrum Foundation as a Senior Program Manager.",
  //   linkedinLink: "https://www.linkedin.com/in/aliumusa",
  //   twitterLink: "https://twitter.com/herlew99",
  // },
];

const backgoundImage =
  "https://s3-alpha-sig.figma.com/img/30e7/ba92/c51479ec9db1e5601ae0aae5613f39bc?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UO3zPE9bTChfdGKwlcUwVL33ZpwtdldQBQxILTnFZEemkufw55Ze6QiKilY2r35Akpd~2K61p3yPojAM423UK5yIg9W8ZDu1A9Zfku1WzjKp84~96Uxhwdfx5cqvIRSqn4J52VSVv03QUTiQtXYkmtO5ZHfBzj45tBFAOBTgyXqgz8igSRKfdWymye1~QBstRYcnDPsMZDKs~ty-AwnAiGdc4nlJr2vTURScGQ5n8uXRu2-G7GJtoELWPlBDNwCb2LEMKgBNMfRvP4k21HrITmPVUs8WyngXIRvIZQGzJyBtPh6pMasg81aLYl6KuXaH3wDZajLLNcPXL3qEvW4kmA__";

const Team: React.FC = () => {
  return (
    <div className="">
      <div
        className="mt-[185px] 
                text-center 
                mb-[111px] 
                text-[#441606] 
                text-[36px] 
                font-[normal] 
                leading-[120%] 
                tracking-[2.52px]
                "
      >
        {" "}
        Meet the Team
      </div>

      <div
        className="grid gap-6 
                w-full 
                px-10 
                pt-10 
                md:grid-cols-2 
                lg:grid-cols-3
                place-content-center
                "
      >
        {teamMember.map((member: TeamMember) => (
          <div
            className="flex 
                        flex-col 
                        w-full 
                        h-auto 
                        gap-[35px] 
                        items-center 
                        flex-shrink-0 
                        px-50px
                        border-2 border-orange-100 
                        rounded-[10px] 
                        mb-[73px]
                        "
            key={member.id}
          >
            <div>
              <img
                className="w-[180px] 
                                h-[180px] 
                                flex 
                                justify-center 
                                items-center
                                mt-5 
                                rounded-lg"
                src={member.img}
                alt="team image"
                loading="lazy"
              />
            </div>

            <div className="p-[20px]">
              <h2
                className="
                                text-[22px]
                                text-[#1C1C1C] 
                                text-center 
                                mb-[15px] 
                                font-Poppins 
                                leading-[120%] 
                                font-semibold 
                                opacity-[0.75]"
              >
                {member.name}
              </h2>

              <h3
                className="text-center 
                                text-[#1C1C1C] 
                                text-[16px] 
                                font-light 
                                font-[normal] 
                                leading-[120%] 
                                opacity-[0.65]
                                mb-[7px]"
              >
                {member.role}
              </h3>

              <p
                className="
                                text-[14px] 
                                text-center 
                                text-[#1C1C1C] 
                                font-light 
                                font-[normal] 
                                leading-[120%] 
                                opacity-[0.65] "
              >
                "{member.description}"
              </p>
            </div>

            <div className="flex mb-[16px] w-[40px] h-[40px] gap-[10px]">
              {member.linkedinLink && (
                <a
                  href={member.linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsLinkedin className="text-[#0A66C2] text-[25px] transition duration-500 ease-in-out transform hover:translate-y-1 hover:scale-110" />
                </a>
              )}

              <a
                href={member.twitterLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsTwitterX className="text-[#000000] text-[25px] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
