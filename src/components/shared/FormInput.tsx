/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface props {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  type?: string;
  className?: string;
  autoComplete?: string;
  maxLength?: number;
  readOnly?: boolean;
}

export default function FormInput({
  control,
  name,
  label,
  placeholder,
  description,
  type,
  className,
  autoComplete,
  maxLength,
  readOnly,
}: props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              id={name}
              placeholder={placeholder}
              className={className}
              autoComplete={autoComplete}
              maxLength={maxLength}
              readOnly={readOnly}
              {...field}
              onChange={(e) => {
                // If input is of type number, convert the incoming string value
                // to a number before passing it to react-hook-form's field.onChange.
                const value = (e && (e.target as HTMLInputElement)?.value) ?? e;
                if (type === "number") {
                  // Preserve empty string as undefined so the form can clear the value
                  const parsed = value === "" ? undefined : Number(value);
                  field.onChange(parsed);
                } else {
                  field.onChange(e);
                }
              }}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
