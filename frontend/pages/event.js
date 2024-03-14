import EventBootCamps_CurrentAndUpcoming from "../components/Event/EventBootCamps_CurrentAndUpcoming";
import EventHackathon_CurrentAndUpcoming from "../components/Event/EventHackathon_CurrentAndUpcoming";
import EventHero from "../components/Event/EventHero";
import EventIncubator_CurrentAndUpcoming from "../components/Event/EventIncubator_CurrentAndUpcoming";
import EventPastEventSection from "../components/Event/EventPastEventSection";

const event = () => {
  return (
    <div>
      <EventHero />
      <EventBootCamps_CurrentAndUpcoming />
      <EventHackathon_CurrentAndUpcoming />
      <EventIncubator_CurrentAndUpcoming />
      <EventPastEventSection />
    </div>
  );
};

export default event;
