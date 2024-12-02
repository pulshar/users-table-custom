import { SearchIcon, XIcon } from "lucide-react";
import { Input } from "./ui/input";

export default function InputSearch({
  searchTerm,
  setSearchTerm,
  handleChange,
}) {
  return (
    <div className="relative flex items-center">
      {!searchTerm ? (
        <SearchIcon className="absolute right-2" size={15} />
      ) : (
        <XIcon
          onClick={() => setSearchTerm("")}
          className="absolute right-1 h-6 w-6 cursor-pointer rounded-full p-1"
        />
      )}
      <Input
        type="text"
        name="search"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
        className="w-full pr-7 sm:w-[220px]"
      />
    </div>
  );
}
