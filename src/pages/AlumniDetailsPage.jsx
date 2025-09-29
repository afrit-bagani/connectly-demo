import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { alumniData, departments } from "@/data/alumni";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaInstagram,
  FaMapMarkerAlt,
  FaRegClock,
  FaUserPlus,
} from "react-icons/fa";
import { ArrowLeft, Briefcase, Calendar } from "lucide-react";
import AppNavbar from "@/components/AppNavbar";

export default function AlumniDetailsPage() {
  const { id } = useParams();
  const alumni = alumniData.find((a) => a.id === parseInt(id));
  const [connectionStatus, setConnectionStatus] = useState("idle");

  const handleConnect = () => {
    setConnectionStatus("pending");
    toast.success(`Connection request sent to ${alumni.name}`);
  };

  const handleWithdraw = () => {
    setConnectionStatus("idle");
    toast.success(`Connection request to ${alumni.name} withdrawn.`);
  };

  if (!alumni) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-3xl font-bold">Alumni Not Found</h1>
        <p className="text-muted-foreground mt-2">
          The alumni you are looking for does not exist.
        </p>
        <Button asChild className="mt-4">
          <Link to="/alumni">Back to Alumni Network</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <AppNavbar />
      <main className="container mx-auto max-w-4xl py-8 px-4">
        <Link
          to="/alumni"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Alumni Network
        </Link>

        <div className="bg-card border rounded-lg overflow-hidden">
          {/* Cover and Profile Photo Section */}
          <div className="relative">
            <img
              src={alumni.coverPhoto}
              alt={`${alumni.name}'s cover`}
              className="w-full h-48 object-cover"
            />
            <div className="absolute -bottom-16 left-8">
              <img
                src={alumni.profilePhoto}
                alt={alumni.name}
                className="w-32 h-32 rounded-full border-4 border-background object-cover"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">{alumni.name}</h1>
                <p className="text-lg text-muted-foreground flex items-center gap-2 mt-1">
                  <Briefcase className="w-5 h-5" />
                  {alumni.position} @ {alumni.company}
                </p>
                <p className="text-muted-foreground flex items-center gap-2 mt-1">
                  <FaMapMarkerAlt /> {alumni.location}
                </p>
                <div className="flex gap-2 mt-3">
                  <Badge variant="outline">Batch {alumni.batch}</Badge>
                  <Badge variant="outline">
                    {departments[alumni.department] || alumni.department}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                {connectionStatus === "pending" ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="secondary">
                        <div className="flex items-center gap-2">
                          <FaRegClock className="h-4 w-4" /> Pending
                        </div>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Invitation?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to withdraw your connection
                          request to {alumni.name}?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleWithdraw}>
                          Withdraw
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <Button onClick={handleConnect}>
                    <div className="flex items-center gap-2">
                      <FaUserPlus className="h-4 w-4" /> Connect
                    </div>
                  </Button>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                Social Profiles
              </h2>
              <div className="flex gap-4 text-muted-foreground">
                {alumni.social.linkedin && (
                  <a
                    href={alumni.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <FaLinkedin className="text-xl" /> LinkedIn
                  </a>
                )}
                {alumni.social.twitter && (
                  <a
                    href={alumni.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <FaTwitter className="text-xl" /> Twitter / X
                  </a>
                )}
                {alumni.social.github && (
                  <a
                    href={alumni.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <FaGithub className="text-xl" /> GitHub
                  </a>
                )}
                {alumni.social.instagram && (
                  <a
                    href={alumni.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <FaInstagram className="text-xl" /> Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
