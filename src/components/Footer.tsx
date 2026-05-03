import { CLINIC } from "@/lib/clinic";

export const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div>© {new Date().getFullYear()} {CLINIC.name}. All rights reserved.</div>
      <div>Designed and built by Arvind K.</div>
      <div>{CLINIC.tagline}</div>
    </div>
  </footer>
);
