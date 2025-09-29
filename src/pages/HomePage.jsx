import AppNavbar from "@/components/AppNavbar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { dummyEvents } from "@/data/events";
import { initialJobs } from "@/data/jobs";
import { alumniData } from "@/data/alumni";
import { successStories, announcements } from "@/data/updates";
import {
  Users,
  Briefcase,
  Calendar,
  Lightbulb,
  ArrowRight,
  MapPin,
  Building,
  Newspaper,
} from "lucide-react";

const isEventUpcoming = (eventDate) => {
  const today = new Date();
  const date = new Date(eventDate);
  // Set time to 0 to compare dates only
  today.setHours(0, 0, 0, 0);
  return date >= today;
};

export default function HomePage() {
  const latestEvents = dummyEvents
    .filter((e) => isEventUpcoming(e.date))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);
  const topJobs = initialJobs.slice(0, 3);
  const featuredAlumni = alumniData.slice(0, 4);
  const latestUpdates = [...successStories, ...announcements].slice(0, 4);

  const stats = [
    {
      label: "Total Alumni",
      value: alumniData.length,
      icon: Users,
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    },
    {
      label: "Active Jobs",
      value: initialJobs.length,
      icon: Briefcase,
      color:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    },
    {
      label: "Upcoming Events",
      value: dummyEvents.filter((e) => isEventUpcoming(e.date)).length,
      icon: Calendar,
      color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    },
    {
      label: "Success Stories",
      value: successStories.length,
      icon: Lightbulb,
      color:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    },
  ];

  return (
    <div className="bg-muted/40 min-h-screen">
      <AppNavbar />
      <main className="mx-auto max-w-7xl px-4 py-8 space-y-12">
        {/* Header and Stats */}
        <section className="space-y-6">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-pretty">
                Welcome to Connectly
              </h1>
              <p className="text-muted-foreground mt-1">
                Your centralized alumni network for events, jobs, mentorship,
                and more.
              </p>
            </div>
            <div className="hidden md:flex gap-2">
              <Button asChild variant="outline">
                <Link to="/updates">View Updates</Link>
              </Button>
              <Button asChild>
                <Link to="/alumni">
                  Find Alumni <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div
                    className={`flex items-center justify-center h-12 w-12 rounded-lg ${stat.color}`}
                  >
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section aria-labelledby="events-heading" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 id="events-heading" className="text-xl font-semibold">
              Upcoming Events
            </h2>
            <Button asChild variant="ghost">
              <Link to="/events">
                View all <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latestEvents.map((e) => (
              <Card
                key={e.id}
                className="hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <CardContent className="p-0">
                  <img
                    src={e.photo || "/placeholder.svg"}
                    alt={e.title}
                    className="rounded-t-lg h-40 w-full object-cover"
                  />
                </CardContent>
                <div className="p-4 flex flex-col flex-grow">
                  <CardTitle className="text-lg line-clamp-1">
                    {e.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1 flex-grow">
                    {e.description}
                  </p>
                  <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(e.date).toLocaleDateString()}
                    </span>
                    <Button asChild size="sm" variant="secondary">
                      <Link to={`/events/${e.id}`}>Details</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Alumni */}
        <section aria-labelledby="alumni-heading" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 id="alumni-heading" className="text-xl font-semibold">
              Featured Alumni
            </h2>
            <Button asChild variant="ghost">
              <Link to="/alumni">
                Browse all <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredAlumni.map((a) => (
              <Card
                key={a.id}
                className="overflow-hidden text-center transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={a.coverPhoto || "/placeholder.svg"}
                    alt={`${a.name}'s cover`}
                    className="h-20 w-full object-cover"
                  />
                  <img
                    src={a.profilePhoto || "/placeholder.svg"}
                    alt={a.name}
                    className="w-20 h-20 rounded-full border-4 border-background object-cover absolute -bottom-10 left-1/2 -translate-x-1/2"
                  />
                </div>
                <CardContent className="pt-12 pb-4 px-2">
                  <Link to={`/alumni/${a.id}`}>
                    <p className="font-semibold line-clamp-1 hover:text-primary">
                      {a.name}
                    </p>
                  </Link>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {a.position} @ {a.company}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Jobs and Updates */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hot Jobs */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 id="jobs-heading" className="text-xl font-semibold">
                Hot Jobs
              </h2>
              <Button asChild variant="ghost">
                <Link to="/jobs">
                  View all <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topJobs.map((job) => (
                <Card
                  key={job.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-1">
                      {job.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 pt-1">
                      <Building className="w-4 h-4" /> {job.company}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <p className="line-clamp-3 mb-4">{job.description}</p>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {job.location}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Updates */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 id="updates-heading" className="text-xl font-semibold">
                Latest Updates
              </h2>
              <Button asChild variant="ghost">
                <Link to="/updates">
                  More <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="space-y-4">
              {latestUpdates.map((u) => (
                <Card
                  key={u.id}
                  className="hover:shadow-lg transition-shadow p-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-muted p-2 rounded-full">
                      <Newspaper className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold line-clamp-2">{u.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(u.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
