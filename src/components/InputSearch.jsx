import { SearchIcon, XIcon } from "lucide-react";
import { Input } from "./ui/input";
import useUsersStore from "../store/store";

export default function InputSearch({ setCurrentPage }) {
  const searchTerm = useUsersStore((state) => state.searchTerm);
  const setSearchTerm = useUsersStore((state) => state.setSearchTerm);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
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
