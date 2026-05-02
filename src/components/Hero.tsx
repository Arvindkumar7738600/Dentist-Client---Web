import heroImg from "@/assets/hero-clinic.jpg";
import { Button } from "@/components/ui/button";
import { WaitIndicator } from "./WaitIndicator";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute top-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-primary-glow/20 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />

      <div className="container relative grid lg:grid-cols-2 gap-12 lg:gap-16 py-20 lg:py-28 items-center">
        <div className="space-y-8 animate-float-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Trusted by 2,200+ patients
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            A brighter smile,
            <br />
            <span className="text-gradient">gently delivered.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            Modern dentistry in a calm, design-led space. Same-day appointments,
            transparent pricing, and care that respects your time.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full gradient-hero text-primary-foreground border-0 shadow-elegant hover:shadow-glow transition-all">
              <a href="#booking">
                Book an appointment
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <a href="#services">Explore services</a>
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 pt-4">
            {[
              { v: "7+", l: "years of practice" },
              { v: "98%", l: "patient satisfaction" },
              { v: "Same-day", l: "emergency care" },
            ].map(s => (
              <div key={s.l}>
                <div className="font-display text-2xl font-bold">{s.v}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-float-up" style={{ animationDelay: "0.15s" }}>
          <div className="relative rounded-[2rem] overflow-hidden shadow-elegant">
            <img
              src={heroImg}
              alt="Modern minimalist dental clinic interior"
              width={1536}
              height={1024}
              className="w-full h-[520px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>

          <div className="absolute -bottom-6 -left-6 right-12 sm:right-24">
            <WaitIndicator />
          </div>
        </div>
      </div>
    </section>
  );
};
