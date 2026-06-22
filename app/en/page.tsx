import { client } from "@/sanity/lib/client";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import Preloader from "@/components/Preloader";
import Footer from "@/components/Footer";
import JellyCursor from "@/components/JellyCursor";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import WhyUsSection from "@/components/WhyUsSection";

export default async function Home() {
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
      <JellyCursor locale="en" />
      
      <main className="relative z-10 bg-white mb-[100vh] rounded-b-3xl">
        <AnimatedNavbar locale="en" />
        <Preloader locale="en" />
        
        {/* Pass data to client components as props */}
        <HeroSection locale="en" />
        <ProjectsSection projects={projects} locale="en" />
        <WhyUsSection locale="en" />
      </main>

      <Footer locale="en" />
    </>
  );
}