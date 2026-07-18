import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../../components/admin/AdminDashboard";

export default function AdminPage() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    // Hit any admin endpoint to check if user is admin
    // If BE returns 403, user is not admin
    fetch("http://localhost:8080/api/admin/basic-info", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      if (res.status === 403 || res.status === 401) {
        setAuthorized(false);
      } else {
        setAuthorized(true);
      }
    }).catch(() => setAuthorized(false));
  }, [navigate]);

  if (authorized === null) {
    return (
      <div className="min-h-screen bg-[#f4efe5] flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#e4d3b4] border-t-orange-500" />
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#f4efe5] flex flex-col items-center justify-center gap-4 font-sans text-[#3c2f25]">
        <div className="bg-red-100 border-4 border-red-400 rounded-lg shadow-[6px_6px_0px_#4a3f35] p-8 text-center max-w-sm">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
          <p className="text-sm text-gray-600 mb-4">
            Kamu tidak memiliki akses ke halaman admin.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#4A2E1A] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#6B4423] transition-colors"
          >
            Kembali ke Home
          </button>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}
