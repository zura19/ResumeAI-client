import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface props {
  year: string;
  setYear: React.Dispatch<React.SetStateAction<string>>;
}

function generateYears() {
  const years = [];
  for (let i = 2024; i <= new Date().getFullYear(); i++) {
    years.push(i.toString());
  }
  return years;
}

export default function SelectYear({ year, setYear }: props) {
  return (
    <Select onValueChange={(value) => setYear(value)} value={year}>
      <SelectTrigger>
        <SelectValue placeholder="Select a year" />
      </SelectTrigger>
      <SelectContent>
        {generateYears().map((y) => (
          <SelectItem key={y} value={y}>
            {y}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
