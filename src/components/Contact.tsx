import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CLINIC } from "@/lib/clinic";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(5).max(1000),
});

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error("Please fill in all fields correctly.");
      return;
    }
    const subject = encodeURIComponent(`Website inquiry from ${parsed.data.name}`);
    const body = encodeURIComponent(`${parsed.data.message}\n\n— ${parsed.data.name} (${parsed.data.email})`);
    window.location.href = `mailto:${CLINIC.email}?subject=${subject}&body=${body}`;
    toast.success("Opening your email client…");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 lg:py-32 gradient-soft">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Visit us</div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">Find us, message us, or just say hi.</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-3xl overflow-hidden border border-border shadow-soft min-h-[420px]">
            <iframe
              title="Clinic location"
              src={CLINIC.mapsEmbed}
              className="w-full h-full min-h-[420px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: MapPin, label: "Address", value: CLINIC.address },
                { icon: Phone, label: "Phone", value: CLINIC.phone },
                { icon: Mail, label: "Email", value: CLINIC.email },
                { icon: Clock, label: "Hours", value: CLINIC.hours },
              ].map(item => (
                <div key={item.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="h-9 w-9 rounded-lg bg-accent text-accent-foreground grid place-items-center mb-3">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                  <div className="text-sm font-medium mt-1">{item.value}</div>
                </div>
              ))}
            </div>

            <form onSubmit={submit} className="rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-soft space-y-4">
              <h3 className="font-display text-xl font-semibold">Send a message</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cname">Name</Label>
                  <Input id="cname" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} maxLength={80} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cemail">Email</Label>
                  <Input id="cemail" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} maxLength={255} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cmsg">Message</Label>
                <Textarea id="cmsg" rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} maxLength={1000} />
              </div>
              <Button type="submit" className="w-full rounded-full gradient-hero text-primary-foreground border-0 shadow-soft hover:shadow-glow transition-all">
                <Send className="mr-2 h-4 w-4" /> Send message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
