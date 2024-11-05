import React from "react";

const partnerItems = [
  {
    id: 1,
    img: "/images/cartesi.png",
    url: "https://cartesi.io",
  },

  {
    id: 2,
    img: "/images/bitmama.png",
    url: "https://bitmama.io",
  },

  {
    id: 3,
    img: "/images/celo.png",
    url: "https://celo.org",
  },

  {
    id: 4,
    img: "/images/lisk-black.png",
    url: "https://lisk.com",
  },

  {
    id: 5,
    img: "/images/canza.png",
    url: "https://canza.io",
  },

  {
    id: 6,
    img: "/images/kotanipay.png",
    url: "https://kotanipay.com",
  },
];

const Partners = () => {
  return (
    <>
      <div className="bg-[#F6F7F6] border-2 border-black-[#000000] py-6">
        <div
          className="flex flex-col text-center 
          
          text-[#1C1C1C] 
          lg:text-[40px]
          font-serif
          tracking-[1px]
          width-full
          md:text-[36px]
          text-[30px]
          font-bold mt-[57px] "
        >
          {" "}
          People We Have Worked With
        </div>

        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] mt-[35px] ">
          <div
            x-ref="logos"
            className=" flex items-center justify-center md:justify-start [&_img]:max-w-none animate-infinite-scroll"
          >
            {partnerItems.map((partner) => (
              <div key={partner.id} className="py-4 m-4">
                <a href={partner.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={partner.img}
                    alt={partner.url} loading="lazy"
                    className="h-[40px] w-auto sm:h-[60px]  md:h-[80px] lg:h-[100px] xl:h-[120px] "
                  />
                </a>
              </div>
            ))}
          </div>
          <div
            x-ref="logos"
            className=" flex items-center justify-center md:justify-start [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true"
          >
            {partnerItems.map((partner) => (
              <div key={partner.id} className="py-4 m-4">
                <a href={partner.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={partner.img}
                    loading="lazy"
                    alt={partner.url}
                    className="h-[40px] w-auto sm:h-[60px] md:h-[80px] lg:h-[100px] xl:h-[120px] animate-move-horizontal"
                  loading="lazy"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Partners;
