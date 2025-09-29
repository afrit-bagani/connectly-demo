"use client";

import AppNavbar from "@/components/AppNavbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { dummyEvents } from "@/data/events";
import { initialJobs } from "@/data/jobs";
import { initialProjects } from "@/data/projects";
import { alumniData } from "@/data/alumni";
import {
  LayoutDashboard,
  Briefcase,
  Calendar as CalendarIcon,
  Users,
  UserCheck,
  UserX,
  Heart,
  Check,
  X,
  UploadCloud,
} from "lucide-react";

export default function DashboardPage() {
  const [date, setDate] = useState(new Date());
  const [pendingEvents, setPendingEvents] = useState(
    dummyEvents.filter((e) => e.status === "pending")
  );
  const [pendingDonations, setPendingDonations] = useState([
    {
      id: "d1",
      title: "Library Renovation",
      by: "Alumni Fund",
      amount: "₹2,50,000",
    },
  ]);
  const [pendingUsers, setPendingUsers] = useState([
    {
      id: "u1",
      name: "John Doe",
      email: "john@example.com",
      status: "unverified",
    },
  ]);

  const stats = {
    projects: {
      label: "Projects",
      value: initialProjects.length,
      icon: Briefcase,
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    },
    jobs: {
      label: "Jobs",
      value: initialJobs.length,
      icon: Briefcase,
      color:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    },
    events: {
      label: "Events",
      value: dummyEvents.length,
      icon: CalendarIcon,
      color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    },
    alumni: {
      label: "Alumni",
      value: alumniData.length,
      icon: Users,
      color:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    },
    verified: {
      label: "Verified Users",
      value: 142,
      icon: UserCheck,
      color:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    },
    unverified: {
      label: "Pending Users",
      value: pendingUsers.length,
      icon: UserX,
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    },
  };

  const approveEvent = (id) => {
    setPendingEvents((prev) => prev.filter((e) => e.id !== id));
  };
  const rejectEvent = (id) => {
    setPendingEvents((prev) => prev.filter((e) => e.id !== id));
  };
  const approveDonation = (id) => {
    setPendingDonations((prev) => prev.filter((d) => d.id !== id));
  };
  const approveUser = (id) => {
    setPendingUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <>
      <AppNavbar />
      <main className="mx-auto max-w-7xl px-4 py-6 space-y-8">
        <header className="flex items-center gap-3">
          <LayoutDashboard className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Monitor activity, review approvals, and manage data.
            </p>
          </div>
        </header>

        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.values(stats).map((s) => (
            <Card key={s.label}>
              <CardContent className="p-4 flex items-center gap-4">
                <div
                  className={`flex items-center justify-center h-12 w-12 rounded-lg ${s.color}`}
                >
                  <s.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>
                  Review and act on pending requests from users.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Pending Events */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Events</h3>
                  <div className="space-y-3">
                    {pendingEvents.length === 0 && (
                      <p className="text-sm text-muted-foreground p-4 text-center bg-muted rounded-md">
                        No pending events.
                      </p>
                    )}
                    {pendingEvents.map((e) => (
                      <div
                        key={e.id}
                        className="flex items-center justify-between p-3 bg-background border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center h-10 w-10 rounded-md bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
                            <CalendarIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-semibold">{e.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(e.date).toLocaleDateString()} •{" "}
                              {e.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => rejectEvent(e.id)}
                            className="text-red-600 border-red-600/50 hover:bg-red-50 hover:text-red-700"
                          >
                            <X className="h-4 w-4 mr-1" /> Reject
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => approveEvent(e.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-1" /> Approve
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pending Donations */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Donations</h3>
                  <div className="space-y-3">
                    {pendingDonations.map((d) => (
                      <div
                        key={d.id}
                        className="flex items-center justify-between p-3 bg-background border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center h-10 w-10 rounded-md bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                            <Heart className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-semibold">{d.title}</p>
                            <p className="text-xs text-muted-foreground">
                              By {d.by} • {d.amount}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => approveDonation(d.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-1" /> Approve
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pending Users */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    User Verification
                  </h3>
                  <div className="space-y-3">
                    {pendingUsers.map((u) => (
                      <div
                        key={u.id}
                        className="flex items-center justify-between p-3 bg-background border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            <UserX className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-semibold">{u.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {u.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => approveUser(u.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <UserCheck className="h-4 w-4 mr-1" /> Verify
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Calendar</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upload Alumni Data</CardTitle>
                <CardDescription>
                  Bulk upload alumni information via a CSV file.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-4 border-2 border-dashed rounded-lg">
                  <UploadCloud className="h-8 w-8 text-muted-foreground" />
                  <div className="flex-1">
                    <Input type="file" accept=".csv" className="border-none" />
                  </div>
                </div>
                <Button disabled className="w-full">
                  Upload & Process (UI Only)
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}
