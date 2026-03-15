import ShinyText from "@/components/ShinyText";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface props {
  resumeId: string;
}

{
  /* to-[#F86FAB] */
}
export default function ChatWithAiButton({ resumeId }: props) {
  return (
    <Link
      to={`/resume/${resumeId}/chat`}
      // onClick={onClick}
      className="relative inline-flex items-center justify-center mt-auto gap-2.5 px-5 py-3.5 pl-4 rounded-full border-none cursor-pointer font-semibold text-base text-white overflow-hidden
        bg-linear-to-br from-[#615fff] to-[#D46FF8] 
        shadow-[0_8px_30px_rgba(107,79,248,0.5),0_0_60px_rgba(184,79,232,0.3)]
        hover:shadow-[0_12px_40px_rgba(107,79,248,0.6),0_0_80px_rgba(184,79,232,0.4)]
        hover:-translate-y-0.5 hover:scale-[1.01]
        active:scale-[0.97]
        transition-all duration-300"
    >
      {/* Sparkle particles */}
      {[
        { size: "w-1 h-1", pos: "top-[20%] left-[75%]", delay: "0s" },
        { size: "w-[3px] h-[3px]", pos: "top-[60%] left-[85%]", delay: "1s" },
        { size: "w-0.5 h-0.5", pos: "top-[35%] left-[90%]", delay: "2s" },
      ].map((s, i) => (
        <span
          key={i}
          className={`absolute ${s.size} ${s.pos} rounded-full bg-white/70 animate-sparkle pointer-events-none`}
          style={{ animationDelay: s.delay }}
        />
      ))}

      {/* Animated icon */}
      <span className="relative z-10 size-7.5 bg-in rounded-full bg-white/20 flex items-center justify-center shrink-0">
        <motion.div
          animate={{ scale: [1, 1.15, 0.95, 1], rotate: [0, -8, 5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <MessageCircle size={15} stroke="white" strokeWidth={2} />
        </motion.div>
      </span>

      <ShinyText
        className="font-bold"
        text={`Chat with AI`}
        speed={1.7}
        color={"#151515"}
        shineColor={"#ffffff"}
        spread={100}
        direction="left"
        yoyo={false}
        pauseOnHover={false}
        disabled={false}
      />
    </Link>
  );
}
