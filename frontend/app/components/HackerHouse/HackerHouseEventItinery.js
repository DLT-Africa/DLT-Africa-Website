const HackerHouseEventItinery = () => {
  const eventContent = [
    {
      date: "March - December",
      events: [
        "10am: Opening ceremony",
        "10:30am-12:30AM: Hacking & workshops",
        "12:30am-1:30pm: Lunch",
        "1:30pm-7pm: Hacking & workshops",
        "7pm-8pm: Dinner",
        "8pm-11pm: Happy hour, karaoke, workshop",
        "11pm-8am: Overnight hacking and workshop",
      ],
    },
    {
      date: "[in view]",
      events: [
        "10am: Opening ceremony",
        "10:30am-12:30AM: Hacking & workshops",
        "12:30am-1:30pm: Lunch",
        "1:30pm-7pm: Hacking & workshops",
        "7pm-8pm: Dinner",
        "8pm-11pm: Happy hour, karaoke, workshop",
        "11pm-8am: Overnight hacking and workshop",
      ],
    },
  ];

  return (
    <div className="border-b border-solid border-black border-opacity-30 bg-[#031700] flex-shrink-0">
      <h1 className="text-[#F7FCFE] font-Serif text-[48px] pt-[57px] text-center font-normal font-serif mb-10">
        Event Itinerary
      </h1>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 p-5">
        {eventContent.map(({ date, events }, index) => (
          <div key={index} className="flex flex-col items-start gap-10">
            <h4 className="text-[#FC7C13] font-poppins text-[24px] font-medium leading-[120%] opacity-75">
              Date:{" "}
              <span className="opacity-75 text-[#F7FCFE] font-poppins text-xl font-medium leading-relaxed">
                {date}
              </span>
            </h4>

            <div className="flex flex-col items-start gap-3">
              {events.map((event, idx) => (
                <p
                  key={idx}
                  className="text-[#F7FCFE] font-poppins text-[17px] font-semibold leading-[120%] opacity-[0.65]"
                >
                  {event}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-20 mb-20">
        <button className="w-[353px] h-[55px] p-[10px] flex justify-center items-center gap-[10px] rounded-lg bg-orange-500 text-[#F7FCFE] sm:w-[350px] sm:h-[60px] sm:text-sm md:w-[300px] md:h-[50px] md:text-base lg:w-[400px] lg:h-[60px] lg:text-lg">
          Sign up for Hacker house
        </button>
      </div>
    </div>
  );
};

export default HackerHouseEventItinery;
