import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { CalendarIcon, Share2, Check, X } from "lucide-react";
import { format } from "date-fns";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUserTie,
  FaUsers,
  FaBuilding,
  FaPhone,
} from "react-icons/fa";
import { MdEvent, MdSearch, MdOutlinePendingActions } from "react-icons/md";
import { dummyEvents } from "@/data/events";
import AppNavbar from "@/components/AppNavbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- Dummy Data for Form ---
const faculties = [
  { value: "dr-mhashusudam-das", label: "Dr. Mhashusudam Das" },
  { value: "bilas-halder", label: "Bilas Halder" },
  { value: "dr-harpreet-kaur", label: "Dr. Harpreet Kaur" },
  { value: "prof-jaswinder-singh", label: "Prof. Jaswinder Singh" },
];

const schools = [
  "School of Science & Technology",
  "School of Agriculture",
  "School of Pharmacy",
  "School of Hotel Management",
  "School of Marine Studies",
];

const eventTypes = ["hackathon", "workshop", "cultural", "meetup"];

const isEventPast = (eventDate) => {
  const today = new Date();
  const date = new Date(eventDate);
  // Set time to 0 to compare dates only
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date < today;
};

const EventCard = ({ event }) => {
  const isPast = isEventPast(event.date) || event.status === "past";

  const eventTypeColors = {
    hackathon: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    workshop:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    cultural: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    meetup: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col">
      <CardHeader className="p-0 relative">
        <img
          src={event.photo || "/profile-photo/cover-pic/cover-1.jpg"}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge
            className={`${
              eventTypeColors[event.eventType]
            } border-none capitalize`}
          >
            {event.eventType}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          {isPast && <Badge variant="destructive">Past</Badge>}
          {event.status === "pending" && (
            <Badge variant="secondary" className="border-amber-500/50 border">
              <MdOutlinePendingActions className="mr-1" /> Pending
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <CardTitle className="text-xl mb-2 line-clamp-2">
          {event.title}
        </CardTitle>
        <div className="space-y-2 text-sm text-muted-foreground flex-grow">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-primary w-4 h-4" />
            <span>
              {format(new Date(event.date), "PPP")} at {event.time}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary w-4 h-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBuilding className="text-primary w-4 h-4" />
            <span>{event.organizedBy}</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-4">
          <p className="font-semibold">{event.organiserName}</p>
          <p className="flex items-center gap-1">
            <FaPhone className="w-3 h-3" /> {event.contact}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-2 flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => toast("Sharing event: " + event.title)}
            aria-label="Share event"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        <Button asChild>
          <Link to={`/events/${event.id}`}>Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const CreateEventDialog = ({ onEventCreate }) => {
  const [eventType, setEventType] = useState("");
  const [photoSource, setPhotoSource] = useState("upload");
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Manually add state-managed values
    data.date = date ? format(date, "yyyy-MM-dd") : "";

    console.log("Form Submitted:", data);
    onEventCreate(data); // Pass data to parent
    setOpen(false); // Close dialog
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Event</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a New Event</DialogTitle>
          <DialogDescription>
            Fill in the details below to create and share your event.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Annual Tech Fest"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="eventType">Event Type</Label>
              <Select name="eventType" onValueChange={setEventType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select an event type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Provide a detailed description..."
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" name="time" type="time" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g., Main Auditorium"
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Event Photo</Label>
            <RadioGroup
              defaultValue="upload"
              value={photoSource}
              onValueChange={setPhotoSource}
              className="flex items-center gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upload" id="r-upload" />
                <Label htmlFor="r-upload">Upload</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="url" id="r-url" />
                <Label htmlFor="r-url">URL</Label>
              </div>
            </RadioGroup>
            {photoSource === "url" ? (
              <Input
                id="photo"
                name="photo"
                placeholder="https://example.com/image.jpg"
                type="url"
              />
            ) : (
              <Input id="photoFile" name="photoFile" type="file" />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Organized By</Label>
              <Select name="organizedBy" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a school/department" />
                </SelectTrigger>
                <SelectContent>
                  {schools.map((school) => (
                    <SelectItem key={school} value={school}>
                      {school}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="organiserName">Organiser Name</Label>
              <Input
                id="organiserName"
                name="organiserName"
                placeholder="e.g., Dr. Jane Doe"
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="contact">Organiser Contact</Label>
            <Input
              id="contact"
              name="contact"
              placeholder="e.g., 555-1234"
              required
            />
          </div>

          {eventType === "hackathon" && (
            <div className="grid gap-2">
              <Label htmlFor="judges">Judges</Label>
              <Textarea
                id="judges"
                name="judges"
                placeholder="Enter judge names, separated by commas"
              />
            </div>
          )}
          {(eventType === "workshop" || eventType === "cultural") && (
            <div className="grid gap-2">
              <Label htmlFor="guest">Guests</Label>
              <Textarea
                id="guest"
                name="guest"
                placeholder="Enter guest names, separated by commas"
              />
            </div>
          )}

          <DialogFooter>
            <Button type="submit">Create Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("upcoming"); // 'upcoming', 'past', 'all'
  const [events, setEvents] = useState(dummyEvents);

  // In a real app, you'd have logic to check the user's role
  const userRole = "faculty"; // or 'student', 'institute', 'admin'
  const canPostEvent =
    userRole === "faculty" || userRole === "admin" || userRole === "institute";

  const handleEventCreate = (newEventData) => {
    const newEvent = {
      id: events.length + 1,
      views: 0,
      status: "pending",
      contact: "123-456-7890", // Placeholder
      ...newEventData,
    };
    setEvents((prevEvents) => [newEvent, ...prevEvents]);
    toast.success("Event created and is waiting for confirmation!");
  };

  const filteredAndSortedEvents = events
    .filter((event) => {
      const searchMatch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());

      if (!searchMatch) return false;

      const isPast = isEventPast(event.date);
      if (filter === "upcoming") return !isPast;
      if (filter === "past") return isPast;
      return true; // 'all'
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by most recent first

  return (
    <>
      <AppNavbar />
      <main className="container mx-auto max-w-7xl px-4 py-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <MdEvent className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">
              Events & Workshops
            </h1>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {canPostEvent && (
              <CreateEventDialog onEventCreate={handleEventCreate} />
            )}
          </div>
        </div>
        <Tabs value={filter} onValueChange={setFilter} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="all">All Events</TabsTrigger>
          </TabsList>
          <TabsContent value={filter} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
