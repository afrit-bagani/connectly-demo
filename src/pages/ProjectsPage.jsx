"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FiExternalLink, FiUsers, FiPlus } from "react-icons/fi";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectDetailsDialog } from "@/components/projects/projects-details-dialog";
import { FundDialog } from "@/components/projects/fund-dialog";
import { CreateProjectForm } from "@/components/projects/create-project-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { initialProjects as projectsSeed } from "@/data/projects";
import AppNavbar from "@/components/AppNavbar";

// Mock profiles for skill matching
const sampleProfiles = [
  {
    id: "u1",
    name: "Maya Singh",
    skills: ["react", "node", "socket.io"],
    contact: { email: "maya@example.com" },
  },
  {
    id: "u2",
    name: "Arjun Patel",
    skills: ["python", "pytorch", "model-building"],
    contact: { email: "arjun@example.com", website: "https://arjun.dev" },
  },
  {
    id: "u3",
    name: "Li Wei",
    skills: ["pandas", "scikit-learn", "sql"],
    contact: { email: "li.wei@example.com" },
  },
  {
    id: "u4",
    name: "Sara Kim",
    skills: ["go", "security", "owasp"],
    contact: { email: "sara@example.com" },
  },
  {
    id: "u5",
    name: "Rohit Sharma",
    skills: ["react", "stripe", "postgres"],
    contact: { email: "rohit@example.com" },
  },
  {
    id: "u6",
    name: "Aisha Khan",
    skills: ["nextjs", "typescript", "tailwind"],
    contact: { email: "aisha@example.com" },
  },
];

// Simple skill matching: rank profiles by overlap count, return top N
function matchProfilesForProject(project, profiles, topN = 3) {
  const need = new Set(project.skills.map((s) => s.toLowerCase()));
  const scored = profiles
    .map((p) => {
      const overlap = p.skills.filter((s) => need.has(s.toLowerCase()));
      return { profile: p, score: overlap.length, overlap };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
  return scored;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState(projectsSeed);
  const [selected, setSelected] = useState(null);
  const [funding, setFunding] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);

  const donationEligible = useMemo(
    () => projects.filter((p) => p.needsFinancialSupport),
    [projects]
  );

  const handleCreate = (p) => {
    setProjects((prev) => [{ ...p, id: `p${prev.length + 1}` }, ...prev]);
    setCreateOpen(false);
  };

  return (
    <>
      <AppNavbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-pretty">
              Open Projects for Collaboration
            </h1>
            <p className="text-sm text-muted-foreground">
              Post your project, add required skills, and we’ll suggest
              contributors who match.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* <Button variant="secondary" className="gap-2">
              <FiUsers aria-hidden />
              <span className="sr-only">Contributors</span>
              Browse contributors
            </Button> */}
            <Button
              variant="default"
              className="gap-2"
              onClick={() => setCreateOpen(true)}
            >
              <FiPlus aria-hidden />
              Create project
            </Button>
          </div>
        </header>

        <section aria-labelledby="projects-heading" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2
              id="projects-heading"
              className="text-2xl font-semibold text-pretty"
            >
              All Projects
            </h2>
            <div className="text-xs text-muted-foreground">
              Donation-eligible: {donationEligible.length}
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((p) => {
              const matches = matchProfilesForProject(p, sampleProfiles);
              return (
                <ProjectCard
                  key={p.id}
                  project={p}
                  matches={matches}
                  onViewDetails={() => setSelected(p)}
                  onFund={() => setFunding(p)}
                />
              );
            })}
          </div>
        </section>

        <ProjectDetailsDialog
          project={selected}
          open={!!selected}
          onOpenChange={(o) => !o && setSelected(null)}
          getMatches={(project) =>
            matchProfilesForProject(project, sampleProfiles, 5)
          }
        />

        <FundDialog
          project={funding}
          open={!!funding}
          onOpenChange={(o) => !o && setFunding(null)}
        />

        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create a Project</DialogTitle>
              <DialogDescription>
                Share what you’re building and the skills you need.
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[70vh] overflow-y-auto pr-1">
              <CreateProjectForm onCreate={handleCreate} />
            </div>
          </DialogContent>
        </Dialog>

        <footer className="mt-10 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-2">
            <FiExternalLink aria-hidden />
            <span>
              Projects with financial support enabled are also shown on the
              Donations page.
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}
