import { Suspense } from "react";
import Navbar from "@/components/Navbar/navbar";
import HeroSection from "@/components/Hero/hero-section";
import { Loader } from "@/components/Loader/loader";
import AboutSection from "@/components/About/about-section";
import ServicesSection from "@/components/Services/services-section";
import ProjectsSection from "@/components/Projects/project-section";
import TechStackSection from "@/components/TechStack/tech-stack";
import ProcessSection from "@/components/Process/process-section";
import TeamSection from "@/components/Team/team-section";
import TestimonialsSection from "@/components/Testimonials/testimonials.section";
import ContactSection from "@/components/Contact/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <Suspense fallback={<Loader />}>
        <HeroSection />
      </Suspense>

      <AboutSection />

      <Suspense fallback={<Loader />}>
        <ServicesSection />
      </Suspense>

      <ProjectsSection />

      <Suspense fallback={<Loader />}>
        <TechStackSection />
      </Suspense>

      <ProcessSection />
      <TeamSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />


    </main>
  );
}
