import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative text-center max-w-lg">
        {/* 404 */}
        <h1
          className="text-[120px] sm:text-[160px] leading-none font-black
                       bg-gradient-to-r from-white via-slate-400 to-slate-700
                       bg-clip-text text-transparent"
        >
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold mt-4">Page not found</h2>

        {/* Description */}
        <p className="text-slate-400 mt-4 leading-relaxed">
          Sorry, we couldn't find the page you're looking for. It may have been
          moved, deleted, or the URL might be incorrect.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
          <Link
            to="/"
            className="flex items-center justify-center gap-2
                       px-6 py-3 rounded-xl
                       bg-white text-black
                       font-semibold
                       hover:bg-slate-200
                       transition"
          >
            <Home size={18} />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2
                       px-6 py-3 rounded-xl
                       border border-white/10
                       bg-white/5
                       text-slate-300
                       font-semibold
                       hover:bg-white/10
                       hover:text-white
                       transition cursor-pointer"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Small footer */}
        <p className="text-xs text-slate-600 mt-10">Error code: 404</p>
      </div>
    </div>
  );
};

export default NotFound;
