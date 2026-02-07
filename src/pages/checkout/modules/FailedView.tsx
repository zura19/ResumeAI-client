import { PaymentCard } from "../components/PaymentCard";
import { AnimatedCross } from "../components/PaymentIcons";

export default function FailedView({
  onReset,
  goHome,
}: {
  onReset: () => void;
  goHome: () => void;
}) {
  return (
    <PaymentCard>
      <div className="flex flex-col items-center gap-6">
        <AnimatedCross />
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold text-white">Payment Failed</h1>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            We were unable to process your payment. Please check your card
            details and try again.
          </p>
        </div>

        {/* Error details */}
        <div
          className="w-full rounded-xl p-4 flex items-start gap-3 text-sm"
          style={{
            background: "rgba(248,113,113,0.06)",
            border: "1px solid rgba(248,113,113,0.12)",
          }}
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 shrink-0 mt-0.5"
            style={{ color: "#f87171" }}
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
              clipRule="evenodd"
            />
          </svg>
          <p
            className="text-left leading-relaxed"
            style={{ color: "rgba(248,113,113,0.8)" }}
          >
            Error code: CARD_DECLINED. Your card issuer declined the
            transaction. Please contact your bank or try a different payment
            method.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <button
            type="button"
            onClick={onReset}
            className="w-full py-3 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #615fff 0%, #7c6fff 100%)",
              boxShadow: "0 4px 16px rgba(97,95,255,0.3)",
            }}
          >
            Try Again
          </button>
          <button
            type="button"
            onClick={goHome}
            className="w-full py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-80 cursor-pointer"
            style={{
              color: "rgba(255,255,255,0.5)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            Go To Home Page
          </button>
        </div>
      </div>
    </PaymentCard>
  );
}
