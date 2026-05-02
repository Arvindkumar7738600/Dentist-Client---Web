import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CLINIC } from "@/lib/clinic";
import { MessageCircle, CalendarCheck, CheckCircle2, ExternalLink, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { WaitIndicator } from "./WaitIndicator";

type Confirmation = {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
  whatsappUrl: string;
  sentAt: Date;
};

const services = ["General check-up", "Teeth whitening", "Dental implant", "Orthodontics", "Root canal", "Pediatric visit", "Emergency"];

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().min(6, "Please enter a valid phone").max(30),
  service: z.string().min(1, "Pick a service"),
  date: z.string().min(1, "Pick a date"),
  time: z.string().min(1, "Pick a time"),
  notes: z.string().max(400).optional(),
});

export const Booking = () => {
  const today = new Date().toISOString().split("T")[0];
  const initialForm = { name: "", phone: "", service: "", date: today, time: "10:00", notes: "" };
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      toast.error(first ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    const msg =
      `*New appointment request — ${CLINIC.name}*%0A%0A` +
      `👤 *Name:* ${encodeURIComponent(parsed.data.name)}%0A` +
      `📞 *Phone:* ${encodeURIComponent(parsed.data.phone)}%0A` +
      `🦷 *Service:* ${encodeURIComponent(parsed.data.service)}%0A` +
      `📅 *Date:* ${encodeURIComponent(parsed.data.date)}%0A` +
      `🕐 *Time:* ${encodeURIComponent(parsed.data.time)}%0A` +
      (parsed.data.notes ? `📝 *Notes:* ${encodeURIComponent(parsed.data.notes)}` : "");

    const url = `https://wa.me/${CLINIC.whatsappNumber}?text=${msg}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("WhatsApp opened — review the details below.");
    setConfirmation({
      name: parsed.data.name,
      phone: parsed.data.phone,
      service: parsed.data.service,
      date: parsed.data.date,
      time: parsed.data.time,
      notes: parsed.data.notes,
      whatsappUrl: `https://wa.me/${CLINIC.whatsappNumber}?text=${msg}`,
      sentAt: new Date(),
    });
    setSubmitting(false);
  };

  const reset = () => {
    setConfirmation(null);
    setForm(initialForm);
  };

  return (
    <section id="booking" className="py-24 lg:py-32">
      <div className="container grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">Book online</div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            Reserve your visit in under a minute.
          </h2>
          <p className="text-muted-foreground text-lg">
            Submit the form and your request goes straight to the doctor's
            WhatsApp. You'll get a confirmation message within minutes.
          </p>
          <WaitIndicator />
          <div className="text-sm text-muted-foreground">
            <strong className="text-foreground">Hours:</strong> {CLINIC.hours}
          </div>
        </div>

        {confirmation ? (
          <div className="lg:col-span-3 rounded-3xl border border-success/30 gradient-card p-6 sm:p-8 shadow-soft space-y-6 animate-float-up">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-success/15 text-success">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-2xl font-bold">WhatsApp opened ✓</h3>
                <p className="text-sm text-muted-foreground">
                  We sent your appointment details to a new tab. Press <strong className="text-foreground">Send</strong> in WhatsApp to deliver them to the clinic. You'll get a confirmation reply within minutes.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-background/60 border border-border p-5 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Request summary</div>
              <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div><dt className="text-muted-foreground">Name</dt><dd className="font-medium">{confirmation.name}</dd></div>
                <div><dt className="text-muted-foreground">Phone</dt><dd className="font-medium">{confirmation.phone}</dd></div>
                <div><dt className="text-muted-foreground">Service</dt><dd className="font-medium">{confirmation.service}</dd></div>
                <div><dt className="text-muted-foreground">Date & time</dt><dd className="font-medium">{confirmation.date} · {confirmation.time}</dd></div>
                {confirmation.notes && (
                  <div className="sm:col-span-2"><dt className="text-muted-foreground">Notes</dt><dd className="font-medium">{confirmation.notes}</dd></div>
                )}
                <div className="sm:col-span-2 pt-2 border-t border-border text-xs text-muted-foreground">
                  Sent at {confirmation.sentAt.toLocaleString()}
                </div>
              </dl>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="flex-1 rounded-full gradient-hero text-primary-foreground border-0 shadow-soft">
                <a href={confirmation.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Re-open WhatsApp
                </a>
              </Button>
              <Button onClick={reset} variant="outline" size="lg" className="rounded-full">
                <RotateCcw className="mr-2 h-4 w-4" />
                New request
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="lg:col-span-3 rounded-3xl border border-border gradient-card p-6 sm:p-8 shadow-soft space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={form.name} onChange={e => update("name", e.target.value)} placeholder="Jane Doe" maxLength={80} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="+1 234 567 890" maxLength={30} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Service</Label>
              <Select value={form.service} onValueChange={v => update("service", v)}>
                <SelectTrigger><SelectValue placeholder="Choose a treatment" /></SelectTrigger>
                <SelectContent>
                  {services.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Preferred date</Label>
                <Input id="date" type="date" min={today} value={form.date} onChange={e => update("date", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Preferred time</Label>
                <Input id="time" type="time" value={form.time} onChange={e => update("time", e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes <span className="text-muted-foreground">(optional)</span></Label>
              <Textarea id="notes" value={form.notes} onChange={e => update("notes", e.target.value)} placeholder="Anything we should know?" rows={3} maxLength={400} />
            </div>

            <Button type="submit" disabled={submitting} size="lg" className="w-full rounded-full gradient-hero text-primary-foreground border-0 shadow-soft hover:shadow-glow transition-all">
              <MessageCircle className="mr-2 h-4 w-4" />
              {submitting ? "Opening WhatsApp…" : "Send via WhatsApp"}
            </Button>
            <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5">
              <CalendarCheck className="h-3.5 w-3.5" />
              Your request goes directly to the clinic. No spam, ever.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
