import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/auth.css';
import API_URL from '../lib/api';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Email dan password wajib diisi.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || data.message || "Login gagal. Silahkan cek kredensial anda.");
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.dispatchEvent(new Event("authChange"));
      }
      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat menghubungi server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/api/auth/google`;
  };

  return (
    <section className="login-page">
      <div className="login-page__inner">
        <div className="login-panel">
          <form className="login-card" onSubmit={handleSubmit} noValidate>
            <h1 className="text-2xl md:text-3xl font-bold text-[#4a2511]">Login</h1>
            <p className="mt-1 mb-5 text-sm md:text-base text-[#5e4231]">
              Silahkan masuk dengan akun anda!
            </p>
            {error ? (
              <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </div>
            ) : null}
            <label htmlFor="email" className="block text-sm font-semibold text-[#4a2511] mb-1">
              Email
            </label>
            <div className="relative mb-3">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <MailIcon />
              </span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                disabled={isLoading}
                className="w-full rounded-lg bg-gray-200/70 pl-9 pr-3 py-2.5 text-sm text-gray-700 placeholder-gray-500 outline-none focus:ring-2 focus:ring-orange-300 disabled:opacity-50"
              />
            </div>
            <label htmlFor="password" className="block text-sm font-semibold text-[#4a2511] mb-1">
              Password
            </label>
            <div className="relative mb-5">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <LockIcon />
              </span>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
                className="w-full rounded-lg bg-gray-200/70 pl-9 pr-3 py-2.5 text-sm text-gray-700 placeholder-gray-500 outline-none focus:ring-2 focus:ring-orange-300 disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-gradient-to-b from-orange-500 to-orange-700 py-2.5 text-sm font-bold text-white shadow-md hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Memproses..." : "Login"}
            </button>
            <div className="my-4 flex items-center gap-2">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-xs text-gray-400">atau</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full rounded-full border border-gray-300 bg-white py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <GoogleIcon />
              Masuk dengan Google
            </button>
            <p className="mt-5 text-center text-sm text-[#5e4231]">
              Belum punya akun?{" "}
              <Link to="/register" className="font-bold text-orange-600 hover:underline">
                Daftar sekarang
              </Link>
            </p>
          </form>
        </div>
        <div className="login-image-panel" />
      </div>
    </section>
  );
}

// ==========================================
// ICONS
// ==========================================
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
