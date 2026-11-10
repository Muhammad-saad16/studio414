import { Hero, Intro, Marquee, Markets, Process, ServicesList, Values } from "@/components/Home";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <ServicesList />
      <Values />
      <Process />
      <Markets />
    </>
  );
}
