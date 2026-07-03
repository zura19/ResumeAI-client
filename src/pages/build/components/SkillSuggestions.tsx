import { AnimatePresence, motion } from "framer-motion";

interface SkillSuggestionsProps {
  type: string;
  temp: string;
  suggestions: string[];
  onSelect: (skill: string) => void;
}

export default function SkillSuggestions({
  type,
  temp,
  suggestions,
  onSelect,
}: SkillSuggestionsProps) {
  return (
    <AnimatePresence>
      {temp && (
        <motion.div
          id={"skill-box-" + type}
          key={type}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: 30,
          }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 translate-y-full left-0 w-full overflow-scroll border border-foreground/15 h-[250px] z-10 bg-card/80 backdrop-blur-md rounded-lg rounded-t-none"
        >
          {suggestions.length > 0 ? (
            suggestions.map((skill) => (
              <div
                key={skill}
                className="hover:bg-muted text-sm text-foreground/80 py-2.5 px-4 transition-all duration-300 cursor-pointer"
                onClick={() => onSelect(skill)}
              >
                <p>{skill}</p>
              </div>
            ))
          ) : (
            <div className="text-center pt-8">
              <p className="text-lg font-semibold">No Skills found</p>
              <p className="text-sm text-muted-foreground">
                you can still add the skill "{temp}" if you want.
              </p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
