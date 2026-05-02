import { Sparkles, Smile, Stethoscope, Activity, Baby, ShieldPlus } from "lucide-react";

const services = [
  { icon: Smile, title: "General Dentistry", desc: "Routine check-ups, cleanings and preventive care to keep your smile healthy." },
  { icon: Sparkles, title: "Cosmetic & Whitening", desc: "Veneers, bonding and in-chair whitening for a brighter, confident smile." },
  { icon: ShieldPlus, title: "Dental Implants", desc: "Permanent, natural-looking tooth replacement with titanium implants." },
  { icon: Activity, title: "Orthodontics", desc: "Clear aligners and modern braces, planned with 3D digital scans." },
  { icon: Stethoscope, title: "Root Canal Therapy", desc: "Pain-free endodontic treatment with the latest rotary instruments." },
  { icon: Baby, title: "Pediatric Care", desc: "Gentle, friendly dentistry for kids — building healthy habits early." },
];

export const Services = () => (
  <section id="services" className="py-24 lg:py-32">
    <div className="container">
      <div className="max-w-2xl mb-16">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">What we do</div>
        <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
          Comprehensive care under one calm roof.
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          From everyday cleanings to full smile makeovers — delivered by specialists you can trust.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s, i) => (
          <div
            key={s.title}
            className="group relative rounded-2xl border border-border gradient-card p-7 shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
          >
            <div className="h-12 w-12 rounded-xl bg-accent text-accent-foreground grid place-items-center mb-5 group-hover:gradient-hero group-hover:text-primary-foreground transition-all">
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            <div className="absolute top-7 right-7 text-xs text-muted-foreground/60 font-mono">0{i + 1}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
