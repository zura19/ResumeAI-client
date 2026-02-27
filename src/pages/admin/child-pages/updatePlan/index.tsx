import { ErrorComponent } from "@/components/shared/ErrorComponents";
import FormButton from "@/components/shared/FormButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { getPlansByNameService } from "@/lib/services/plan/getPlanByName";
import type { Plan, PlanName } from "@/lib/types/plan";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updatePlanservice } from "@/lib/services/plan/updatePlan";
import { toast } from "sonner";

export default function UpdatePlan() {
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["plan", params.name],
    queryFn: () => getPlansByNameService(params.name as PlanName), // staleTime: 3 * 60 * 60 * 1000, // 3 hour
    enabled: !!params.name,
  });

  console.log(data);

  const plan = data?.data;
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [features, setFeatures] = useState<string[]>([]);
  const [additionalFeatures, setAdditionalFeatures] = useState<string[]>([]);
  const [detailedDescription, setDetailedDescription] = useState("");
  const [recommended, setRecommended] = useState(
    plan?.recommended ? "true" : "false",
  );
  const [stripeProductId, setStripeProductId] = useState(
    plan?.stripeProductId || "",
  );
  const [stripePriceId, setStripePriceId] = useState(plan?.stripePriceId || "");
  const [aiCreditsPerMonth, setAiCreditsPerMonth] = useState(
    plan?.aiCreditsPerMonth || 0,
  );
  const [totalResumes, setTotalResumes] = useState(plan?.totalResumes || 0);

  useEffect(() => {
    if (plan) {
      // eslint-disable-next-line
      setDescription(plan.description);
      setPrice(plan.priceMonthly);
      setFeatures(plan.features);
      setAdditionalFeatures(plan.additionalFeatures);
      setDetailedDescription(plan.detailedDescription);
      setRecommended(plan.recommended ? "true" : "false");
      setStripeProductId(plan.stripeProductId);
      setStripePriceId(plan.stripePriceId);
      setAiCreditsPerMonth(plan.aiCreditsPerMonth);
      setTotalResumes(plan.totalResumes);
    }
    setTimeout(() => {
      setRecommended(plan?.recommended ? "true" : "false");
    }, 100);
  }, [plan]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (body: Partial<Plan>) =>
      updatePlanservice(plan?.id as string, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["plans"],
      });
      navigate("/admin");
      toast.success("Plan updated successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update plan");
    },
  });

  console.log(plan?.recommended);
  console.log(recommended);

  if (isError) {
    return (
      <ErrorComponent title="Something went wrong" message={error?.message} />
    );
  }

  if (isLoading)
    return (
      <div className=" flex items-center justify-center">
        <Spinner />
      </div>
    );

  async function update(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      name: plan?.name as PlanName,
      description,
      priceMonthly: price,
      features,
      additionalFeatures,
      detailedDescription,
      recommended: recommended === "true" ? true : false,
      stripeProductId,
      stripePriceId,
      aiCreditsPerMonth,
      totalResumes,
    };
    await mutateAsync(data);
    console.log(data);
  }

  return (
    <form onSubmit={update} className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Label htmlFor="price">Price</Label>
        <Input
          className=""
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="stripeProductId">Stripe Product ID</Label>
        <Input
          id="stripeProductId"
          value={stripeProductId}
          onChange={(e) => setStripeProductId(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="stripePriceId">Stripe Price ID</Label>
        <Input
          id="stripePriceId"
          value={stripePriceId}
          onChange={(e) => setStripePriceId(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="aiCredits">AI Credits Per Month</Label>
        <Input
          id="aiCredits"
          value={aiCreditsPerMonth}
          onChange={(e) => setAiCreditsPerMonth(+e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="totalResumes">Total Resumes</Label>
        <Input
          id="totalResumes"
          value={totalResumes}
          onChange={(e) => setTotalResumes(+e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <ArrayInput
        id="features"
        label="Features"
        placeholder="Feature"
        add={(val: string) => setFeatures([...features, val])}
        remove={(index) => {
          const newFeatures = [...features];
          newFeatures.splice(index, 1);
          setFeatures(newFeatures);
        }}
        arr={features}
      />

      <div className="flex flex-col gap-2">
        <Label htmlFor="detailedDescription">Detailed Description</Label>
        <Textarea
          className="h-26"
          id="detailedDescription"
          value={detailedDescription}
          onChange={(e) => setDetailedDescription(e.target.value)}
        />
      </div>

      <ArrayInput
        id="additional-features"
        label="Additional Features"
        placeholder="Feature"
        add={(val: string) =>
          setAdditionalFeatures([...additionalFeatures, val])
        }
        remove={(index) => {
          const newFeatures = [...additionalFeatures];
          newFeatures.splice(index, 1);
          setAdditionalFeatures(newFeatures);
        }}
        arr={additionalFeatures}
      />

      <div className="flex flex-col gap-2 ">
        <Label htmlFor="recommended">Recommended</Label>
        <Select
          value={recommended === "true" ? "true" : "false"}
          onValueChange={(e) => setRecommended(e === "true" ? "true" : "false")}
        >
          <SelectTrigger id="recommended" className="w-full">
            <SelectValue placeholder="Recommended" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={"true"}>Yes</SelectItem>
              <SelectItem value={"false"}>No</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <FormButton
        loading={isPending}
        disabled={isPending}
        loadingText="Updating..."
      >
        Update
      </FormButton>
    </form>
  );
}

interface arrayInputProps {
  id: string;
  label: string;
  placeholder: string;
  arr: string[];
  add: (val: string) => void;
  remove: (index: number) => void;
}
function ArrayInput({
  id,
  label,
  placeholder,
  add,
  remove,
  arr,
}: arrayInputProps) {
  const [temp, setTemp] = useState("");
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative rounded-lg">
        <Input
          type="string"
          placeholder={placeholder}
          id={id}
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
        />
        <Button
          onClick={() => {
            add(temp);
            setTemp("");
          }}
          size={"icon-sm"}
          type="button"
          className={cn(
            "absolute top-1/2 right-0 -translate-x-3 -translate-y-1/2 rounded-full size-6",
            temp
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          )}
        >
          <Plus />
        </Button>
      </div>
      {arr.length > 0 && (
        <div className="bg-muted p-4 space-y-2 text-primary rounded-lg">
          {arr.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 justify-between"
            >
              <p className="flex items-center gap-2">
                <Check className="size-5 text-emerald-600" />
                <span>{feature}</span>
              </p>
              <X
                onClick={() => remove(index)}
                className="cursor-pointer size-5 text-muted-foreground"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
