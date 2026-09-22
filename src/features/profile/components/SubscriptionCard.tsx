import { Button } from "@/components/ui/Button";

import warningLogo from "@/assets/images/logo/warning.png";
import { useNavigate } from "react-router-dom";

interface SubscriptionCardProps {
  isActive: boolean;
  plan: 'individual' | 'berdua' | 'keluarga';
  expiryDate: Date;
}

export default function SubscriptionCard(props: SubscriptionCardProps) {
  const { isActive, plan, expiryDate } = props;

  const cardBackground = isActive ? 'bg-gradient-to-tl from-[#192DB7] to-[#5370D4]' : 'bg-background-extra'
  const navigate = useNavigate();

  return (
    <article className={`${cardBackground} p-6 rounded-xl`}>
      {isActive ? (
        <div className="flex flex-col gap-5">
          <div className="bg-light-secondary px-5 py-1.5 w-fit rounded-full">
            <span className="text-base text-primary-main font-bold">Aktif</span>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold mb-1">
              Akun Premium <span className="capitalize">{plan}</span>
              <span aria-hidden="true">✨</span>
            </h2>

            <p className="text-lg text-light-main">
              Saat ini kamu sedang menggunakan akses akun premium
            </p>
          </div>
          <p className="text-base text-light-secondary">
            Berlaku hingga <time dateTime={expiryDate.toISOString()}>
              {expiryDate.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-start gap-5">
            <img src={warningLogo} className="w-19.5" />
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-700">Saat ini anda belum berlangganan</h3>
              <span className="text-light-secondary">Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan Kamu!</span>
            </div>
          </div>
          <div className="flex items-center justify-end mt-4">
            <Button
              variant="body"
              size="body"
              onClick={() => {
                navigate('/subscription');
              }}>
              Mulai Berlangganan
            </Button>
          </div>
        </>
      )}
    </article>
  )
}