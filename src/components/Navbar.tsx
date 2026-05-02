import { Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { CLINIC } from "@/lib/clinic";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#booking", label: "Book" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg gradient-hero text-primary-foreground shadow-soft">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2C8 2 6 5 6 9c0 3 1 5 1.5 8.5C8 20 9 22 10 22s1.5-2 2-5c.5 3 1 5 2 5s2-2 2.5-4.5C17 14 18 12 18 9c0-4-2-7-6-7Z" />
            </svg>
          </span>
          {CLINIC.name}
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme" className="rounded-full">
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          <Button asChild className="hidden md:inline-flex rounded-full gradient-hero text-primary-foreground hover:opacity-90 border-0 shadow-soft">
            <a href="#booking">Book visit</a>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(o => !o)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <div className="container py-4 flex flex-col gap-3">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium py-2">
                {l.label}
              </a>
            ))}
            <Button asChild className="rounded-full gradient-hero text-primary-foreground border-0">
              <a href="#booking" onClick={() => setOpen(false)}>Book visit</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
