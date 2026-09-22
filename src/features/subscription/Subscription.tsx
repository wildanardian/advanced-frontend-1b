import ContentGrid from "./components/ContentGrid";

import downloadIcon from "@/assets/icons/download.png";
import adsIcon from "@/assets/icons/advertisements-off.png";
import movieIcon from "@/assets/icons/movie-roll.png";
import video4kIcon from "@/assets/icons/video-4k-box.png";
import tabIcon from "@/assets/icons/tablet-cellphone.png";
import messageIcon from "@/assets/icons/message-reply-text.png";

import { subscriptionPlans } from "@/data/dummySubscriptionPlan";
import SubscriptionPlanCard from "./components/SubscriptionPlanCard";
import { useNavigate } from "react-router-dom";

export default function Subscription() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background-page-header px-4 pb-12 pt-8 text-white md:px-8 lg:px-20 lg:pb-20 lg:pt-12">
      <div className="p-5 gap-6 flex flex-col items-center justify-center lg:gap-16 lg:py-20">
        <h3 className="text-xl font-medium lg:text-[32px] lg:font-700">Kenapa Harus Berlangganan?</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:w-full lg:max-w-[1080px] lg:gap-x-[156px] lg:gap-y-[72px]">
          <ContentGrid image={downloadIcon} title="Download Konten Pilihan" />
          <ContentGrid image={adsIcon} title="Tidak Ada Iklan" />
          <ContentGrid image={movieIcon} title="Tonton Semua Konten" />
          <ContentGrid image={video4kIcon} title="Kualitas Maksimal Sampai Dengan 4K" />
          <ContentGrid image={tabIcon} title="Tonton di Tv, Tablet, Mobile, dan Laptop" />
          <ContentGrid image={messageIcon} title="Subtitle Untuk Konten Pilihan" />
        </div>
      </div>

      <section className="mx-[-16px] mt-10 bg-background-paper px-4 py-10 md:mx-[-32px] md:px-8 lg:mx-[-80px] lg:px-20 lg:py-12">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-2xl font-700 lg:text-[32px]">Pilih Paketmu</h2>
          <p className="text-base text-white">Temukan paket sesuai kebutuhanmu!</p>
        </div>

        <div className="grid justify-items-center gap-8 md:grid-cols-3 lg:mx-auto lg:max-w-[1130px] lg:gap-24">
          {subscriptionPlans.map((plan) => (
            <SubscriptionPlanCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              account={plan.account}
              features={plan.features}
              onSubscribe={() => navigate(`/payment?plan=${plan.id}`)}
            />
          ))}
        </div>
      </section>

    </div>
  )
}