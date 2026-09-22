import { Link, useNavigate } from "react-router";
import { firebaseAuthRepository } from "@/services/auth/firebaseAuthRepository";

import AuthCard from "@/components/ui/auth/AuthCard";
import AuthField from "@/components/ui/auth/AuthField";
import AuthButton from "@/components/ui/auth/AuthButton";
import useBodyBackground from "@/hooks/use-body-background";

import LogoNew from "@/assets/images/logo/logo-new.png";
import BackgroundRegister from "@/assets/images/background/bg-signup.jpg";
import GoogleIcon from "@/assets/icons/google.png";
import { type FormEventHandler, useState } from "react";

type RegisterFormErrors = {
  name?: string;
  password?: string;
  confirmPassword?: string;
};

export default function Register() {
  useBodyBackground({ imageUrl: BackgroundRegister });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState<RegisterFormErrors>({});

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateForm = () => {
    const nextErrors: RegisterFormErrors = {};

    if (!name.trim()) {
      nextErrors.name = 'Username wajib diisi.';
    }

    if (!password.trim()) {
      nextErrors.password = 'Kata sandi wajib diisi.';
    }

    if (!confirmPassword.trim()) {
      nextErrors.confirmPassword = 'Konfirmasi kata sandi wajib diisi.';
    } else if (password.trim() && confirmPassword !== password) {
      nextErrors.confirmPassword = 'Konfirmasi kata sandi tidak sama.';
    }

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      await firebaseAuthRepository.register(name, password, confirmPassword);
      navigate('/login');
    } catch {
      setError('Registrasi gagal. Username mungkin sudah digunakan');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen mx-auto text-white">
      <AuthCard>
        <img
          src={LogoNew}
          alt="Logo"
          className="w-23.5 lg:w-40.75 mx-auto"
        />
        <div className="flex flex-col items-center gap-1 lg:gap-2">
          <h3 className="mt-6 text-lg font-bold lg:text-2xl">Daftar</h3>
          <p className="text-xs lg:text-base">Selamat Datang</p>
        </div>
        <form onSubmit={handleSubmit}>
          <AuthField
            className="mt-4"
            label="Username"
            type="text"
            placeholder="Masukkan username Anda"
            autoComplete="username"
            value={name}
            error={formErrors.name}
            onChange={(value) => {
              setName(value);
              setFormErrors((currentErrors) => ({ ...currentErrors, name: undefined }));
            }}
          />
          <AuthField
            className="mt-4 mb-3"
            label="Kata Sandi"
            type="password"
            placeholder="Masukkan kata sandi"
            autoComplete="password"
            value={password}
            error={formErrors.password}
            onChange={(value) => {
              setPassword(value);
              setFormErrors((currentErrors) => ({
                ...currentErrors,
                password: undefined,
                confirmPassword: currentErrors.confirmPassword === 'Konfirmasi kata sandi tidak sama.' ? undefined : currentErrors.confirmPassword,
              }));
            }}
          />
          <AuthField
            className="mt-4 mb-3"
            label="Konfirmasi Kata Sandi"
            type="password"
            placeholder="Konfirmasi kata sandi"
            autoComplete="confirm-password"
            value={confirmPassword}
            error={formErrors.confirmPassword}
            onChange={(value) => {
              setConfirmPassword(value);
              setFormErrors((currentErrors) => ({ ...currentErrors, confirmPassword: undefined }));
            }}
          />
          <div className="flex items-center justify-between mb-6">
            <span className="text-[#C1C2C4] text-xs lg:text-base">Sudah punya akun? <Link to="/login" className="text-xs text-white lg:text-base hover:underline">Masuk</Link></span>
          </div>
          <AuthButton type="submit" className="w-full mb-2">
            Daftar
          </AuthButton>
        </form>
        <p className="w-full py-2 text-xs text-center lg:text-base">Atau</p>
        <AuthButton iconSrc={GoogleIcon} iconAlt="Google Icon">
          Masuk dengan Google
        </AuthButton>
        <span className="text-red-500">{error}</span>
      </AuthCard>
    </div>
  )
}
