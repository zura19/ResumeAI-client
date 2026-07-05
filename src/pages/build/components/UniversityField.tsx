import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { getUniversities } from "@/lib/services/resume/getUniversitiesService";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface props {
  university: string;
  setUniversity: React.Dispatch<React.SetStateAction<string>>;
}

export default function UniversityField({ university, setUniversity }: props) {
  const show = university.length > 2;
  const [hide, setHide] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["universities", university],
    queryFn: async () => await getUniversities(university),
    enabled: show,
  });
  const boxRef = useRef<HTMLDivElement>(null);

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hide) {
      setHide(false);
    }
    setUniversity(e.target.value);
  };

  useEffect(() => {
    const hide = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setHide(true);
      }
    };
    document.addEventListener("click", hide);

    return () => {
      document.removeEventListener("click", hide);
    };
  }, [data]);

  return (
    <div className="space-y-0 relative">
      <Label htmlFor="university" className="font-semibold">
        University
      </Label>
      <Input
        className={cn(
          "mt-2",
          show && !hide ? "rounded-b-none focus-visible:ring-0 border " : "",
        )}
        value={university}
        onChange={change}
        name="university"
        id="university"
        placeholder="University Name"
      />
      <AnimatePresence>
        {show && !hide && (
          <motion.div
            ref={boxRef}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: 30,
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 translate-y-full left-0 w-full overflow-scroll border border-foreground/15 h-[200px] z-10 bg-card/80 backdrop-blur-md rounded-lg rounded-t-none"
          >
            {isLoading && (
              <div className="flex items-center justify-center pt-6">
                <Spinner className="size-5 animate-spin" />
              </div>
            )}
            {data?.data.universities?.length !== 0 ? (
              data?.data.universities?.map((u) => (
                <div
                  onClick={() => {
                    setUniversity(u.name);
                    setHide(true);
                  }}
                  key={u.name + u.state_province + u.country}
                  className=" hover:bg-muted text-sm text-foreground/80 py-2.5 px-4 transition-all duration-300 cursor-pointer"
                >
                  <p className="">{u.name}</p>
                </div>
              ))
            ) : (
              <div className="text-center pt-8">
                <p className="text-lg font-semibold">No University found</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
