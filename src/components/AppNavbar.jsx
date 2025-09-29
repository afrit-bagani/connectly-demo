"use client";

import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu } from "lucide-react";

const navItems = [
  { to: "/home", label: "Home" },
  { to: "/events", label: "Events" },
  { to: "/alumni", label: "Alumni" },
  { to: "/jobs", label: "Jobs" },
  { to: "/projects", label: "Projects" },
  { to: "/donation", label: "Donations" },
  { to: "/messages", label: "Messages" },
  { to: "/profile", label: "Profile" },
  { to: "/dashboard", label: "Dashboard" },
];

export default function AppNavbar() {
  const [open, setOpen] = useState(false);

  const linkClass =
    "px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent hover:text-accent-foreground";
  const activeClass = "bg-primary text-primary-foreground hover:bg-primary/90";

  return (
    <header className="w-full border-b bg-background sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <Link to="/">
          <img src="/logo.png" alt="Connectly" className="h-12" />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link to="/signin">Sign in</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-accent"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t">
          <nav className="px-3 py-2 grid gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block ${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="flex gap-2 px-2 pt-2">
              <Button asChild variant="ghost" className="flex-1">
                <Link to="/signin" onClick={() => setOpen(false)}>
                  Sign in
                </Link>
              </Button>
              <Button asChild className="flex-1">
                <Link to="/signup" onClick={() => setOpen(false)}>
                  Sign up
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
