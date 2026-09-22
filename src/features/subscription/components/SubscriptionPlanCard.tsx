import { Check } from "lucide-react"

interface SubscriptionPlanCardProps {
  name: string
  price: string
  account: string
  features: string[]
  buttonLabel?: string
  termsText?: string
  onSubscribe?: () => void
  compact?: boolean
}

export default function SubscriptionPlanCard({
  name,
  price,
  account,
  features,
  buttonLabel = "Langganan",
  termsText = "Syarat dan Ketentuan Berlaku",
  onSubscribe,
  compact = false,
}: SubscriptionPlanCardProps) {
  return (
    <article className={`flex w-full flex-col rounded-xl bg-gradient-to-br from-[#5B7BF0] to-primary-main-200 text-white shadow-soft-card ${compact ? "min-h-[400px] px-6 py-6 lg:h-[400px] lg:max-w-[236px]" : "min-h-[372px] max-w-[313px] px-8 py-8"}`}>
      <span className={`w-fit rounded-full bg-background-extra font-700 ${compact ? "mb-8 px-5 py-2.5 text-sm" : "mb-9 px-6 py-3 text-xl"}`}>
        {name}
      </span>

      <div className={`${compact ? "mb-7 text-xs leading-6" : "mb-8 text-base leading-7"}`}>
        <p>{price}</p>
        <p>{account}</p>
      </div>

      <ul className={`${compact ? "mb-8 space-y-2.5 text-xs" : "mb-12 space-y-3 text-base"}`}>
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <Check className={`${compact ? "h-4 w-4" : "h-5 w-5"} shrink-0`} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className={`${compact ? "pt-7" : "pt-8"} mt-auto border-t border-white/20 text-center`}>
        <button
          type="button"
          onClick={onSubscribe}
          className={`mb-3 w-full rounded-full bg-white font-700 text-primary-main-300 transition hover:bg-white/90 cursor-pointer ${compact ? "px-4 py-2.5 text-xs" : "px-6 py-3 text-base"}`}
        >
          {buttonLabel}
        </button>
        <p className={`${compact ? "text-[10px]" : "text-sm"} text-white`}>{termsText}</p>
      </div>
    </article>
  )
}
