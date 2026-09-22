import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { DUMMY_USERS } from "@/data/dummyUser";
import { useAppDispatch } from "@/slice/hooks";

import AuthCard from "@/components/ui/auth/AuthCard";
import AuthField from "@/components/ui/auth/AuthField";
import AuthButton from "@/components/ui/auth/AuthButton";
import useBodyBackground from "@/hooks/use-body-background";

import LogoNew from "@/assets/images/logo/logo-new.png";
import BackgroundLogin from "@/assets/images/background/bg-signin.jpg";
import GoogleIcon from "@/assets/icons/google.png";
import { login } from "@/slice/authSlice";

export default function Login() {
  useBodyBackground({ imageUrl: BackgroundLogin });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const found = DUMMY_USERS.find((u) => u.name === username && u.password === password);

    if (!found) {
      setError('Email atau kata sandi salah');
      return;
    }

    dispatch(login({
      id: found.id,
      email: found.email,
      name: found.name,
      password: found.password,
      isSubscriptionActive: found.isSubscriptionActive,
      subscriptionPlan: found.subscriptionPlan,
      subscriptionExpiryDate: found.subscriptionExpiryDate,
      role: found.role as "admin" | "user"
    }));
    navigate('/');
  }

  return (
    <div className="flex items-center justify-center min-h-screen mx-auto text-white">
      <AuthCard>
        <form onSubmit={handleSubmit}>
          <img
            src={LogoNew}
            alt="Logo"
            className="w-23.5 lg:w-40.75 mx-auto"
          />
          <div className="flex flex-col items-center gap-1 lg:gap-2">
            <h3 className="mt-6 text-lg font-bold lg:text-2xl">Masuk</h3>
            <p className="text-xs lg:text-base">Selamat datang kembali</p>
          </div>
          <AuthField
            className="mt-4"
            label="Username"
            type="text"
            placeholder="Masukkan username Anda"
            autoComplete="username"
            value={username}
            onChange={(value) => {
              setUsername(value);
              setError("");
            }}
          />
          <AuthField
            className="mt-4 mb-3"
            label="Kata Sandi"
            type="password"
            placeholder="Masukkan kata sandi"
            autoComplete="current-password"
            value={password}
            onChange={(value) => {
              setPassword(value);
              setError("");
            }}
          />
          {error ? (
            <p className="mb-3 text-xxs text-error-default lg:text-sm">{error}</p>
          ) : null}
          <div className="flex items-center justify-between mb-6">
            <span className="text-[#C1C2C4] text-xxs lg:text-base">Belum punya akun? <Link to="/register" className="text-xxs text-white lg:text-base hover:underline">Daftar</Link></span>
            <a href="#" className="text-xxs text-white lg:text-base hover:underline">Lupa kata sandi?</a>
          </div>
          <AuthButton type="submit" className="text-xxs">
            Masuk
          </AuthButton>
          <p className="w-full py-2 text-xxs text-center lg:text-base">Atau</p>
          <AuthButton iconSrc={GoogleIcon} iconAlt="Google Icon" className="text-xxs">
            Masuk dengan Google
          </AuthButton>
        </form>
      </AuthCard>
    </div>
  )
}
