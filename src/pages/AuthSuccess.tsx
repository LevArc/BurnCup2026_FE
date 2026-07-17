import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extract the token from the URL query string (e.g., ?token=...)
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      // 1. Save the token to localStorage
      localStorage.setItem("token", token);

      // 2. Redirect to the home page after a short delay for smooth UX
      const timer = setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      // If no token is found, send the user back to the login page
      const timer = setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [token, navigate]);

  return (
    <section className="flex h-screen w-screen flex-col items-center justify-center bg-[#fcf9f2]">
      {token ? (
        <div className="flex flex-col items-center justify-center py-10 text-center animate-pulse">
          <div className="mb-4 rounded-full bg-green-100 p-3">
            <CheckIcon />
          </div>
          <h2 className="text-xl font-bold text-[#4a2511] mb-2">Login Berhasil!</h2>
          <p className="text-sm text-[#5e4231]">
            Mengautentikasi dan mengalihkan ke beranda...
          </p>
          <div className="mt-6 h-8 w-8 animate-spin rounded-full border-4 border-[#e4d3b4] border-t-orange-500 mx-auto" />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Autentikasi Gagal</h2>
          <p className="text-sm text-[#5e4231]">
            Token tidak ditemukan. Mengalihkan kembali ke halaman login...
          </p>
        </div>
      )}
    </section>
  );
}

// ==========================================
// ICONS
// ==========================================
function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}