import doctorImg from "@/assets/doctor-portrait.jpg";
import clinic1 from "@/assets/clinic-1.jpg";
import clinic2 from "@/assets/clinic-2.jpg";
import clinic3 from "@/assets/clinic-3.jpg";
import clinic4 from "@/assets/clinic-4.jpg";
import { DOCTOR } from "@/lib/clinic";
import { Award, GraduationCap, Quote, Sparkles } from "lucide-react";

const gallery = [
  { src: clinic1, alt: "Lumen Dental reception lounge" },
  { src: clinic2, alt: "Modern dental treatment room" },
  { src: clinic4, alt: "Friendly dental team with patient" },
  { src: clinic3, alt: "Sterilised dental instruments" },
];

export const About = () => {
  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="pointer-events-none absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="container space-y-20">
        {/* Doctor block */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-2 relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-elegant">
              <img
                src={doctorImg}
                alt={`${DOCTOR.name}, founding dentist at Lumen Dental`}
                width={896}
                height={1152}
                loading="lazy"
                className="w-full h-[520px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-2xl bg-card border border-border shadow-soft px-5 py-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-hero text-primary-foreground">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-lg font-bold leading-none">7+ yrs</div>
                <div className="text-xs text-muted-foreground">of practice</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">Meet your dentist</div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
              {DOCTOR.name}
            </h2>
            <p className="text-primary font-medium">{DOCTOR.title}</p>
            <p className="text-muted-foreground text-lg leading-relaxed">{DOCTOR.bio}</p>

            <blockquote className="relative rounded-2xl border border-border gradient-card p-5 pl-12">
              <Quote className="absolute left-4 top-4 h-5 w-5 text-primary" />
              <p className="text-foreground italic">"{DOCTOR.philosophy}"</p>
            </blockquote>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {DOCTOR.highlights.map(h => (
                <div key={h} className="flex items-center gap-2.5 text-sm">
                  <Sparkles className="h-4 w-4 text-primary shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education timeline */}
        <div className="rounded-3xl border border-border gradient-card p-8 sm:p-10 shadow-soft">
          <div className="flex items-center gap-3 mb-8">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h3 className="font-display text-2xl font-bold">Education & training</h3>
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DOCTOR.education.map(e => (
              <li key={e.year} className="relative pl-5 border-l-2 border-primary/30">
                <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-primary" />
                <div className="font-display text-lg font-bold text-primary">{e.year}</div>
                <div className="text-sm text-muted-foreground mt-1">{e.text}</div>
              </li>
            ))}
          </ol>
        </div>

        {/* Clinic gallery */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">Inside the clinic</div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold">A space designed to put you at ease.</h3>
            <p className="text-muted-foreground">From the reception lounge to our treatment rooms, every detail is built around your comfort and safety.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {gallery.map((g, i) => (
              <div
                key={g.src}
                className={`relative overflow-hidden rounded-2xl shadow-soft group ${i === 0 ? "lg:col-span-2 lg:row-span-2 aspect-square" : "aspect-[4/3]"}`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
