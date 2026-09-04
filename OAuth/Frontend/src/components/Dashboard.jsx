import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { getMe, logout } from "../services/service";
import Loading from "../components/Loading";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (error) {
        console.error("Failed to get user:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={42} className="text-gray-400" />
              )}
            </div>

            <div className="text-center sm:text-left">
              <p className="mb-2 flex items-center justify-center gap-2 text-sm font-medium text-indigo-600 sm:justify-start">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                Welcome back
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {user?.name}
                <span className="text-indigo-600"> !</span>
              </h2>

              <div className="mt-3 inline-flex items-center rounded-full bg-gray-50 px-4 py-2 ring-1 ring-gray-200">
                <svg
                  className="mr-2 h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>

                <span className="text-sm text-gray-600">
                  {user?.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;