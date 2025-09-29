import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Building,
  Calendar,
  Check,
  ChevronRight,
  Database,
  Facebook,
  FileQuestion,
  GraduationCap,
  Headset,
  HeartHandshake,
  Instagram,
  Linkedin,
  Mail,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Twitter,
  Users,
  X,
  Zap,
} from "lucide-react";

// --- App Component ---
export default function LandingPage() {
  // Effect to load Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.id = "google-fonts-link";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      <div className="font-sans bg-white">
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <ProblemSolutionSection />
          <BenefitsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
}

// --- Sub-Components ---

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Connectly Logo" className="h-12" />
            </Link>
          </div>
          <nav className="lg:flex items-center space-x-4">
            <Link
              to="/signin"
              className="text-primary px-4 py-2 rounded-md font-medium hover:bg-primary/10 transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 font-medium transition-colors"
            >
              Sign up
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

const HeroSection = () => (
  <section className="relative bg-slate-50 overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div className="absolute top-0 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
    </div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight font-serif">
              Connect Alumni, <span className="text-primary">Empower</span>{" "}
              Students
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
              Transform your educational institution with our comprehensive
              alumni management platform. Bridge the gap between graduates and
              current students through meaningful connections, mentorship, and
              opportunities.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-slate-800">
                Alumni Network
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-slate-800">
                Mentorship
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-slate-800">
                Event Management
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="/home"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transform hover:scale-105 transition-all duration-200 text-center shadow-lg"
            >
              Get Started Today
            </a>
            <a
              href="/home"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-slate-100 transition-colors duration-200 text-center border border-slate-200"
            >
              Explore Features
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-200">
            <img
              src="/landing-page/hero-image.png"
              alt="Working process at office."
              className="w-full h-auto rounded-xl shadow-lg"
            />
            <div className="absolute -top-6 -right-6 bg-primary text-white p-4 rounded-full shadow-lg">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-blue-500 text-white p-4 rounded-full shadow-lg">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section className="bg-white py-16 lg:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 font-serif">
          Powerful Features for{" "}
          <span className="text-primary">Modern Education</span>
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Our comprehensive platform provides everything you need to build and
          maintain strong alumni relationships while empowering current students
          with valuable connections.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Database className="w-6 h-6 text-white" />}
          title="Centralized Alumni Database"
          description="Store and manage comprehensive alumni profiles with contact information, academic records, and career updates in one secure, organized system."
          iconBg="bg-blue-500"
        />
        <FeatureCard
          icon={<HeartHandshake className="w-6 h-6 text-white" />}
          title="Mentorship Matching"
          description="Connect current students with alumni mentors based on career interests, academic background, and industry expertise for meaningful guidance."
          iconBg="bg-purple-500"
        />
        <FeatureCard
          icon={<Calendar className="w-6 h-6 text-white" />}
          title="Event Management"
          description="Organize and manage alumni events, reunions, and networking sessions with automated invitations and RSVP tracking."
          iconBg="bg-pink-500"
        />
        <FeatureCard
          icon={<MessageSquare className="w-6 h-6 text-white" />}
          title="Communication Hub"
          description="Facilitate seamless communication between alumni, students, and faculty through integrated messaging and notification systems."
          iconBg="bg-green-500"
        />
        <FeatureCard
          icon={<Briefcase className="w-6 h-6 text-white" />}
          title="Career Opportunities"
          description="Share internship and job opportunities from alumni companies, creating valuable career pathways for current students."
          iconBg="bg-orange-500"
        />
        <FeatureCard
          icon={<Sparkles className="w-6 h-6 text-white" />}
          title="Analytics & Insights"
          description="Track engagement metrics, alumni participation, and platform usage with comprehensive analytics and reporting tools."
          iconBg="bg-indigo-500"
        />
      </div>

      <div className="text-center mt-16">
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 lg:p-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 font-serif">
            Ready to Transform Your Alumni Network?
          </h3>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of educational institutions already using Connectly to
            strengthen their alumni relationships and empower their students.
          </p>
          <a
            href="/home"
            className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Explore All Features
          </a>
        </div>
      </div>
    </div>
  </section>
);

const FeatureCard = ({ icon, title, description, iconBg }) => (
  <div className="group p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
    <div
      className={`flex items-center justify-center w-16 h-16 ${iconBg} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
    >
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-slate-900 mb-4 font-serif">
      {title}
    </h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const ProblemSolutionSection = () => (
  <section className="bg-slate-100 py-16 lg:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium">
              <X className="w-4 h-4" />
              <span>The Challenge</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 font-serif">
              Alumni Networks Are <span className="text-red-600">Broken</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Most educational institutions struggle with scattered alumni data,
              informal communication channels, and missed opportunities for
              meaningful connections.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-red-200">
              <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <X color="red" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">
                  Scattered Alumni Data
                </h4>
                <p className="text-sm text-slate-500">
                  Contact information and career updates lost across multiple
                  platforms
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-red-200">
              <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <X color="red" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">
                  Informal Communication
                </h4>
                <p className="text-sm text-slate-500">
                  Limited to WhatsApp groups and outdated mailing lists
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-red-200">
              <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <X color="red" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">
                  Missed Opportunities
                </h4>
                <p className="text-sm text-slate-500">
                  Limited mentorship, internships, and networking possibilities
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              <Check className="w-4 h-4" />
              <span>Our Solution</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 font-serif">
              Connectly <span className="text-primary">Solves</span> This
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Our comprehensive platform provides a centralized, secure, and
              user-friendly solution for managing alumni relationships and
              fostering meaningful connections.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-green-200">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check color="green" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">
                  Centralized Database
                </h4>
                <p className="text-sm text-slate-500">
                  All alumni data organized and easily accessible in one secure
                  platform
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-green-200">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check color="green" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">
                  Professional Communication
                </h4>
                <p className="text-sm text-slate-500">
                  Integrated messaging and notification systems for effective
                  outreach
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-green-200">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check color="green" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">
                  Maximized Opportunities
                </h4>
                <p className="text-sm text-slate-500">
                  Enhanced mentorship matching and career opportunity sharing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 bg-white/60 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-slate-200">
        <div className="text-center mb-8">
          <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 font-serif">
            The Impact of Better Alumni Management
          </h3>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
              85%
            </div>
            <p className="text-sm text-slate-600">
              Increase in Alumni Engagement
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
              3x
            </div>
            <p className="text-sm text-slate-600">
              More Mentorship Connections
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
              70%
            </div>
            <p className="text-sm text-slate-600">Better Event Attendance</p>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
              60%
            </div>
            <p className="text-sm text-slate-600">More Career Opportunities</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const BenefitsSection = () => (
  <section className="bg-white py-16 lg:py-24 relative overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
    </div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 font-serif">
          Who Benefits from <span className="text-primary">Connectly?</span>
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Our platform creates value for every stakeholder in the educational
          ecosystem, fostering connections that drive success for all.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BenefitCard
          icon={<GraduationCap size={30} className="text-white" />}
          title="Alumni"
          benefits={[
            "Stay connected with alma mater and fellow graduates",
            "Mentor current students and give back",
            "Access exclusive networking events and opportunities",
            "Share career achievements and updates",
          ]}
          iconBg="from-primary to-blue-600"
          checkColor="text-primary"
        />
        <BenefitCard
          icon={<Users size={30} className="text-white" />}
          title="Current Students"
          benefits={[
            "Connect with alumni mentors in their field of interest",
            "Access internship and job opportunities",
            "Gain career guidance and industry insights",
            "Build professional networks early",
          ]}
          iconBg="from-purple-500 to-pink-500"
          checkColor="text-purple-500"
        />
        <BenefitCard
          icon={<Building size={30} className="text-white" />}
          title="Faculty & Administrators"
          benefits={[
            "Strengthen institutional relationships",
            "Enhance fundraising and development efforts",
            "Track alumni career progression and success",
            "Organize successful alumni events",
          ]}
          iconBg="from-orange-500 to-amber-500"
          checkColor="text-orange-500"
        />
        <BenefitCard
          icon={<Briefcase size={30} className="text-white" />}
          title="Employers & Recruiters"
          benefits={[
            "Access qualified candidates from top institutions",
            "Partner with alumni for talent acquisition",
            "Build relationships with educational institutions",
            "Create internship and collaboration opportunities",
          ]}
          iconBg="from-green-500 to-teal-500"
          checkColor="text-green-500"
        />
        <div className="group relative md:col-span-2 lg:col-span-1">
          <BenefitCard
            icon={<Building size={30} className="text-white" />}
            title="Institution Management"
            benefits={[
              "Increase institutional credibility and ranking",
              "Build stronger community connections",
              "Demonstrate student success and outcomes",
              "Enhance long-term institutional growth",
            ]}
            iconBg="from-indigo-500 to-purple-500"
            checkColor="text-indigo-500"
          />
        </div>
        <div className="md:col-span-2 lg:col-span-2">
          <div className="bg-gradient-to-r from-primary to-blue-600 p-8 rounded-2xl text-white h-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold font-serif">
                Success Stories Begin Here
              </h3>
              <img
                src="/landing-page/student.png"
                alt="Student smiling"
                className="w-24 h-24 rounded-full object-cover border-4 border-white/30"
              />
            </div>
            <p className="text-lg mb-6 leading-relaxed flex-grow">
              "Connectly transformed how our university manages alumni
              relationships. We've seen a 300% increase in mentor-student
              connections and our fundraising efforts have never been more
              successful."
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Dr. Sarah Johnson</p>
                <p className="text-white/90 text-sm">
                  Director of Alumni Relations, Tech University
                </p>
              </div>
              <a
                href="/home"
                className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const BenefitCard = ({ icon, title, benefits, iconBg, checkColor }) => (
  <div className="group relative">
    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full">
      <div
        className={`flex items-center justify-center w-20 h-20 bg-gradient-to-br ${iconBg} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-4 font-serif">
        {title}
      </h3>
      <ul className="space-y-3 text-slate-600">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start space-x-3">
            <Check className={`w-5 h-5 ${checkColor} mt-1 flex-shrink-0`} />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const CTASection = () => (
  <section className="bg-slate-100 py-16 lg:py-24 relative overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-300 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-300 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
    </div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight font-serif">
              Ready to Transform Your{" "}
              <span className="text-primary">Alumni Network?</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Join hundreds of educational institutions worldwide who are
              already using Connectly to build stronger alumni relationships,
              empower their students, and create lasting impact in their
              communities.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-slate-800 font-medium">
                Quick setup in under 30 minutes
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-slate-800 font-medium">
                Secure, GDPR-compliant data management
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <Headset className="w-4 h-4" />
              </div>
              <span className="text-slate-800 font-medium">
                24/7 dedicated support team
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="/home"
              className="group bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transform hover:scale-105 transition-all duration-200 text-center shadow-xl flex items-center justify-center space-x-2"
            >
              <span>Start Your Free Trial</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/home"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-slate-200 transition-colors duration-200 text-center border-2 border-primary flex items-center justify-center space-x-2"
            >
              <Headset className="w-4 h-4" />
              <span>Schedule a Demo</span>
            </a>
          </div>
          <div className="pt-8">
            <p className="text-sm text-slate-500 mb-4">
              Trusted by leading institutions
            </p>
            <div className="flex items-center space-x-8 opacity-60">
              <div className="text-sm font-medium text-slate-600">
                500+ Universities
              </div>
              <div className="text-sm font-medium text-slate-600">
                50+ Countries
              </div>
              <div className="text-sm font-medium text-slate-600">
                1M+ Alumni
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-[var(--light-border-color)]">
            <img
              src="/landing-page/network.png"
              alt="Business handshake"
              className="w-full h-auto rounded-xl"
            />
            <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-slate-200 transform -rotate-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-800">
                    Alumni Connected
                  </div>
                  <div className="text-lg font-bold text-primary">2,847</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-slate-200 transform rotate-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-800">
                    Mentorships
                  </div>
                  <div className="text-lg font-bold text-blue-500">1,234</div>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 -right-6 bg-white p-3 rounded-full shadow-lg border border-slate-200">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                <Check className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 animate-pulse">
            <div className="absolute top-8 right-8 w-32 h-32 bg-pink-200 rounded-full opacity-50"></div>
            <div className="absolute bottom-8 left-8 w-24 h-24 bg-blue-200 rounded-full opacity-50"></div>
          </div>
        </div>
      </div>
      <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
              99.9%
            </div>
            <p className="text-slate-600 font-medium">Platform Uptime</p>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
              &lt;24h
            </div>
            <p className="text-slate-600 font-medium">Implementation Time</p>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
              4.9/5
            </div>
            <p className="text-slate-600 font-medium">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 py-12 lg:py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <div className="lg:col-span-1 space-y-6">
          <div>
            <a href="/" className="inline-block">
              <img src="/logo.png" alt="Connectly Logo" className="h-20" />
            </a>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Transforming educational institutions through comprehensive alumni
            management and meaningful connections that empower students and
            strengthen communities.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors duration-200"
            >
              <Linkedin className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors duration-200"
            >
              <Twitter className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors duration-200"
            >
              <Facebook className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors duration-200"
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="/"
                className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
              >
                <ChevronRight className="w-4 h-4" />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
              >
                <ChevronRight className="w-4 h-4" />
                <span>About Us</span>
              </a>
            </li>
            <li>
              <a
                href="/home"
                className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
              >
                <ChevronRight className="w-4 h-4" />
                <span>Features</span>
              </a>
            </li>
            <li>
              <a
                href="/home"
                className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
              >
                <ChevronRight className="w-4 h-4" />
                <span>Contact Us</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-white">Portals</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="/alumni-portal"
                className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Alumni Portal</span>
              </a>
            </li>
            <li>
              <a
                href="/home"
                className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>Students Portal</span>
              </a>
            </li>
            <li>
              <a
                href="/events"
                className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Event Management</span>
              </a>
            </li>
            <li>
              <a
                href="/blog"
                className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Blog</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-white">Resources</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="/faq"
                className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
              >
                <FileQuestion className="w-4 h-4" />
                <span>FAQ</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Documentation</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
              >
                <Headset className="w-4 h-4" />
                <span>Support</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Privacy Policy</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-slate-800">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h3 className="text-xl font-semibold text-white">Stay Updated</h3>
          <p className="text-slate-400">
            Get the latest updates on alumni management trends and Connectly
            features.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-primary transition-colors duration-200"
            />
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <p className="text-slate-500 text-sm">
          &copy; 2025 Connectly. All rights reserved.
        </p>
        <div className="flex items-center space-x-6 text-sm text-slate-500">
          <a
            href="#"
            className="hover:text-white transition-colors duration-200"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors duration-200"
          >
            Cookie Policy
          </a>
        </div>
      </div>
    </div>
  </footer>
);
