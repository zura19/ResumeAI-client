import { PaymentCard } from "../components/PaymentCard";
import { AnimatedCheckmark } from "../components/PaymentIcons";

interface props {
  continueClick: () => void;
}

export default function CancelView({ continueClick }: props) {
  return (
    <PaymentCard>
      <div className="flex flex-col items-center gap-6">
        <AnimatedCheckmark />
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold text-white">
            Canceled Successful
          </h1>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Your subscription has been canceled. We hope to see you again soon.
          </p>
        </div>

        <button
          onClick={continueClick}
          type="button"
          className="w-full py-3 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #615fff 0%, #7c6fff 100%)",
            boxShadow: "0 4px 16px rgba(97,95,255,0.3)",
          }}
        >
          Continue
        </button>
      </div>
    </PaymentCard>
  );
}
