"use client";

import AppNavbar from "@/components/AppNavbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import { FaLinkedin, FaTwitter, FaGithub, FaGlobe } from "react-icons/fa";

export default function ProfilePage() {
  const [views, setViews] = useState(234); // analytics demo
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [about, setAbout] = useState(
    "Alumnus passionate about building communities and developer tools."
  );
  const [education, setEducation] = useState([
    {
      id: "e1",
      school: "University of Excellence",
      degree: "B.Tech CSE",
      year: "2019",
    },
  ]);
  const [jobs, setJobs] = useState([
    {
      id: "j1",
      role: "Frontend Engineer",
      company: "NovaTech",
      years: "2021–Present",
    },
    { id: "j0", role: "Jr. Developer", company: "Acme", years: "2019–2021" },
  ]);
  const [skills, setSkills] = useState(["React", "Tailwind", "Accessibility"]);
  const [certs, setCerts] = useState(["AWS CCP", "Google UX"]);
  const [social, setSocial] = useState({
    linkedin: "https://linkedin.com",
    twitter: "",
    github: "https://github.com",
    website: "https://example.com",
  });

  const [newSkill, setNewSkill] = useState("");
  const [newCert, setNewCert] = useState("");

  function addSkill() {
    if (!newSkill.trim()) return;
    setSkills((s) => [...s, newSkill.trim()]);
    setNewSkill("");
  }
  function addCert() {
    if (!newCert.trim()) return;
    setCerts((c) => [...c, newCert.trim()]);
    setNewCert("");
  }

  return (
    <>
      <AppNavbar />
      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        <header className="flex items-center justify-between">
          <div className="bg-card border rounded-lg overflow-hidden w-full">
            {/* Cover and Profile Photo Section */}
            <div className="relative">
              <img
                src="/profile-photo/cover-pic/cover-2.jpg"
                alt="Your cover"
                className="w-full h-48 object-cover"
              />
              <div className="absolute -bottom-16 left-8">
                <img
                  src="/profile-photo/Aarav-Mehta.png"
                  alt="Your profile"
                  className="w-32 h-32 rounded-full border-4 border-background object-cover"
                />
              </div>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-4 right-4 bg-background/50 backdrop-blur-sm"
              >
                <Pencil className="w-4 h-4 mr-2" /> Edit Cover
              </Button>
            </div>

            {/* Details Section */}
            <div className="pt-20 px-8 pb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold">Aarav Mehta</h1>
                  <p className="text-lg text-muted-foreground">
                    {jobs[0].role} @ {jobs[0].company}
                  </p>
                  <p className="text-muted-foreground">Bengaluru, IN</p>
                </div>
                <Button variant="secondary">View Public Profile</Button>
              </div>
            </div>
          </div>
        </header>

        <Tabs defaultValue="about" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="experience">Jobs</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="certs">Certificates</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
                <CardDescription>
                  A brief description about yourself.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {isEditingAbout ? (
                  <>
                    <Textarea
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      rows={5}
                    />
                    <div className="flex gap-2">
                      <Button onClick={() => setIsEditingAbout(false)}>
                        Save
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setIsEditingAbout(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-muted-foreground">{about}</p>
                    <Button
                      variant="secondary"
                      className="w-fit"
                      onClick={() => setIsEditingAbout(true)}
                    >
                      <Pencil className="w-4 h-4 mr-2" /> Edit
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
                <CardDescription>Your academic background.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {education.map((ed) => (
                  <div
                    key={ed.id}
                    className="flex items-center gap-2 p-3 border rounded-md"
                  >
                    <div className="flex-grow">
                      <p className="font-semibold">{ed.school}</p>
                      <p className="text-sm text-muted-foreground">
                        {ed.degree}, {ed.year}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setEducation((prev) =>
                          prev.filter((item) => item.id !== ed.id)
                        )
                      }
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() =>
                    setEducation((prev) => [
                      {
                        id: crypto.randomUUID(),
                        school: "New University",
                        degree: "Degree",
                        year: "Year",
                      },
                      ...prev,
                    ])
                  }
                >
                  Add Education
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience">
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>Your professional history.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center gap-2 p-3 border rounded-md"
                  >
                    <div className="flex-grow">
                      <p className="font-semibold">{job.role}</p>
                      <p className="text-sm text-muted-foreground">
                        {job.company} &middot; {job.years}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setJobs((prev) =>
                          prev.filter((item) => item.id !== job.id)
                        )
                      }
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() =>
                    setJobs((prev) => [
                      {
                        id: crypto.randomUUID(),
                        role: "",
                        company: "",
                        years: "",
                      },
                      ...prev,
                    ])
                  }
                >
                  Add Job
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>
                  Showcase your professional skills.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="flex flex-wrap gap-2">
                  {skills.map((s, i) => (
                    <Badge key={s + i} variant="secondary">
                      {s}
                      <button
                        className="ml-2 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onClick={() =>
                          setSkills((prev) =>
                            prev.filter((_, idx) => idx !== i)
                          )
                        }
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                  />
                  <Button onClick={addSkill}>Add</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certs">
            <Card>
              <CardHeader>
                <CardTitle>Certificates</CardTitle>
                <CardDescription>
                  List your certifications and awards.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="flex flex-wrap gap-2">
                  {certs.map((c, i) => (
                    <Badge key={c + i} variant="secondary">
                      {c}
                      <button
                        className="ml-2 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onClick={() =>
                          setCerts((prev) => prev.filter((_, idx) => idx !== i))
                        }
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newCert}
                    onChange={(e) => setNewCert(e.target.value)}
                    placeholder="Add a certificate"
                  />
                  <Button onClick={addCert}>Add</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Social & Links</CardTitle>
                <CardDescription>
                  Add links to your website and social profiles.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {["linkedin", "twitter", "github", "website"].map((k) => (
                  <div className="relative" key={k}>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {k === "linkedin" && <FaLinkedin />}
                      {k === "twitter" && <FaTwitter />}
                      {k === "github" && <FaGithub />}
                      {k === "website" && <FaGlobe />}
                    </div>
                    <Input
                      className="pl-8"
                      value={social[k] || ""}
                      onChange={(e) =>
                        setSocial((s) => ({ ...s, [k]: e.target.value }))
                      }
                      placeholder={`https://...`}
                    />
                  </div>
                ))}
                <Button className="w-fit">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
