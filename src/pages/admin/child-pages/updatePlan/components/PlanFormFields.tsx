import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import ArrayInput from "./ArrayInput";
import type { UpdatePlanFormState } from "../hooks/useUpdatePlanData";

interface PlanFormFieldsProps {
  form: UpdatePlanFormState;
  setField: <K extends keyof UpdatePlanFormState>(
    key: K,
    value: UpdatePlanFormState[K],
  ) => void;
}

export default function PlanFormFields({
  form,
  setField,
}: PlanFormFieldsProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          value={form.price}
          onChange={(e) => setField("price", Number(e.target.value))}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="stripeProductId">Stripe Product ID</Label>
        <Input
          id="stripeProductId"
          value={form.stripeProductId}
          onChange={(e) => setField("stripeProductId", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="stripePriceId">Stripe Price ID</Label>
        <Input
          id="stripePriceId"
          value={form.stripePriceId}
          onChange={(e) => setField("stripePriceId", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="aiCredits">AI Credits Per Month</Label>
        <Input
          id="aiCredits"
          value={form.aiCreditsPerMonth}
          onChange={(e) => setField("aiCreditsPerMonth", +e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="totalResumes">Total Resumes</Label>
        <Input
          id="totalResumes"
          value={form.totalResumes}
          onChange={(e) => setField("totalResumes", +e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={form.description}
          onChange={(e) => setField("description", e.target.value)}
        />
      </div>

      <ArrayInput
        id="features"
        label="Features"
        placeholder="Feature"
        add={(value) => setField("features", [...form.features, value])}
        update={(index, value) =>
          setField(
            "features",
            form.features.map((feature, currentIndex) =>
              currentIndex === index ? value : feature,
            ),
          )
        }
        remove={(index) =>
          setField(
            "features",
            form.features.filter((_, currentIndex) => currentIndex !== index),
          )
        }
        arr={form.features}
      />

      <div className="flex flex-col gap-2">
        <Label htmlFor="detailedDescription">Detailed Description</Label>
        <Textarea
          className="h-26"
          id="detailedDescription"
          value={form.detailedDescription}
          onChange={(e) => setField("detailedDescription", e.target.value)}
        />
      </div>

      <ArrayInput
        id="additional-features"
        label="Additional Features"
        placeholder="Feature"
        add={(value) =>
          setField("additionalFeatures", [...form.additionalFeatures, value])
        }
        update={(index, value) =>
          setField(
            "additionalFeatures",
            form.additionalFeatures.map((feature, currentIndex) =>
              currentIndex === index ? value : feature,
            ),
          )
        }
        remove={(index) =>
          setField(
            "additionalFeatures",
            form.additionalFeatures.filter(
              (_, currentIndex) => currentIndex !== index,
            ),
          )
        }
        arr={form.additionalFeatures}
      />

      <div className="flex flex-col gap-2 ">
        <Label htmlFor="recommended">Recommended</Label>
        <Select
          value={form.recommended}
          onValueChange={(value) =>
            setField("recommended", value === "true" ? "true" : "false")
          }
        >
          <SelectTrigger id="recommended" className="w-full">
            <SelectValue placeholder="Recommended" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
