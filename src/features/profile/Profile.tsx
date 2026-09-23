import avatarIcon from "@/assets/images/avatar/avatar-icon.png";
import fileUploadIcon from "@/assets/icons/file-upload-outline.png";

import { Button } from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { type FormEventHandler, useState } from "react";
import { useAppSelector } from "@/slice/hooks";
import { Navigate } from "react-router-dom";
import { DUMMY_USERS } from "@/data/dummyUser";
import SubscriptionCard from "./components/SubscriptionCard";

export default function Profile() {
  const user = useAppSelector((state) => state.auth.user);
  // const profileUser = user
  //   ? (DUMMY_USERS.find(
  //     (dummyUser) =>
  //       dummyUser.id === user.id ||
  //       dummyUser.email === user.email ||
  //       dummyUser.name === user.name ||
  //       dummyUser.isSubscriptionActive === user.isSubscriptionActive ||
  //       dummyUser.subscriptionPlan === user.subscriptionPlan ||
  //       dummyUser.subscriptionExpiryDate === user.subscriptionExpiryDate,
  //   ) ?? user)
  //   : DUMMY_USERS[0];

  const profileUser = user
  ? (DUMMY_USERS.find(
      (dummyUser) => dummyUser.id === user.id || dummyUser.email === user.email,
    ) ?? user)
  : DUMMY_USERS[0];

  const [name, setName] = useState(profileUser?.name ?? "");
  const [email, setEmail] = useState(profileUser?.email ?? "");
  const [password, setPassword] = useState(profileUser?.password ?? "");

  if (!user) return <Navigate to="/login" replace={true} />;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { name, email, password });
  };

  return (
    <div className="min-h-screen bg-background-page-header px-4 pb-12 pt-8 text-white md:px-8 lg:px-20 lg:pb-20 lg:pt-12">
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 md:gap-20">
        <div className="order-2 md:order-1 flex flex-col gap-6 md:gap-8">
          <h1 className="text-2xl font-700 lg:text-[32px]">
            Profil Saya
          </h1>
          <div className="flex items-center gap-6">
            <img src={avatarIcon} className="w-20 lg:w-35" />
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="outline">
                Ubah Foto
              </Button>
              <div className="flex items-center justify-center gap-1">
                <img src={fileUploadIcon} />
                <span className="text-sm font-300">
                  Maksimal 2MB
                </span>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8"
          >
            <InputField
              label="Nama Pengguna"
              type="text"
              value={name}
              onSave={setName}
              editable={true}
            />
            <InputField
              label="Email"
              type="email"
              value={email}
              onSave={setEmail}
              editable={false}
            />
            <InputField
              label="Kata Sandi"
              type="password"
              value={password}
              onSave={setPassword}
              editable={true}
            />
            <div className="w-26.5">
              <Button variant="primary" size="lg" type="submit">
                Simpan
              </Button>
            </div>
          </form>
        </div>

        <div className="order-1 rounded-xl md:order-2">
          <SubscriptionCard
            isActive={profileUser?.isSubscriptionActive}
            plan={profileUser.subscriptionPlan as 'individual' | 'berdua' | 'keluarga'}
            expiryDate={profileUser?.subscriptionExpiryDate}
          />
          {/* <div className="flex items-start gap-5">
            <img src={warningLogo} className="w-19.5" />
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-700">Saat ini anda belum berlangganan</h3>
              <span className="text-light-secondary">Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan Kamu!</span>
            </div>
          </div>
          <div className="flex items-center justify-end mt-4">
            <Button variant="body" size="body">
              Mulai Berlangganan
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
