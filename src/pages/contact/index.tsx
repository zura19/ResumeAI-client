import Wrapper from "@/components/shared/Wrapper";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "./components/ContactForm";
import SpotlightCard from "@/components/shared/SpotlightCard";
import { contactHighlights } from "./constants/contactHighlights";

export default function Contact() {
  return (
    <div className="max-h-[84dvh]  overflow-scroll scrollbar-hide">
      <Wrapper className="grid min-h-[84dvh] items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="space-y-8">
          <div className="space-y-4">
            <h1 className="max-w-xl text-4xl leading-[1.2] capitalize font-bold text-foreground text-balance md:text-5xl">
              Tell us what you need next.
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground text-pretty">
              Share the details and our team will route your request to the
              right place.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {contactHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <SpotlightCard
                  key={item.title}
                  cardClassName=" flex gap-4 rounded-lg border border-border p-4"
                >
                  <div className="flex gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div className="space-y-1">
                      <h2 className="font-semibold text-foreground">
                        {item.title}
                      </h2>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </section>

        <SpotlightCard cardClassName="border-border bg-card/70 shadow-2xl shadow-black/20 backdrop-blur-xl h-full overflow-scroll scrollbar-hide">
          <CardHeader>
            <CardTitle className="text-2xl">Send a message</CardTitle>
            <CardDescription>
              Include enough context so we can answer with the right details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </SpotlightCard>
      </Wrapper>
    </div>
  );
}
