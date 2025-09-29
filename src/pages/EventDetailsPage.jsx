import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUserTie,
  FaBuilding,
  FaPhone,
  FaUsers,
} from "react-icons/fa";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import AppNavbar from "@/components/AppNavbar";

// In a real app, this data would be fetched from your API
const dummyEvents = [
  {
    id: 1,
    title: "Innovate & Create: The Annual Hackathon",
    description:
      "Join us for a 24-hour coding marathon. Build innovative solutions, compete for prizes, and network with top tech companies. This event is open to all students and will feature workshops, mentorship sessions, and a final presentation round. Food and beverages will be provided throughout the event.",
    photo:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop",
    date: "2024-09-15",
    time: "09:00 AM",
    location: "Main Auditorium",
    eventType: "hackathon",
    judges: "Dr. Eva Core, Mr. Ken Thompson, Ms. Grace Hopper",
    organizedBy: "Computer Science Dept.",
    organiserName: "Dr. Alan Turing",
    contact: "555-0101",
    views: 1250,
    status: "confirmed",
  },
  {
    id: 2,
    title: "AI & Machine Learning Workshop",
    description:
      "A hands-on workshop covering the fundamentals of AI and ML. Perfect for beginners and enthusiasts. Participants will learn about neural networks, data processing, and build their first predictive model. Laptops with required software pre-installed are recommended.",
    photo:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1720&auto=format&fit=crop",
    date: "2024-08-22",
    time: "10:00 AM - 04:00 PM",
    location: "Lab 404, Tech Park",
    eventType: "workshop",
    guest: "Ms. Ada Lovelace",
    organizedBy: "AI Club",
    organiserName: "Prof. John McCarthy",
    contact: "555-0102",
    views: 850,
    status: "confirmed",
  },
  {
    id: 3,
    title: "Spectrum '24: Annual Cultural Fest",
    description:
      "Experience a vibrant celebration of art, music, and dance. Featuring performances from renowned artists and student groups. The evening will conclude with a DJ night and a food festival with stalls from local vendors.",
    photo:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1674&auto=format&fit=crop",
    date: "2024-04-10",
    time: "06:00 PM onwards",
    location: "University Grounds",
    eventType: "cultural",
    guest: "The Local Train (Band)",
    organizedBy: "Student Council",
    organiserName: "Priya Sharma",
    contact: "555-0103",
    views: 2300,
    status: "past",
  },
  {
    id: 4,
    title: "Alumni & Student Meetup",
    description:
      "An evening to connect with our esteemed alumni. Share experiences, gain insights, and expand your professional network. This is a great opportunity for final year students to discuss career paths and opportunities.",
    photo:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1742&auto=format&fit=crop",
    date: "2024-07-30",
    time: "05:00 PM",
    location: "Conference Hall",
    eventType: "meetup",
    organizedBy: "Alumni Association",
    organiserName: "Mr. Raj Malhotra",
    contact: "555-0104",
    views: 450,
    status: "confirmed",
  },
  {
    id: 5,
    title: "Guest Lecture on Quantum Computing",
    description:
      "A deep dive into the future of computing with our esteemed guest.",
    photo:
      "https://images.unsplash.com/photo-1617854818583-09e7f077a156?q=80&w=1740&auto=format&fit=crop",
    date: "2024-10-05",
    time: "02:00 PM",
    location: "Physics Hall",
    eventType: "workshop",
    guest: "Dr. Harpreet Kaur",
    organizedBy: "School of Science & Technology",
    organiserName: "Dr. Mhashusudam Das",
    contact: "555-0105",
    views: 0,
    status: "pending",
  },
];

export default function EventDetailsPage() {
  const { id } = useParams();
  const event = dummyEvents.find((e) => e.id === parseInt(id));

  if (!event) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-3xl font-bold">Event Not Found</h1>
        <p className="text-muted-foreground mt-2">
          The event you are looking for does not exist.
        </p>
        <Button asChild className="mt-4">
          <Link to="/events">Back to Events</Link>
        </Button>
      </div>
    );
  }

  const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-start gap-3">
      <div className="text-primary mt-1">{icon}</div>
      <div>
        <p className="font-semibold text-sm">{label}</p>
        <p className="text-muted-foreground">{value}</p>
      </div>
    </div>
  );

  return (
    <>
      <AppNavbar />
      <main className="container mx-auto max-w-5xl py-8 px-4">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all events
        </Link>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <img
              src={event.photo}
              alt={event.title}
              className="w-full h-80 object-cover rounded-lg mb-6"
            />
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              {event.title}
            </h1>
            <Badge className="capitalize mb-6">{event.eventType}</Badge>
            <p className="text-lg text-muted-foreground">{event.description}</p>
          </div>
          <div className="space-y-6">
            <div className="p-6 bg-muted/50 rounded-lg space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">
                Event Details
              </h2>
              <DetailItem
                icon={<FaCalendarAlt />}
                label="Date"
                value={format(new Date(event.date), "PPP")}
              />
              <DetailItem icon={<FaClock />} label="Time" value={event.time} />
              <DetailItem
                icon={<FaMapMarkerAlt />}
                label="Location"
                value={event.location}
              />
              {(event.guest || event.judges) && (
                <DetailItem
                  icon={<FaUserTie />}
                  label={event.eventType === "hackathon" ? "Judges" : "Guests"}
                  value={event.guest || event.judges}
                />
              )}
            </div>
            <div className="p-6 bg-muted/50 rounded-lg space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">
                Organiser Info
              </h2>
              <DetailItem
                icon={<FaBuilding />}
                label="Organized By"
                value={event.organizedBy}
              />
              <DetailItem
                icon={<FaUserTie />}
                label="Organiser"
                value={event.organiserName}
              />
              <DetailItem
                icon={<FaPhone />}
                label="Contact"
                value={event.contact}
              />
              <DetailItem
                icon={<FaUsers />}
                label="Views"
                value={event.views.toLocaleString()}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
