import { formatCurrency, formatDate } from "@/lib/utils";
import { PaymentCard } from "../components/PaymentCard";
import { AnimatedCheckmark } from "../components/PaymentIcons";
import { successColorsConfig } from "../config/colors";

interface props {
  total: number | null;
  currency: string | null;
  last4: string | null;
  createdAt: string | null;
  email: string | null;
  continueClick: () => void;
}

export default function SuccessView({
  continueClick,
  total,
  currency,
  last4,
  createdAt,
  email,
}: props) {
  const details: { label: string; value: string; className?: string }[] = [];

  if (email) {
    details.push({
      label: "User Email",
      value: email,
      className: "font-mono",
    });
  }

  if (createdAt) {
    details.push({
      label: "Date",
      value: formatDate(createdAt),
    });
  }

  if (last4) {
    details.push({
      label: "Method",
      value: `\u2022\u2022\u2022\u2022 ${last4}`,
    });
  }

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
            style={successColorsConfig.description}
          >
            Your payment
            {total !== null && (
              <>
                {" "}
                of{" "}
                <span className="text-white font-medium">
                  {formatCurrency(total / 100, currency ?? undefined)}
                </span>
              </>
            )}{" "}
            has been confirmed. A receipt has been sent to your email.
          </p>
        </div>

        {details.length > 0 && (
          <div
            className="w-full rounded-xl p-4 flex flex-col gap-3 text-sm"
            style={successColorsConfig.details}
          >
            {details.map((detail, index) => (
              <div key={detail.label} className="flex flex-col gap-3">
                {index > 0 && (
                  <div
                    className="w-full h-px"
                    style={successColorsConfig.divider}
                  />
                )}
                <div className="flex items-center justify-between gap-4">
                  <span style={successColorsConfig.detailLabel}>
                    {detail.label}
                  </span>
                  <span
                    className={`text-white text-xs text-right ${detail.className ?? ""}`}
                  >
                    {detail.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={continueClick}
          type="button"
          className="w-full py-3 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90 cursor-pointer"
          style={successColorsConfig.primaryButton}
        >
          Continue
        </button>
      </div>
    </PaymentCard>
  );
}
