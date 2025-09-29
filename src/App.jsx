import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

// Local import
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import JobsPage from "./pages/JobsPage";
import AlumniPage from "./pages/AlumniPage";
import UpdatesPage from "./pages/UpdatesPage";
import MessagePage from "./pages/MessagePage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import AlumniDetailsPage from "./pages/AlumniDetailsPage";
import DonationPage from "./pages/DonationPage";
import ProjectsPage from "./pages/ProjectsPage";
import DashboardPage from "./pages/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/events",
    element: <EventsPage />,
  },
  {
    path: "/events/:id",
    element: <EventDetailsPage />,
  },
  {
    path: "/alumni",
    element: <AlumniPage />,
  },
  {
    path: "/alumni/:id",
    element: <AlumniDetailsPage />,
  },
  {
    path: "/jobs",
    element: <JobsPage />,
  },
  {
    path: "/projects",
    element: <ProjectsPage />,
  },
  {
    path: "/donation",
    element: <DonationPage />,
  },
  {
    path: "/updates",
    element: <UpdatesPage />,
  },
  {
    path: "/messages",
    element: <MessagePage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors />
    </>
  );
}
