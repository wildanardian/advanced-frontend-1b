import { useMemo, useState } from "react"
import { useNavigate, useSearchParams } from "react-router"

import SubscriptionPlanCard from "@/features/subscription/components/SubscriptionPlanCard";
import { subscriptionPlans } from "@/data/dummySubscriptionPlan";
import PaymentTimer from "./components/PaymentTimer";

const adminFee = 3000

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value)
}

export default function Payment() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [voucherCode, setVoucherCode] = useState("")
  const planId = searchParams.get("plan") ?? "individual"

  const selectedPlan = useMemo(() => {
    return subscriptionPlans.find((plan) => plan.id === planId) ?? subscriptionPlans[0]
  }, [planId])

  const totalPayment = selectedPlan.priceValue + adminFee

  return (
    <div className="min-h-screen bg-background-page-header px-4 pb-12 pt-8 text-white md:px-8 lg:px-20 lg:pb-20 lg:pt-16">
      <section className="mx-auto w-full max-w-[1140px]">
        <PaymentTimer
          initialSeconds={15*60}
          onComplete={() => {
            alert("Waktu pembayaran telah habis. Silakan coba lagi.")
            navigate("/subscription")
          }}
        >
          <PaymentTimer.Label>Lakukan Pembayaran Sebelum</PaymentTimer.Label>
          <PaymentTimer.Display></PaymentTimer.Display>
        </PaymentTimer>

        <h1 className="mb-8 text-2xl font-700 lg:text-[32px]">Ringkasan Pembayaran</h1>

        <div className="grid gap-8 lg:grid-cols-[236px_1fr] lg:gap-14">
          <SubscriptionPlanCard
            compact
            name={selectedPlan.name}
            price={selectedPlan.price}
            account={selectedPlan.account}
            features={selectedPlan.features}
          />

          <div>
            <h2 className="mb-3 text-sm font-700">Metode Pembayaran</h2>
            <div className="mb-5 grid gap-3 md:grid-cols-2">
              <label className="flex min-h-[40px] cursor-pointer items-center gap-2 rounded border border-outline-border px-3 text-sm text-white">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="h-4 w-4 accent-primary-main"
                />
                <span className="rounded bg-white px-1.5 py-0.5 text-[10px] font-900 text-primary-main-300">VISA</span>
                <span className="rounded bg-error-pressed px-1.5 py-0.5 text-[10px] font-900 text-white">MC</span>
                <span className="rounded bg-white px-1.5 py-0.5 text-[10px] font-900 text-primary-main">JCB</span>
                <span className="rounded bg-info-default px-1.5 py-0.5 text-[10px] font-900 text-white">AMEX</span>
                <span>Kartu Debit / Kredit</span>
              </label>

              <label className="flex min-h-[40px] cursor-pointer items-center gap-2 rounded border border-outline-border px-3 text-sm text-white">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "bca"}
                  onChange={() => setPaymentMethod("bca")}
                  className="h-4 w-4 accent-primary-main"
                />
                <span className="rounded-full bg-info-default px-2 py-0.5 text-[10px] font-900 text-white">BCA</span>
                <span>BCA Virtual Account</span>
              </label>
            </div>

            <h2 className="mb-3 text-sm font-700">Kode Voucher Jika ada</h2>
            <div className="mb-5 flex gap-3">
              <input
                type="text"
                value={voucherCode}
                onChange={(event) => setVoucherCode(event.target.value)}
                placeholder="Masukkan kode voucher"
                className="min-h-[40px] flex-1 rounded border border-outline-border bg-transparent px-3 text-sm text-white outline-none placeholder:text-light-secondary"
              />
              <button
                type="button"
                className="rounded-full bg-background-extra px-6 text-sm font-700 text-white transition hover:bg-gray-700"
              >
                Gunakan
              </button>
            </div>

            <h2 className="mb-4 text-sm font-700">Ringkasan Transaksi</h2>
            <dl className="mb-5 grid max-w-[440px] grid-cols-2 gap-y-3 text-sm">
              <dt className="text-light-secondary">Paket Premium {selectedPlan.name}</dt>
              <dd className="text-right">{formatRupiah(selectedPlan.priceValue)}</dd>
              <dt className="text-light-secondary">Biaya Admin</dt>
              <dd className="text-right">{formatRupiah(adminFee)}</dd>
              <dt className="text-light-secondary">Total Pembayaran</dt>
              <dd className="text-right font-700">{formatRupiah(totalPayment)}</dd>
            </dl>

            <button
              type="button"
              onClick={() => navigate(`/payment-process?plan=${selectedPlan.id}&method=${paymentMethod}`)}
              className="rounded-full bg-primary-main px-7 py-2.5 text-sm font-700 text-white transition hover:bg-primary-main-100"
            >
              Bayar
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
