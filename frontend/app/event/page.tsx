import EventHero from "@/app/components/Event/EventHero";
import EventBootCamps_CurrentAndUpcoming from "@/app/components/Event/EventBootCamps_CurrentAndUpcoming";
import EventHackathon_CurrentAndUpcoming from "@/app/components/Event/EventHackathon_CurrentAndUpcoming";
import EventIncubator_CurrentAndUpcoming from "@/app/components/Event/EventIncubator_CurrentAndUpcoming";
import EventPastEventSection from "@/app/components/Event/EventPastEventSection";
import Head from "next/head";

const page = () => {
  return (
    <div>
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-G2R8DSB4GV"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-G2R8DSB4GV');
            `,
          }}
        />
      </Head>
    <div className="bg-[#F6F6F6]">
      <EventHero />
      <EventBootCamps_CurrentAndUpcoming />

      <div className="hidden md:block">
        <EventHackathon_CurrentAndUpcoming />
        <EventIncubator_CurrentAndUpcoming />
      </div>
      <EventPastEventSection />
    </div>
    </div>
  );
};

export default page;
