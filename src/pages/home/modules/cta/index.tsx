// import GetStartedBtn from "../../components/GetStartedBtn";
import Plans from "@/components/shared/plan/Plans";
import Section from "../../components/Section";

export function CTASection() {
  return (
    <Section
      id="cta"
      heading="Ready to Build Your Future?"
      description="Get started immediately for free. Upgrade for more AI credits, templates, and advanced features."
      background=""
      gradient="red"
    >
      <Plans />
    </Section>
  );
}
