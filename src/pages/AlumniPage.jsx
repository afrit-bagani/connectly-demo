import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { alumniData, departments, batches } from "@/data/alumni";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
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
  FaSearch,
  FaUserPlus,
  FaRegClock,
} from "react-icons/fa";
import { Briefcase, Users, X } from "lucide-react";
import AppNavbar from "@/components/AppNavbar";

const AlumniCard = ({ alumni }) => {
  const [connectionStatus, setConnectionStatus] = useState("idle"); // 'idle' | 'pending'

  const handleConnect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setConnectionStatus("pending");
    toast.success(`Connection request sent to ${alumni.name}`);
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setConnectionStatus("idle");
    toast.success(`Connection request to ${alumni.name} withdrawn.`);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col pt-0">
      <Link to={`/alumni/${alumni.id}`} className="flex flex-col flex-grow">
        <div className="relative">
          <img
            src={alumni.coverPhoto}
            alt={`${alumni.name}'s cover`}
            className="w-full h-24 object-cover"
          />
          <div className="absolute top-2 right-2 flex gap-1">
            <Badge
              variant="secondary"
              className="backdrop-blur-sm bg-pink-100 text-pink-800 border-pink-800 dark:bg-pink-900 dark:text-pink-200"
            >
              Batch {alumni.batch}
            </Badge>
            <Badge
              variant="secondary"
              className="backdrop-blur-sm bg-green-100 text-green-800 border-green-800 dark:bg-green-900 dark:text-green-200"
            >
              {departments[alumni.department] || alumni.department}
            </Badge>
          </div>
        </div>
        <CardContent className="pt-14 px-4 pb-2 flex-grow flex flex-col items-center text-center relative">
          <img
            src={alumni.profilePhoto}
            alt={alumni.name}
            className="w-24 h-24 rounded-full border-4 border-background object-cover absolute -top-12 left-1/2 -translate-x-1/2"
          />

          <h3 className="text-xl font-bold hover:text-primary">
            {alumni.name}
          </h3>

          <p className="text-muted-foreground text-sm flex items-center justify-center gap-2 mt-1">
            <Briefcase className="w-4 h-4" />
            {alumni.position} @ {alumni.company}
          </p>
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-2 mt-2">
            <FaMapMarkerAlt /> {alumni.location}
          </p>
          <div className="flex gap-3 text-muted-foreground mt-4">
            {alumni.social.linkedin && (
              <a
                href={alumni.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(alumni.social.linkedin, "_blank");
                }}
                className="hover:text-primary text-lg"
              >
                <FaLinkedin />
              </a>
            )}
            {alumni.social.twitter && (
              <a
                href={alumni.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(alumni.social.twitter, "_blank");
                }}
                className="hover:text-primary text-lg"
              >
                <FaTwitter />
              </a>
            )}
            {alumni.social.github && (
              <a
                href={alumni.social.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(alumni.social.github, "_blank");
                }}
                className="hover:text-primary text-lg"
              >
                <FaGithub />
              </a>
            )}
            {alumni.social.instagram && (
              <a
                href={alumni.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(alumni.social.instagram, "_blank");
                }}
                className="hover:text-primary text-lg"
              >
                <FaInstagram />
              </a>
            )}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-2">
        {connectionStatus === "pending" ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="secondary"
                className="w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2">
                  <FaRegClock className="h-4 w-4" /> Pending
                </div>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel Invitation?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to withdraw your connection request to{" "}
                  {alumni.name}?
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
          <Button className="w-full" onClick={handleConnect}>
            <div className="flex items-center gap-2">
              <FaUserPlus className="h-4 w-4" /> Connect
            </div>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const BatchSearchDialog = ({ onFilterChange }) => {
  const [step, setStep] = useState(1);
  const [selectedDept, setSelectedDept] = useState(null);

  const handleDeptSelect = (dept) => {
    setSelectedDept(dept);
    setStep(2);
  };

  const handleYearSelect = (year) => {
    onFilterChange({ department: selectedDept, batch: year });
  };

  const reset = () => {
    setStep(1);
    setSelectedDept(null);
  };

  return (
    <Dialog onOpenChange={(open) => !open && reset()}>
      <DialogTrigger asChild>
        <Button variant="outline">Search Batch Wise</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {step === 1
              ? "Select Department"
              : `Select Batch for ${selectedDept}`}
          </DialogTitle>
          <DialogDescription>
            {step === 1
              ? "Choose a department to see available batches."
              : "Choose a batch year to filter alumni."}
          </DialogDescription>
        </DialogHeader>
        {step === 1 && (
          <div className="grid grid-cols-2 gap-4 py-4">
            {Object.keys(departments).map((dept) => (
              <Button
                key={dept}
                variant="outline"
                onClick={() => handleDeptSelect(dept)}
              >
                {dept}
              </Button>
            ))}
          </div>
        )}
        {step === 2 && (
          <div className="py-4">
            <Button onClick={reset} variant="ghost" size="sm" className="mb-4">
              &larr; Back to Departments
            </Button>
            <div className="grid grid-cols-3 gap-4">
              {batches.map((year) => (
                <DialogTrigger asChild key={year}>
                  <Button
                    variant="outline"
                    onClick={() => handleYearSelect(year)}
                  >
                    Batch {year}
                  </Button>
                </DialogTrigger>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default function AlumniPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ department: null, batch: null });

  const filteredAlumni = useMemo(() => {
    return alumniData.filter((alumni) => {
      const nameMatch = alumni.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const departmentMatch =
        !filters.department || alumni.department === filters.department;
      const batchMatch = !filters.batch || alumni.batch === filters.batch;
      return nameMatch && departmentMatch && batchMatch;
    });
  }, [searchTerm, filters]);

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({ department: null, batch: null });
  };

  const hasFilters = filters.department || filters.batch || searchTerm;

  return (
    <>
      <AppNavbar />
      <main className="container mx-auto max-w-7xl px-4 py-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">
              Alumni Network
            </h1>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <BatchSearchDialog onFilterChange={setFilters} />
          </div>
        </div>

        {hasFilters && (
          <div className="mb-6 flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Active filters:</p>
            {searchTerm && (
              <Badge variant="secondary">Name: "{searchTerm}"</Badge>
            )}
            {filters.department && (
              <Badge variant="secondary">Dept: {filters.department}</Badge>
            )}
            {filters.batch && (
              <Badge variant="secondary">Batch: {filters.batch}</Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={clearFilters}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {filteredAlumni.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAlumni.map((alumni) => (
              <AlumniCard key={alumni.id} alumni={alumni} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold">No Alumni Found</h2>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search or filters.
            </p>
            <Button onClick={clearFilters} className="mt-4">
              Clear All Filters
            </Button>
          </div>
        )}
      </main>
    </>
  );
}
