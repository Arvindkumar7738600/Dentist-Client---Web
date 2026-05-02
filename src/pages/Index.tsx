import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { Booking } from "@/components/Booking";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { ThemeProvider } from "@/hooks/useTheme";
import { useEffect } from "react";
import { CLINIC } from "@/lib/clinic";

const Index = () => {
  useEffect(() => {
    document.title = `${CLINIC.name} — Modern Dental Care & Online Booking`;
    const desc = `${CLINIC.name}: minimalist dental clinic with online appointment booking, live wait times, and gentle modern care.`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Testimonials />
          <Booking />
          <Contact />
        </main>
        <Footer />
        <WhatsAppFab />
      </div>
    </ThemeProvider>
  );
};

export default Index;
