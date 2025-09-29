import React from "react";
import {
  FiSearch,
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiDollarSign,
  FiUsers,
  FiGlobe,
  FiBookmark,
  FiShare2,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { initialJobs as jobsSeed } from "@/data/jobs";
import AppNavbar from "@/components/AppNavbar";
import { toast } from "sonner";

// Helpers
function formatCurrency(amount) {
  if (amount == null) return "—";
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `₹ ${amount}`;
  }
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

function timeAgo(dateStr) {
  if (!dateStr) return "—";
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  const d = new Date(dateStr);
  const diffMs = d.getTime() - Date.now();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  if (Math.abs(diffDays) >= 1) return rtf.format(diffDays, "day");
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  if (Math.abs(diffHours) >= 1) return rtf.format(diffHours, "hour");
  const diffMinutes = Math.round(diffMs / (1000 * 60));
  return rtf.format(diffMinutes, "minute");
}

export default function JobsPage() {
  const [jobs, setJobs] = React.useState(jobsSeed);
  const [search, setSearch] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("All");
  const [modeFilter, setModeFilter] = React.useState("All");
  const [selectedJob, setSelectedJob] = React.useState(null);
  const [isPostOpen, setIsPostOpen] = React.useState(false);

  const filteredJobs = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesQuery =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.skills.join(" ").toLowerCase().includes(q);

      const matchesType = typeFilter === "All" || job.type === typeFilter;
      const matchesMode = modeFilter === "All" || job.mode === modeFilter;
      return matchesQuery && matchesType && matchesMode;
    });
  }, [jobs, search, typeFilter, modeFilter]);

  function handleOpenDetails(job) {
    setSelectedJob(job);
  }

  function handleCloseDetails() {
    setSelectedJob(null);
  }

  function handlePostJob(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const title = formData.get("title")?.toString().trim();
    const company = formData.get("company")?.toString().trim();
    const location = formData.get("location")?.toString().trim();
    const type = formData.get("type")?.toString();
    const mode = formData.get("mode")?.toString();
    const skillsCSV = formData.get("skills")?.toString().trim();
    const salaryMin = Number(formData.get("salaryMin"));
    const salaryMax = Number(formData.get("salaryMax"));
    const postedAt = formData.get("postedAt")?.toString();
    const deadline = formData.get("deadline")?.toString();
    const description = formData.get("description")?.toString().trim();

    // Basic required checks (HTML required attributes also present)
    if (
      !title ||
      !company ||
      !location ||
      !type ||
      !mode ||
      !skillsCSV ||
      !salaryMin ||
      !salaryMax ||
      !postedAt ||
      !deadline ||
      !description
    ) {
      // For UI-only demo, rely on browser validation; no extra toast here.
      toast.error("Field required");
      return;
    }

    const newJob = {
      id: String(Date.now()),
      title,
      company,
      location,
      type,
      mode,
      skills: skillsCSV
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      salaryMin,
      salaryMax,
      postedAt,
      deadline,
      applied: 0,
      description,
    };

    setJobs((prev) => [newJob, ...prev]);
    toast.success("Job post created");
    setIsPostOpen(false);
  }

  return (
    <>
      <AppNavbar />
      <main className="font-sans">
        <section className="bg-background">
          <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
            <header className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-balance text-2xl font-semibold text-foreground md:text-3xl">
                  Alumni Job Board
                </h1>
                <p className="text-muted-foreground">
                  Browse opportunities shared within your alumni network.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  className="bg-primary text-primary-foreground"
                  onClick={() => setIsPostOpen(true)}
                  aria-label="Post a new job"
                >
                  Post a Job
                </Button>
              </div>
            </header>

            {/* Filters */}
            <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="relative">
                <FiSearch
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search title, company, location, skills"
                  className="pl-10"
                  aria-label="Search jobs"
                />
              </div>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger aria-label="Filter by job type">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>

              <Select value={modeFilter} onValueChange={setModeFilter}>
                <SelectTrigger aria-label="Filter by work mode">
                  <SelectValue placeholder="Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Modes</SelectItem>
                  <SelectItem value="Onsite">Onsite</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Desktop Cards */}
            <div className="hidden md:block">
              <div className="grid grid-cols-1 gap-4">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onOpen={() => handleOpenDetails(job)}
                  />
                ))}
                {filteredJobs.length === 0 && (
                  <Card className="border p-6 text-center text-muted-foreground">
                    No jobs match your search.
                  </Card>
                )}
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden">
              <div className="grid grid-cols-1 gap-3">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onOpen={() => handleOpenDetails(job)}
                  />
                ))}
                {filteredJobs.length === 0 && (
                  <div className="text-center text-muted-foreground">
                    No jobs match your search.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Job Details Dialog */}
        <Dialog
          open={!!selectedJob}
          onOpenChange={(open) => !open && handleCloseDetails()}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-pretty">
                {selectedJob?.title}{" "}
                <span className="text-muted-foreground">
                  • {selectedJob?.company}
                </span>
              </DialogTitle>
              <DialogDescription className="sr-only">
                Job details
              </DialogDescription>
            </DialogHeader>

            {selectedJob && (
              <div className="grid gap-4">
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <InfoRow
                    icon={<FiBriefcase aria-hidden />}
                    label="Type"
                    value={selectedJob.type}
                  />
                  <InfoRow
                    icon={<FiGlobe aria-hidden />}
                    label="Mode"
                    value={selectedJob.mode}
                  />
                  <InfoRow
                    icon={<FiMapPin aria-hidden />}
                    label="Location"
                    value={selectedJob.location}
                  />
                  <InfoRow
                    icon={<FiDollarSign aria-hidden />}
                    label="Compensation"
                    value={`${formatCurrency(
                      selectedJob.salaryMin
                    )}–${formatCurrency(selectedJob.salaryMax)}`}
                  />
                  <InfoRow
                    icon={<FiClock aria-hidden />}
                    label="Posted"
                    value={`${timeAgo(selectedJob.postedAt)} (${formatDate(
                      selectedJob.postedAt
                    )})`}
                  />
                  <InfoRow
                    icon={<FiClock aria-hidden />}
                    label="Deadline"
                    value={formatDate(selectedJob.deadline)}
                  />
                  <InfoRow
                    icon={<FiUsers aria-hidden />}
                    label="Applied"
                    value={`${selectedJob.applied} candidates`}
                  />
                </div>

                <div>
                  <h4 className="mb-2 font-medium text-foreground">
                    Required Skills
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedJob.skills.map((s, i) => (
                      <Badge key={s + i} variant="outline">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-medium text-foreground">
                    Job Description
                  </h4>
                  <p className="text-pretty text-muted-foreground">
                    {selectedJob.description}
                  </p>
                </div>
              </div>
            )}

            <DialogFooter className="sm:justify-between">
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
              <Button className="bg-primary text-primary-foreground">
                Apply
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Post Job Dialog */}
        <Dialog open={isPostOpen} onOpenChange={setIsPostOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Post a Job</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Fill in all fields. This is a UI-only demo; submitting will add
                the job to the list locally.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handlePostJob} className="grid gap-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Job Title" name="title" required>
                  <Input
                    name="title"
                    required
                    placeholder="e.g., Frontend Engineer"
                  />
                </Field>
                <Field label="Company" name="company" required>
                  <Input name="company" required placeholder="e.g., NovaTech" />
                </Field>
                <Field label="Location" name="location" required>
                  <Input
                    name="location"
                    required
                    placeholder="e.g., Remote or City, Country"
                  />
                </Field>
                <Field label="Job Type" name="type" required>
                  <Select
                    name="type"
                    required
                    onValueChange={(v) =>
                      setTimeout(() => setNativeSelectValue("type", v))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* Hidden input to capture Select value for HTML form submit */}
                  <input type="hidden" name="type" id="hidden-type" required />
                </Field>
                <Field label="Work Mode" name="mode" required>
                  <Select
                    name="mode"
                    required
                    onValueChange={(v) =>
                      setTimeout(() => setNativeSelectValue("mode", v))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Onsite">Onsite</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="mode" id="hidden-mode" required />
                </Field>
                <Field label="Skills (comma-separated)" name="skills" required>
                  <Input
                    name="skills"
                    required
                    placeholder="e.g., React, Tailwind, Node.js"
                  />
                </Field>
                <Field label="Salary Min (USD)" name="salaryMin" required>
                  <Input
                    name="salaryMin"
                    type="number"
                    min="0"
                    required
                    placeholder="e.g., 90000"
                  />
                </Field>
                <Field label="Salary Max (USD)" name="salaryMax" required>
                  <Input
                    name="salaryMax"
                    type="number"
                    min="0"
                    required
                    placeholder="e.g., 120000"
                  />
                </Field>
                <Field label="Posted At" name="postedAt" required>
                  <Input name="postedAt" type="date" required />
                </Field>
                <Field label="Deadline" name="deadline" required>
                  <Input name="deadline" type="date" required />
                </Field>
              </div>

              <Field label="Job Description" name="description" required>
                <Textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="Describe the role, responsibilities, and qualifications..."
                />
              </Field>

              <DialogFooter className="sm:justify-between">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground"
                >
                  Post Job
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}

// Utility to bridge shadcn Select to HTML form submission via hidden inputs
function setNativeSelectValue(name, value) {
  const el = document.getElementById(`hidden-${name}`);
  if (el) el.value = value;
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-2">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-foreground">{value}</div>
      </div>
    </div>
  );
}

function Field({ label, name, children, required }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name} className="text-foreground">
        {label}{" "}
        {required && <span className="text-muted-foreground">(required)</span>}
      </Label>
      {children}
    </div>
  );
}

function JobCard({ job, onOpen }) {
  return (
    <Card
      className="border"
      role="button"
      aria-label={`Open details for ${job.title} at ${job.company}`}
      onClick={onOpen}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-pretty text-xl font-semibold text-foreground">
              {job.title}
            </h3>
            <p className="mt-0.5 text-muted-foreground">{job.company}</p>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              aria-label="Bookmark"
            >
              <FiBookmark className="h-4 w-4" aria-hidden />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              aria-label="Share"
            >
              <FiShare2 className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>

        {/* Badge Row */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <Badge variant="secondary" className="inline-flex items-center gap-1">
            <FiMapPin className="text-muted-foreground" aria-hidden />{" "}
            {job.location}
          </Badge>
          <Badge variant="secondary" className="inline-flex items-center gap-1">
            <FiDollarSign className="text-muted-foreground" aria-hidden />
            {formatCurrency(job.salaryMin)}–{formatCurrency(job.salaryMax)}
          </Badge>
          <Badge variant="secondary" className="inline-flex items-center gap-1">
            <FiBriefcase className="text-muted-foreground" aria-hidden />{" "}
            {job.type}
          </Badge>
          <Badge variant="outline" className="inline-flex items-center gap-1">
            <FiGlobe className="text-muted-foreground" aria-hidden /> {job.mode}
          </Badge>
        </div>

        {/* Description */}
        <p className="mt-3 text-pretty text-muted-foreground">
          {job.description}
        </p>

        {/* Skills */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {job.skills.map((s, i) => (
            <Badge
              key={s + i}
              className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {s}
            </Badge>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Posted {timeAgo(job.postedAt)} • {job.applied} applicants
          </div>
          <Button
            className="bg-primary text-primary-foreground"
            onClick={(e) => {
              toast.success("Applied for the job");
              e.stopPropagation(); // prevent opening details when clicking CTA
            }}
          >
            Apply Now
          </Button>
        </div>
      </div>
    </Card>
  );
}
