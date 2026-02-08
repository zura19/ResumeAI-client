import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumeListTab } from "./resumes";
import { SubscriptionCardTab } from "./subscriptions";
import { PaymentHistoryTab } from "./payments";
import type { ResumeType } from "@/lib/types/AiGeneratedResume";

interface props {
  resumes?: {
    id: string;
    title: string;
    type: ResumeType;
    createdAt: string;
  }[];
}

export default function ProfileTabsSection({ resumes }: props) {
  const tabClass = `data-[state=active]:bg-card data-[state=active]:text-foreground text-muted-foreground text-base p-4 cursor-pointer`;
  return (
    <Tabs defaultValue="resumes">
      <TabsList className="bg-background/50 border backdrop-blur-lg py-6 px-3">
        <TabsTrigger value="resumes" className={tabClass}>
          Resumes
        </TabsTrigger>
        <TabsTrigger value="subscription" className={tabClass}>
          Subscription
        </TabsTrigger>
        <TabsTrigger value="billing" className={tabClass}>
          Billing
        </TabsTrigger>
      </TabsList>

      <TabsContent value="resumes" className="mt-3">
        <ResumeListTab resumes={resumes} />
      </TabsContent>

      <TabsContent value="subscription" className="mt-6">
        <SubscriptionCardTab />
      </TabsContent>

      <TabsContent value="billing" className="mt-6 ">
        <PaymentHistoryTab />
      </TabsContent>
    </Tabs>
  );
}
