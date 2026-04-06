import { client } from "@/sanity/lib/client";
import AnimatedNavbar from "@/components/AnimatedNavbarDE";
import Preloader from "@/components/preloaderDe";
import FooterDE from "@/components/FooterDE";

// Import our client wrappers and components
import JellyCursorDE from "@/components/de/JellyCursorDE";
import HeroSectionDE from "@/components/de/HeroSectionDE";
import ProjectsSectionDE from "@/components/de/ProjectsSectionDE";
import WhyUsSectionDE from "@/components/de/WhyUsSectionDE";

export default async function HomeDE() {
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
      <JellyCursorDE />
      
      {/* Spacer for sticky footer */}
      <main className="relative z-10 bg-white mb-[100vh]">
        <AnimatedNavbar />
        <Preloader />
        
        {/* Page Sections */}
        <HeroSectionDE />
        <ProjectsSectionDE projects={projects} />
        <WhyUsSectionDE />
        
      </main>

      <FooterDE />
      </>
  );
}