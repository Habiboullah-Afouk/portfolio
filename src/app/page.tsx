import { Hero } from "@/components/sections/Hero";
import { SystemIdentity } from "@/components/sections/SystemIdentity";
import { Marquee } from "@/components/sections/Marquee";
import { Workstation } from "@/components/sections/Workstation";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { Capabilities } from "@/components/sections/Capabilities";
import { Signal } from "@/components/sections/Signal";

export default function Home() {
  return (
    <>
      <Hero />
      <SystemIdentity />
      <Marquee />
      <Workstation />
      <Work />
      <Process />
      <Capabilities />
      <Signal />
    </>
  );
}
