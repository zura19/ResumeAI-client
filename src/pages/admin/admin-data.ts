// Mock data based on the Prisma schema for the admin dashboard
// import type { UserFull } from "@/lib/types/User";

// export type Payment = {
//   id: string;
//   stripeSubscriptionId: string;
//   invoice: string;
//   amount: number;
//   currency: string;
//   status:
//     | "REQUIRES_PAYMENT_METHOD"
//     | "REQUIRES_CONFIRMATION"
//     | "PROCESSING"
//     | "SUCCEEDED"
//     | "FAILED";
//   userId: string;
//   userName: string;
//   createdAt: string;
// };

// export type Subscription = {
//   id: string
//   stripeSubscriptionId: string | null
//   status: "ACTIVE" | "TRIALING" | "PAST_DUE" | "UNPAID" | "CANCELED" | "INCOMPLETE"
//   planName: "free" | "pro" | "enterprise"
//   currentPeriodEnd: string | null
//   cancelAtPeriodEnd: boolean
//   userName: string
//   userEmail: string
//   createdAt: string
// }

// Revenue over time (last 12 months)
// export const revenueData = [
// { month: "Mar", revenue: 4200, users: 120 },
// { month: "Apr", revenue: 5800, users: 156 },
// { month: "May", revenue: 7400, users: 198 },
// { month: "Jun", revenue: 8100, users: 234 },
// { month: "Jul", revenue: 9600, users: 287 },
// { month: "Aug", revenue: 11200, users: 342 },
// { month: "Sep", revenue: 10800, users: 391 },
// { month: "Oct", revenue: 13400, users: 456 },
// { month: "Nov", revenue: 15200, users: 523 },
// { month: "Dec", revenue: 14800, users: 578 },
// { month: "Jan", revenue: 17600, users: 645 },
// { month: "Feb", revenue: 19200, users: 712 },
// ];

// Subscription distribution by plan
// export const subscriptionDistribution = [
//   { plan: "Free", count: 428, fill: "hsl(160, 70%, 45%)" },
//   { plan: "Pro", count: 214, fill: "hsl(200, 75%, 55%)" },
//   { plan: "Enterprise", count: 70, fill: "hsl(35, 90%, 56%)" },
// ];

// AI Credits usage over time
export const aiCreditsData = [
  { month: "Mar", used: 320, total: 500 },
  { month: "Apr", used: 480, total: 650 },
  { month: "May", used: 620, total: 800 },
  { month: "Jun", used: 710, total: 950 },
  { month: "Jul", used: 890, total: 1200 },
  { month: "Aug", used: 1050, total: 1400 },
  { month: "Sep", used: 1180, total: 1550 },
  { month: "Oct", used: 1400, total: 1800 },
  { month: "Nov", used: 1620, total: 2100 },
  { month: "Dec", used: 1780, total: 2300 },
  { month: "Jan", used: 2050, total: 2600 },
  { month: "Feb", used: 2340, total: 2900 },
];

// Recent users
// export const recentUsers: UserFull[] = [
//   {
//     id: "clx1a2b3c",
//     email: "sarah.chen@example.com",
//     firstName: "Sarah",
//     lastName: "Chen",
//     role: "user",
//     stripeCustomerId: "cus_Q1a2b3c4d5",
//     aiCreditsThisMonth: 12,
//     aiCreditsTotal: 87,
//     resumesThisMonth: 3,
//     createdAt: "2026-02-10T14:23:00Z",
//     updatedAt: "2026-02-10T14:23:00Z",
//     plan: "pro",
//     subscriptionStatus: "ACTIVE",
//   },
//   {
//     id: "clx2d4e5f",
//     email: "james.wilson@example.com",
//     firstName: "James",
//     lastName: "Wilson",
//     role: "user",
//     stripeCustomerId: "cus_Q2d4e5f6g7",
//     aiCreditsThisMonth: 5,
//     aiCreditsTotal: 42,
//     resumesThisMonth: 1,
//     createdAt: "2026-02-09T09:15:00Z",
//     updatedAt: "2026-02-09T09:15:00Z",
//     plan: "free",
//     subscriptionStatus: "ACTIVE",
//   },
//   {
//     id: "clx3g7h8i",
//     email: "maria.garcia@example.com",
//     firstName: "Maria",
//     lastName: "Garcia",
//     role: "admin",
//     stripeCustomerId: "cus_Q3g7h8i9j0",
//     aiCreditsThisMonth: 28,
//     aiCreditsTotal: 156,
//     resumesThisMonth: 8,
//     createdAt: "2026-02-08T16:45:00Z",
//     updatedAt: "2026-02-08T16:45:00Z",
//     plan: "enterprise",
//     subscriptionStatus: "ACTIVE",
//   },
//   {
//     id: "clx4j0k1l",
//     email: "alex.kumar@example.com",
//     firstName: "Alex",
//     lastName: "Kumar",
//     role: "user",
//     stripeCustomerId: null,
//     aiCreditsThisMonth: 2,
//     aiCreditsTotal: 14,
//     resumesThisMonth: 0,
//     createdAt: "2026-02-07T11:30:00Z",
//     updatedAt: "2026-02-07T11:30:00Z",
//     plan: "free",
//     subscriptionStatus: "ACTIVE",
//   },
//   {
//     id: "clx5m2n3o",
//     email: "emily.zhao@example.com",
//     firstName: "Emily",
//     lastName: "Zhao",
//     role: "user",
//     stripeCustomerId: "cus_Q5m2n3o4p5",
//     aiCreditsThisMonth: 18,
//     aiCreditsTotal: 103,
//     resumesThisMonth: 5,
//     createdAt: "2026-02-06T08:20:00Z",
//     updatedAt: "2026-02-06T08:20:00Z",
//     plan: "pro",
//     subscriptionStatus: "ACTIVE",
//   },
//   {
//     id: "clx6p4q5r",
//     email: "david.park@example.com",
//     firstName: "David",
//     lastName: "Park",
//     role: "user",
//     stripeCustomerId: "cus_Q6p4q5r6s7",
//     aiCreditsThisMonth: 0,
//     aiCreditsTotal: 31,
//     resumesThisMonth: 0,
//     createdAt: "2026-02-05T13:10:00Z",
//     updatedAt: "2026-02-05T13:10:00Z",
//     plan: "pro",
//     subscriptionStatus: "CANCELED",
//   },
//   {
//     id: "clx7s6t7u",
//     email: "lisa.anderson@example.com",
//     firstName: "Lisa",
//     lastName: "Anderson",
//     role: "user",
//     stripeCustomerId: "cus_Q7s6t7u8v9",
//     aiCreditsThisMonth: 45,
//     aiCreditsTotal: 289,
//     resumesThisMonth: 12,
//     createdAt: "2026-02-04T17:55:00Z",
//     updatedAt: "2026-02-04T17:55:00Z",
//     plan: "enterprise",
//     subscriptionStatus: "ACTIVE",
//   },
//   {
//     id: "clx8v8w9x",
//     email: "tom.brown@example.com",
//     firstName: "Tom",
//     lastName: "Brown",
//     role: "user",
//     stripeCustomerId: null,
//     aiCreditsThisMonth: 1,
//     aiCreditsTotal: 6,
//     resumesThisMonth: 1,
//     createdAt: "2026-02-03T10:40:00Z",
//     updatedAt: "2026-02-03T10:40:00Z",
//     plan: "free",
//     subscriptionStatus: "ACTIVE",
//   },
// ];

// Recent payments
// export const recentPayments: Payment[] = [
//   {
//     id: "pay_1a2b3c",
//     stripeSubscriptionId: "sub_1a2b3c",
//     invoice: "INV-2026-0142",
//     amount: 2900,
//     currency: "usd",
//     status: "SUCCEEDED",
//     userId: "clx1a2b3c",
//     userName: "Sarah Chen",
//     createdAt: "2026-02-10T14:23:00Z",
//   },
//   {
//     id: "pay_2d4e5f",
//     stripeSubscriptionId: "sub_2d4e5f",
//     invoice: "INV-2026-0141",
//     amount: 9900,
//     currency: "usd",
//     status: "SUCCEEDED",
//     userId: "clx3g7h8i",
//     userName: "Maria Garcia",
//     createdAt: "2026-02-09T16:45:00Z",
//   },
//   {
//     id: "pay_3g7h8i",
//     stripeSubscriptionId: "sub_3g7h8i",
//     invoice: "INV-2026-0140",
//     amount: 2900,
//     currency: "usd",
//     status: "SUCCEEDED",
//     userId: "clx5m2n3o",
//     userName: "Emily Zhao",
//     createdAt: "2026-02-08T08:20:00Z",
//   },
//   {
//     id: "pay_4j0k1l",
//     stripeSubscriptionId: "sub_4j0k1l",
//     invoice: "INV-2026-0139",
//     amount: 2900,
//     currency: "usd",
//     status: "FAILED",
//     userId: "clx6p4q5r",
//     userName: "David Park",
//     createdAt: "2026-02-07T13:10:00Z",
//   },
//   {
//     id: "pay_5m2n3o",
//     stripeSubscriptionId: "sub_5m2n3o",
//     invoice: "INV-2026-0138",
//     amount: 9900,
//     currency: "usd",
//     status: "SUCCEEDED",
//     userId: "clx7s6t7u",
//     userName: "Lisa Anderson",
//     createdAt: "2026-02-06T17:55:00Z",
//   },
//   {
//     id: "pay_6p4q5r",
//     stripeSubscriptionId: "sub_6p4q5r",
//     invoice: "INV-2026-0137",
//     amount: 2900,
//     currency: "usd",
//     status: "PROCESSING",
//     userId: "clx8v8w9x",
//     userName: "Tom Brown",
//     createdAt: "2026-02-05T10:40:00Z",
//   },
// ];

// Summary stats
// export const stats = {
//   totalUsers: 712,
//   usersGrowth: 12.3,
//   totalRevenue: 19200,
//   revenueGrowth: 9.1,
//   activeSubscriptions: 642,
//   subscriptionGrowth: 8.7,
//   totalAiCredits: 2340,
//   aiCreditsGrowth: 14.1,
//   totalResumes: 1847,
//   resumesGrowth: 11.2,
//   mrr: 16800,
//   mrrGrowth: 7.8,
// };
