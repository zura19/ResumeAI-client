import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface props {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date>>;

  className?: string;
  placeholder?: string;
  disabled?: boolean | ((date: Date) => boolean);
}

export function DatePicker({ date, setDate, disabled }: props) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(date);

  React.useEffect(() => {
    setMonth(date);
  }, [date]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full" asChild>
        <Button
          variant="outline"
          id="date"
          className="w-full justify-between font-normal"
        >
          {date ? date.toLocaleDateString() : "Select date"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          disabled={disabled}
          mode="single"
          month={month}
          onMonthChange={setMonth}
          selected={date}
          captionLayout="dropdown"
          onSelect={(date) => {
            setDate(date as Date);
            setMonth(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
