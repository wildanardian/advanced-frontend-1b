export interface SubscriptionPlanItem {
  id: string
  name: string
  price: string
  priceValue: number
  account: string
  features: string[]
}

export const subscriptionPlans: SubscriptionPlanItem[] = [
  {
    id: "individual",
    name: "Individual",
    price: "Mulai dari Rp49,990/bulan",
    priceValue: 49000,
    account: "1 Akun",
    features: ["Tidak ada iklan", "Kualitas 720p", "Download konten pilihan"],
  },
  {
    id: "berdua",
    name: "Berdua",
    price: "Mulai dari Rp79,990/bulan",
    priceValue: 79000,
    account: "2 Akun",
    features: ["Tidak ada iklan", "Kualitas 1080p", "Download konten pilihan"],
  },
  {
    id: "keluarga",
    name: "Keluarga",
    price: "Mulai dari Rp159,990/bulan",
    priceValue: 159000,
    account: "5-7 Akun",
    features: ["Tidak ada iklan", "Kualitas 4K", "Download konten pilihan"],
  },
]
