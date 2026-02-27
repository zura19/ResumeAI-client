import RevenueChart from "./modules/revenueChart";
import { RecentUsersTable } from "./modules/recentUsers";
import { StatCards } from "./modules/stats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Users, CreditCard } from "lucide-react";
import { SubscriptionChart } from "./modules/subscriptions";
import { RecentPaymentsTable } from "./modules/payments";
// import { AiCreditsChart } from "./modules/credits";

export default function Admin() {
  return (
    <>
      <StatCards />

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="bg-background/50  backdrop-blur-lg py-6">
          <TabsTrigger
            value="overview"
            className=" gap-2 data-[state=active]:bg-card data-[state=active]:text-foreground py-4 "
          >
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="gap-2 data-[state=active]:bg-card data-[state=active]:text-foreground py-4"
          >
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger
            value="billing"
            className="gap-2 data-[state=active]:bg-card data-[state=active]:text-foreground py-4"
          >
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
          {/* <TabsTrigger
            value="ai"
            className="gap-2 data-[state=active]:bg-card data-[state=active]:text-foreground py-4"
          >
            <Sparkles className="h-4 w-4" />
            AI Credits
          </TabsTrigger> */}
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>
            <div>
              <SubscriptionChart />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <RecentUsersTable />
            <RecentPaymentsTable />
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <RecentUsersTable />
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <div className="mt-6">
            <RecentPaymentsTable />
          </div>
        </TabsContent>

        {/* <TabsContent value="ai" className="mt-6">
          <AiCreditsChart />
        </TabsContent> */}
      </Tabs>
    </>
  );
}
