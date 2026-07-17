import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

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
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          Email: email, 
          Password: password 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login gagal. Silahkan cek kredensial anda.");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat menghubungi server.");
    } finally {
      setIsLoading(false);
    }
  };

  // NEW: Handler for Google OAuth redirect
  const handleGoogleLogin = () => {
    // Adjust this URL to match your actual Go backend route for GoogleLoginHandler
    window.location.href = "http://localhost:8080/api/auth/google";
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
              {isLoading ? "Loading..." : "Login"}
            </button>

            <div className="my-3 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#e4d3b4]" />
              <span className="text-xs text-[#8a6a4a]">Or</span>
              <span className="h-px flex-1 bg-[#e4d3b4]" />
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#efe3c8] py-2.5 text-sm font-semibold text-[#4a2511] hover:bg-[#e8d8b4] transition-colors disabled:opacity-70"
            >
              <GoogleIcon />
              Continue With Google
            </button>

            <p className="mt-5 text-center text-sm text-[#5e4231]">
              Belum punya akun?{" "}
              <Link to="/register" className="font-semibold text-orange-600 hover:underline">
                Daftar di sini
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6-6C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.2-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.6 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l6-6C34.6 6.1 29.6 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z" />
      <path fill="#4CAF50" d="M24 44c5.5 0 10.4-1.8 14.3-5l-6.6-5.6C29.6 34.9 26.9 36 24 36c-5.3 0-9.6-3.1-11.3-7.6l-6.6 5.1C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.6 5.6C41.9 36.7 44 30.9 44 24c0-1.2-.1-2.4-.4-3.5z" />
    </svg>
  );
}