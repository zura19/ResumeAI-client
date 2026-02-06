import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProcessingView from "./modules/ProcessingView";
import SuccessView from "./modules/SuccessView";
import FailedView from "./modules/FailedView";

const possibleStates = ["success", "failed"];

export default function Checkout() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simulate payment processing
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        // Randomly choose success or failure for demo
        setLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loading, params.state]);

  useEffect(() => {
    if (params.state && !possibleStates.includes(params.state)) {
      navigate(`/`);
    }
  }, [params.state, navigate, loading]);

  const handleReset = () => {
    setLoading(true);
  };

  function goToProfile() {
    navigate("/profile");
  }

  function renderContent() {
    if (loading) return <ProcessingView />;
    if (!loading && params.state === "success")
      return <SuccessView onReset={goToProfile} />;
    if (!loading && params.state === "failed")
      return <FailedView onReset={handleReset} />;
  }

  return (
    <div className="w-full h-dvh flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      {renderContent()}
    </div>
  );
}

// function ProcessingView() {
//   return (
//     <PaymentCard>
//       <div className="flex flex-col items-center gap-6">
//         <ProcessingSpinner />
//         <div className="flex flex-col gap-2">
//           <h1 className="text-xl font-semibold text-white">
//             Processing Payment
//           </h1>
//           <p
//             className="text-sm leading-relaxed"
//             style={{ color: "rgba(255,255,255,0.5)" }}
//           >
//             Please wait while we confirm your transaction. This may take a
//             moment.
//           </p>
//         </div>
//         {/* Animated dots */}
//         <div className="flex items-center gap-1.5">
//           {[0, 1, 2].map((i) => (
//             <span
//               key={i}
//               className="block w-1.5 h-1.5 rounded-full animate-pulse"
//               style={{
//                 backgroundColor: "#615fff",
//                 animationDelay: `${i * 0.2}s`,
//               }}
//             />
//           ))}
//         </div>
//       </div>
//     </PaymentCard>
//   );
// }

// function SuccessView({ onReset }: { onReset: () => void }) {
//   return (
//     <PaymentCard>
//       <div className="flex flex-col items-center gap-6">
//         <AnimatedCheckmark />
//         <div className="flex flex-col gap-2">
//           <h1 className="text-xl font-semibold text-white">
//             Payment Successful
//           </h1>
//           <p
//             className="text-sm leading-relaxed"
//             style={{ color: "rgba(255,255,255,0.5)" }}
//           >
//             Your payment of{" "}
//             <span className="text-white font-medium">$49.99</span> has been
//             confirmed. A receipt has been sent to your email.
//           </p>
//         </div>

//         {/* Transaction details */}
//         <div
//           className="w-full rounded-xl p-4 flex flex-col gap-3 text-sm"
//           style={{
//             background: "rgba(255,255,255,0.03)",
//             border: "1px solid rgba(255,255,255,0.06)",
//           }}
//         >
//           <div className="flex items-center justify-between">
//             <span style={{ color: "rgba(255,255,255,0.4)" }}>
//               Transaction ID
//             </span>
//             <span className="text-white font-mono text-xs">TXN-2026-8A4F</span>
//           </div>
//           <div
//             className="w-full h-px"
//             style={{ background: "rgba(255,255,255,0.06)" }}
//           />
//           <div className="flex items-center justify-between">
//             <span style={{ color: "rgba(255,255,255,0.4)" }}>Date</span>
//             <span className="text-white text-xs">Feb 7, 2026</span>
//           </div>
//           <div
//             className="w-full h-px"
//             style={{ background: "rgba(255,255,255,0.06)" }}
//           />
//           <div className="flex items-center justify-between">
//             <span style={{ color: "rgba(255,255,255,0.4)" }}>Method</span>
//             <span className="text-white text-xs">Visa ending 4242</span>
//           </div>
//         </div>

//         <button
//           onClick={onReset}
//           type="button"
//           //   onClick={onReset}
//           className="w-full py-3 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90 cursor-pointer"
//           style={{
//             background: "linear-gradient(135deg, #615fff 0%, #7c6fff 100%)",
//             boxShadow: "0 4px 16px rgba(97,95,255,0.3)",
//           }}
//         >
//           Continue
//         </button>
//       </div>
//     </PaymentCard>
//   );
// }

// function FailedView({ onReset }: { onReset: () => void }) {
//   return (
//     <PaymentCard>
//       <div className="flex flex-col items-center gap-6">
//         <AnimatedCross />
//         <div className="flex flex-col gap-2">
//           <h1 className="text-xl font-semibold text-white">Payment Failed</h1>
//           <p
//             className="text-sm leading-relaxed"
//             style={{ color: "rgba(255,255,255,0.5)" }}
//           >
//             We were unable to process your payment. Please check your card
//             details and try again.
//           </p>
//         </div>

//         {/* Error details */}
//         <div
//           className="w-full rounded-xl p-4 flex items-start gap-3 text-sm"
//           style={{
//             background: "rgba(248,113,113,0.06)",
//             border: "1px solid rgba(248,113,113,0.12)",
//           }}
//         >
//           <svg
//             viewBox="0 0 20 20"
//             fill="currentColor"
//             className="w-5 h-5 shrink-0 mt-0.5"
//             style={{ color: "#f87171" }}
//           >
//             <path
//               fillRule="evenodd"
//               d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <p
//             className="text-left leading-relaxed"
//             style={{ color: "rgba(248,113,113,0.8)" }}
//           >
//             Error code: CARD_DECLINED. Your card issuer declined the
//             transaction. Please contact your bank or try a different payment
//             method.
//           </p>
//         </div>

//         <div className="flex flex-col gap-3 w-full">
//           <button
//             type="button"
//             onClick={onReset}
//             className="w-full py-3 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90 cursor-pointer"
//             style={{
//               background: "linear-gradient(135deg, #615fff 0%, #7c6fff 100%)",
//               boxShadow: "0 4px 16px rgba(97,95,255,0.3)",
//             }}
//           >
//             Try Again
//           </button>
//           <button
//             type="button"
//             onClick={onReset}
//             className="w-full py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-80 cursor-pointer"
//             style={{
//               color: "rgba(255,255,255,0.5)",
//               background: "rgba(255,255,255,0.04)",
//               border: "1px solid rgba(255,255,255,0.08)",
//             }}
//           >
//             Contact Support
//           </button>
//         </div>
//       </div>
//     </PaymentCard>
//   );
// }
