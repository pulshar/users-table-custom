import { useCallback, useEffect, useMemo, useState } from "react";
import { columns, ITEMS_PER_PAGE } from "./tableConfig";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import InputSearch from "../InputSearch";
import { usePagination } from "../../hooks/usePagination";
import Pagination from "../Pagination";
import Modal from "../Modal";
import { useModal } from "../../hooks/useModal";
import UserForm from "../forms/UserForm";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { UserPlusIcon } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";

export default function Table({ data }) {
  const [tableData, setTableData] = useLocalStorage("users", data);
  const [sortedData, setSortedData] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");

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

  // modal
  const { modal, toggleModal } = useModal();

  //sorting
  const handleSorting = useCallback(
    (sortField, sortOrder) => {
      if (sortField && sortOrder) {
        const sorted = [...tableData].sort((a, b) => {
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
        setSortedData(tableData);
      }
      setCurrentPage(1);
    },
    [setSortedData, tableData, setCurrentPage],
  );

  //input search
  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    setSortedData(tableData);
  }, [tableData]);

  return (
    <>
      <div className="flex flex-row items-center gap-4 py-4">
        <InputSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleChange={handleChangeSearchTerm}
        />
        <Button onClick={toggleModal}>
          <UserPlusIcon className="hidden sm:block" size={16} />
          Add user
        </Button>
      </div>

      <div className="rounded-t border">
        <div className="relative overflow-auto">
          <table className="w-full table-auto text-sm">
            <TableHeader columns={columns} handleSorting={handleSorting} />
            <TableBody
              paginatedData={paginatedData}
              columns={columns}
              setTableData={setTableData}
            />
          </table>
        </div>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <AnimatePresence>
        {modal && (
          <Modal title="New user" toggleModal={toggleModal}>
            <UserForm
              tableData={tableData}
              setTableData={setTableData}
              toggleModal={toggleModal}
            />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
