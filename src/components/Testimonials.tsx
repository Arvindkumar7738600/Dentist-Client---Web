import { Star } from "lucide-react";

const testimonials = [
  { name: "Sarah K.", role: "Patient since 2021", text: "I used to dread the dentist. Here, they explain everything calmly and the chairs are honestly comfortable. Best cleaning I've ever had.", rating: 5 },
  { name: "Arvind K.", role: "Implant patient", text: "My implant looks and feels exactly like a real tooth. The whole team was meticulous from the first scan to the final fitting.", rating: 5 },
  { name: "Aman Raj.", role: "Whitening + Veneers", text: "I cannot stop smiling. Dr. Lin took the time to design something that actually fit my face. Worth every penny.", rating: 5 },
  { name: "Gautam kr.", role: "Family patient", text: "Bringing my two kids here is genuinely easy. The pediatric room has a little ceiling screen and they leave laughing.", rating: 5 },
  { name: "Elena M.", role: "Invisalign", text: "Finished in 9 months. The 3D preview was the moment I said yes. Booking is also stupidly simple.", rating: 5 },
  { name: "Ananya S.", role: "Emergency visit", text: "Cracked a molar on a Saturday. Walked in, was seen in 20 minutes, walked out fixed. Genuinely lifesaving.", rating: 5 },
  { name: "Hritik kumar", role: "Root canal", text: "I felt nothing. I kept asking 'are you starting?' and she'd already finished the first canal. Wild.", rating: 5 },
  { name: "Dinesh singh", role: "Cleaning", text: "Beautiful clinic, kind staff, no upsell. Just honest dental care done very well.", rating: 5 },
];

const Card = ({ t }: { t: typeof testimonials[number] }) => (
  <figure className="w-[340px] sm:w-[380px] shrink-0 rounded-2xl border border-border gradient-card p-6 shadow-soft">
    <div className="flex gap-0.5 mb-3 text-warning">
      {Array.from({ length: t.rating }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
    </div>
    <blockquote className="text-sm leading-relaxed text-foreground/90">"{t.text}"</blockquote>
    <figcaption className="mt-5 flex items-center gap-3">
      <div className="h-9 w-9 rounded-full gradient-hero grid place-items-center text-primary-foreground text-xs font-bold">
        {t.name.split(" ").map(n => n[0]).join("")}
      </div>
      <div>
        <div className="text-sm font-semibold">{t.name}</div>
        <div className="text-xs text-muted-foreground">{t.role}</div>
      </div>
    </figcaption>
  </figure>
);

export const Testimonials = () => {
  const loop = [...testimonials, ...testimonials];
  return (
    <section id="testimonials" className="py-24 lg:py-32 gradient-soft overflow-hidden">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Patient stories</div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            Loved by smiles across the city.
          </h2>
        </div>
      </div>

      <div className="marquee-pause relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex gap-5 w-max animate-marquee">
          {loop.map((t, i) => <Card key={i} t={t} />)}
        </div>
      </div>
    </section>
  );
};
