import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <main className="flex flex-col items-center justify-center gap-y-5 text-center">
        <h1 className="text-7xl font-bold text-gray-800 dark:text-gray-100 md:text-9xl">
          404
        </h1>
        <p className="text-xl font-medium text-gray-600 dark:text-gray-300 md:text-2xl">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/" // It's common to link to the root "/" for "Go Home"
          className="mt-4 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          Go Back Home
        </Link>
      </main>
    </div>
  );
}
