import { formatCurrency, formatDate } from "@/lib/utils";
import { PaymentCard } from "../components/PaymentCard";
import { AnimatedCheckmark } from "../components/PaymentIcons";
import { successColorsConfig } from "../config/colors";

interface props {
  total: number;
  last4: string;
  createdAt: string;
  email: string;
  continueClick: () => void;
}

export default function SuccessView({
  continueClick,
  total,
  last4,
  createdAt,
  email,
}: props) {
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
            Your payment of{"    "}
            <span className="text-white font-medium">
              {formatCurrency(total / 100)}
            </span>
            {"  "}
            has been confirmed. A receipt has been sent to your email.
          </p>
        </div>

        {/* Transaction details */}
        <div
          className="w-full rounded-xl p-4 flex flex-col gap-3 text-sm"
          style={successColorsConfig.details}
        >
          <div className="flex items-center justify-between">
            <span style={successColorsConfig.detailLabel}>User Email</span>
            <span className="text-white font-mono text-xs">{email}</span>
          </div>
          <div
            className="w-full h-px"
            style={successColorsConfig.divider}
          />
          <div className="flex items-center justify-between">
            <span style={successColorsConfig.detailLabel}>Date</span>
            <span className="text-white text-xs">
              {formatDate(createdAt)}
              {/* {new Date(createdAt).getFullYear()} */}
            </span>
          </div>
          <div
            className="w-full h-px"
            style={successColorsConfig.divider}
          />
          <div className="flex items-center justify-between">
            <span style={successColorsConfig.detailLabel}>Method</span>
            <span className="text-white text-xs">Visa ending {last4}</span>
          </div>
        </div>

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
