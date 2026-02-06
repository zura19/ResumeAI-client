import { PaymentCard } from "../components/PaymentCard";
import { AnimatedCheckmark } from "../components/PaymentIcons";

export default function SuccessView({ onReset }: { onReset: () => void }) {
  return (
    <PaymentCard>
      <div className="flex flex-col items-center gap-6">
        <AnimatedCheckmark />
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold text-white">
            Payment Successful
          </h1>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Your payment of{" "}
            <span className="text-white font-medium">$49.99</span> has been
            confirmed. A receipt has been sent to your email.
          </p>
        </div>

        {/* Transaction details */}
        <div
          className="w-full rounded-xl p-4 flex flex-col gap-3 text-sm"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center justify-between">
            <span style={{ color: "rgba(255,255,255,0.4)" }}>
              Transaction ID
            </span>
            <span className="text-white font-mono text-xs">TXN-2026-8A4F</span>
          </div>
          <div
            className="w-full h-px"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
          <div className="flex items-center justify-between">
            <span style={{ color: "rgba(255,255,255,0.4)" }}>Date</span>
            <span className="text-white text-xs">Feb 7, 2026</span>
          </div>
          <div
            className="w-full h-px"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
          <div className="flex items-center justify-between">
            <span style={{ color: "rgba(255,255,255,0.4)" }}>Method</span>
            <span className="text-white text-xs">Visa ending 4242</span>
          </div>
        </div>

        <button
          onClick={onReset}
          type="button"
          //   onClick={onReset}
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
