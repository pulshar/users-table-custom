import { memo, useState } from "react";
import { IoIosArrowRoundDown } from "react-icons/io";
import { BiSortAlt2 } from "react-icons/bi";
import { capitalize } from "../../helpers";

const TableHeader = memo(({ columns, handleSorting }) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("");

  const handleSortingChange = (label) => {
    const sortOrder =
      label === sortField
        ? order === "asc"
          ? "desc"
          : order === "desc"
            ? ""
            : "asc"
        : "asc";
    setSortField(label);
    setOrder(sortOrder);
    handleSorting(label, sortOrder);
  };
  return (
    <thead>
      <tr>
        {columns.map(({ label, sortable }) => (
          <th key={label} className="px-4 py-3 text-left">
            <div
              className={`flex items-center font-medium ${
                sortable ? "cursor-pointer select-none" : "select-none"
              }`}
              onClick={sortable ? () => handleSortingChange(label) : null}
              title={
                sortable
                  ? order === ""
                    ? "Sort ascending"
                    : order === "asc"
                      ? "Sort descending"
                      : "Clear sort"
                  : undefined
              }
            >
              {sortable ? (
                sortField && order ? (
                  sortField === label ? (
                    <IoIosArrowRoundDown
                      size={16}
                      className={order === "desc" ? "rotate-180" : ""}
                    />
                  ) : (
                    <BiSortAlt2 />
                  )
                ) : (
                  <BiSortAlt2 />
                )
              ) : null}
              {capitalize(label)}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
});
TableHeader.displayName = "TableHeader";
export default TableHeader;
