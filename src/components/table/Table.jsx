import { useCallback, useEffect, useMemo, useState } from "react";
import { columns, ITEMS_PER_PAGE } from "./tableConfig";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import InputSearch from "../InputSearch";
import { usePagination } from "../../hooks/usePagination";
import Pagination from "../Pagination";
import Modal from "../Modal";
import UserForm from "../forms/UserForm";
import { UserPlusIcon } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import useUsersStore from "../../store/store";
import { useModal } from "../../hooks/useModal";

export default function Table() {
  const [sortedData, setSortedData] = useState([]);
  const searchTerm = useUsersStore((state) => state.searchTerm);
  const data = useUsersStore((state) => state.users);

  const { openModal, closeModal, currentModal } = useModal();

  const filteredData = useMemo(() => {
    return sortedData.filter((record) =>
      Object.values(record).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [sortedData, searchTerm]);

  //pagination
  const { currentPage, totalPages, paginatedData, setCurrentPage } =
    usePagination({ data: filteredData, itemsPerPage: ITEMS_PER_PAGE });

  //sorting
  const handleSorting = useCallback(
    (sortField, sortOrder) => {
      if (sortField && sortOrder) {
        const sorted = [...data].sort((a, b) => {
          const cleanValue = (value) => value.toString().replace("(", "");

          const aValue = cleanValue(a[sortField]);
          const bValue = cleanValue(b[sortField]);

          // Push empty strings to the end
          if (aValue === "" && bValue !== "") return 1;
          if (bValue === "" && aValue !== "") return -1;

          const comparison = aValue.localeCompare(bValue);
          return sortOrder === "asc" ? comparison : -comparison;
        });

        setSortedData(sorted);
      } else {
        setSortedData(data);
      }
      setCurrentPage(1);
    },
    [setSortedData, data, setCurrentPage],
  );

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  return (
    <>
      <div className="flex flex-row items-center gap-4 py-4">
        <InputSearch setCurrentPage={setCurrentPage} />
        <Button onClick={() => openModal("newUser")}>
          <UserPlusIcon className="hidden sm:block" size={16} />
          Add user
        </Button>
      </div>
      {data.length > 0 && (
        <div className="rounded border">
          <div className="relative overflow-auto">
            <table className="w-full table-auto text-sm">
              <TableHeader columns={columns} handleSorting={handleSorting} />
              <TableBody paginatedData={paginatedData} columns={columns} />
            </table>
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
      <AnimatePresence>
        {currentModal === "newUser" && (
          <Modal title="New user" onClose={closeModal}>
            <UserForm onClose={closeModal} />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
