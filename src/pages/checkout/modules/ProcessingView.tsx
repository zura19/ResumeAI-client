import { PaymentCard } from "../components/PaymentCard";
//
import { ProcessingSpinner } from "../components/PaymentIcons";
import { processingColorsConfig } from "../config/colors";

interface props {
  session?: "checkout" | "cancel";
}

export default function ProcessingView({ session = "checkout" }: props) {
  const title =
    session === "checkout" ? "Processing Payment" : "Cancelling Subscription";
  const description =
    session === "checkout"
      ? " Please wait while we confirm your transaction. This may take a moment."
      : "Please wait while we cancel your subscription. This may take a moment.";

  return (
    <PaymentCard>
      <div className="flex flex-col items-center gap-6">
        <ProcessingSpinner />
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold text-white">{title}</h1>
          <p
            className="text-sm leading-relaxed"
            style={processingColorsConfig.description}
          >
            {description}
          </p>
        </div>
        {/* Animated dots */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-1.5 h-1.5 rounded-full animate-pulse"
              style={{
                ...processingColorsConfig.dot,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </PaymentCard>
  );
}
