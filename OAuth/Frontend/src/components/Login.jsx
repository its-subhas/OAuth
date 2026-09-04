import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { login } from "../services/service";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await login({
        email,
        password,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);

    window.location.assign("http://localhost:3000/api/auth/google");
  };

  if (loading || googleLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center text-2xl font-bold">
            S
          </div>

          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>

          <p className="text-gray-500 mt-2">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
                         bg-gray-50 outline-none
                         focus:bg-white focus:border-black
                         focus:ring-2 focus:ring-black/10
                         transition"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-gray-600 hover:text-black"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 pr-12 border border-gray-300
                           rounded-xl bg-gray-50 outline-none
                           focus:bg-white focus:border-black
                           focus:ring-2 focus:ring-black/10
                           transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2
                           text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 accent-black cursor-pointer"
            />

            <label
              htmlFor="remember"
              className="text-sm text-gray-500 cursor-pointer"
            >
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full bg-black text-white py-3.5 rounded-xl
                       font-semibold
                       hover:bg-gray-800
                       disabled:opacity-60
                       disabled:cursor-not-allowed
                       active:scale-[0.99]
                       transition cursor-pointer"
          >
            Login
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
          className="w-full flex items-center justify-center gap-3
                     border border-gray-300
                     py-3.5 rounded-xl
                     font-semibold text-gray-700
                     hover:bg-gray-50
                     hover:border-gray-400
                     disabled:opacity-60
                     disabled:cursor-not-allowed
                     transition cursor-pointer"
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
              d="M12 6.14c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.25 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.7 5.39l3.24 2.53C7.31 7.86 9.46 6.14 12 6.14Z"
            />
          </svg>

          {googleLoading ? "Connecting to Google..." : "Continue with Google"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-7">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-black hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
