import { client } from "@/sanity/lib/client";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import Preloader from "@/components/Preloader";
import Footer from "@/components/Footer";
import JellyCursor from "@/components/JellyCursor";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import WhyUsSection from "@/components/WhyUsSection";

export default async function HomeDE() {
  // Fetch projects on the server (SSR)
  const query = `*[_type == "project"] | order(_createdAt desc) [0...3] {
    _id,
    title,
    slug,
    cardImage
  }`;
  const projects = await client.fetch(query);

  return (
    <>
      <JellyCursor locale="de" />
      
      {/* Spacer for sticky footer */}
      <main className="relative z-10 bg-transparent mb-[100vh]">
        <AnimatedNavbar locale="de" />
        <Preloader locale="de" />
        
        {/* Page Sections */}
        <HeroSection locale="de" />
        
        <div className="bg-white rounded-b-3xl relative z-10">
          <ProjectsSection projects={projects} locale="de" />
          <WhyUsSection locale="de" />
        </div>
      </main>

      <Footer locale="de" />
    </>
  );
}