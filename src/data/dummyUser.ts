export const DUMMY_USERS = [
  { 
    id: 'u1', 
    email: "admin@localhost.com", 
    password: "password", 
    name: "admin",
    role: "admin",
    isSubscriptionActive: true,
    subscriptionPlan: "individual",
    subscriptionExpiryDate: new Date("2024-12-31"),
  },
  {
    id: 'u2',
    email: "wildan@localhost.com",
    password: "password",
    name: "wildan",
    role: "user",
    isSubscriptionActive: false,
    subscriptionPlan: "individual",
    subscriptionExpiryDate: new Date("2024-12-31"),
  }
]