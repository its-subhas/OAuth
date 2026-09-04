import { useState } from "react";
import { register } from "../services/service";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await register({
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    setGoogleLoading(true);

    window.location.assign("http://localhost:3000/api/auth/google");
  };

  if (loading || googleLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create an account
          </h1>

          <p className="text-gray-500 mt-2">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         outline-none focus:border-black focus:ring-1
                         focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         outline-none focus:border-black focus:ring-1
                         focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         outline-none focus:border-black focus:ring-1
                         focus:ring-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full bg-black text-white py-3 rounded-lg
                       font-semibold hover:bg-gray-800 transition
                       cursor-pointer disabled:opacity-50
                       disabled:cursor-not-allowed"
          >
            Create Account
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-300" />

          <span className="text-sm text-gray-400">OR</span>

          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={loading || googleLoading}
          className="w-full flex items-center justify-center gap-3
                     border border-gray-300
                     py-3.5 rounded-xl
                     font-semibold text-gray-700
                     hover:bg-gray-50
                     hover:border-gray-400
                     transition
                     cursor-pointer
                     disabled:opacity-50
                     disabled:cursor-not-allowed"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M21.35 12.27c0-.78-.07-1.54-.2-2.27H12v4.3h5.23a4.47 4.47 0 0 1-1.94 2.93v2.45h3.14c1.84-1.7 2.92-4.2 2.92-7.41Z"
            />

            <path
              fill="#34A853"
              d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.75 9.75 0 0 0 12 21.75Z"
            />

            <path
              fill="#FBBC05"
              d="M6.54 13.83A5.86 5.86 0 0 1 6.23 12c0-.64.11-1.26.31-1.83V7.64H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.36l3.24-2.53Z"
            />

            <path
              fill="#EA4335"
              d="M12 6.14c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.25 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.7 5.39l3.24 2.53c.77-2.31 2.92-4.03 5.46-4.03Z"
            />
          </svg>
          Sign up with Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-black font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
