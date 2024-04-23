import EventHero from "@/app/components/Event/EventHero";
import EventBootCamps_CurrentAndUpcoming from "@/app/components/Event/EventBootCamps_CurrentAndUpcoming";
import EventHackathon_CurrentAndUpcoming from "@/app/components/Event/EventHackathon_CurrentAndUpcoming";
import EventIncubator_CurrentAndUpcoming from "@/app/components/Event/EventIncubator_CurrentAndUpcoming";
import EventPastEventSection from "@/app/components/Event/EventPastEventSection";

const page = () => {
  return (
    <div className="bg-[#F6F6F6]">
      <EventHero />
      <EventBootCamps_CurrentAndUpcoming />

      <div className="hidden md:block">
        <EventHackathon_CurrentAndUpcoming />
        <EventIncubator_CurrentAndUpcoming />
      </div>
      <EventPastEventSection />
    </div>
  );
};

export default page;
