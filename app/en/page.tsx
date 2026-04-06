import { client } from "@/sanity/lib/client";
import AnimatedNavbar from "@/components/AnimatedNavbarEN";
import Preloader from "@/components/preloaderEn";
import FooterEN from "@/components/FooterEN";

// Import our new client components
import JellyCursor from "@/components/JellyCursor";
import HeroSection from "@/components/en/HeroSection";
import ProjectsSection from "@/components/en/ProjectsSection";
import WhyUsSection from "@/components/en/WhyUsSection";

export default async function Home() {
  // 1. Fetch projects on the server (SSR)
  const query = `*[_type == "project"] | order(_createdAt desc) [0...3] {
    _id,
    title,
    slug,
    cardImage
  }`;
  const projects = await client.fetch(query);

  return (
    <>
      <JellyCursor />
      
      <main className="relative z-10 bg-white mb-[100vh] rounded-3xl">
        <AnimatedNavbar />
        <Preloader />
        
        {/* Pass data to client components as props */}
        <HeroSection />
        <ProjectsSection projects={projects} />
        <WhyUsSection />
        
      </main>

      <FooterEN />
    </>
  );
}