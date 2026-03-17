import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface props {
  defaultVersion: string;
  changeVersion: (value: string) => void;
  allVersions?: { id: string; content: string }[];
}

export default function SelectVersion({
  defaultVersion,
  changeVersion,
  allVersions,
}: props) {
  return (
    <Select defaultValue={defaultVersion} onValueChange={changeVersion}>
      <SelectTrigger className="w-full mt-3">
        <SelectValue placeholder="Select Version" />
      </SelectTrigger>
      <SelectContent>
        {allVersions?.map((r, i) => (
          <SelectItem key={r.id} value={r.id}>
            Version {i + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
