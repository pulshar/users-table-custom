import { useRef, useState } from "react";
import { useOnClickOutside } from "@/hooks/useClickOutside";
import { useKeyDown } from "@/hooks/useKeyDown";
import { validateInput } from "@/helpers/index";
import { AnimatePresence } from "framer-motion";
import TableCellErrorMessage from "./TableCellErrorMessage";
import { Input } from "../ui/input";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

export default function TableCell({ record, column, handleSave }) {
  const [editingCell, setEditingCell] = useState({});
  const [inputError, setInputError] = useState("");

  const cellRef = useRef(null);
  const inputRef = useRef(null);
  useOnClickOutside(cellRef, () => {
    handleCancelEditCell();
  });
  useKeyDown(() => {
    if (editingCell.value) handleCancelEditCell();
  }, ["Escape"]);

  const resetInputState = () => {
    setInputError("");
    setEditingCell({});
  };
  const handleEditCell = (e, rowId, field, value) => {
    e.stopPropagation();
    setEditingCell({ rowId, field, value });
  };

  const handleCancelEditCell = (e) => {
    if (e) e.stopPropagation();
    inputRef.current?.blur();
    resetInputState();
  };

  const handleValidation = (e, rowId, field, value) => {
    e.stopPropagation();
    const error = validateInput(field, value);
    if (error) {
      inputRef.current?.focus();
      setInputError(error);
      setTimeout(() => setInputError(""), 3000);
      return;
    }
    handleSave(rowId, field, value);
    handleCancelEditCell();
  };

  return (
    <td className="px-4 py-3">
      {editingCell.rowId === record.id && editingCell.field === column.label ? (
        <div ref={cellRef} className="relative">
          <div className="absolute inset-y-0 end-1 flex items-center gap-0.5">
            <button onClick={handleCancelEditCell}>
              <IoCloseCircle
                size={20}
                className="text-foreground/30 transition-colors hover:text-foreground/50"
              />
            </button>
            <button
              onClick={(e) =>
                handleValidation(e, record.id, column.label, editingCell.value)
              }
            >
              <IoCheckmarkCircle
                size={20}
                className="text-success/80 transition-colors hover:text-success"
              />
            </button>
          </div>
          <AnimatePresence>
            {inputError && <TableCellErrorMessage message={inputError} />}
          </AnimatePresence>
          <Input
            ref={inputRef}
            type={column.label === "birthday" ? "date" : "text"}
            value={editingCell.value}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) =>
              setEditingCell({
                ...editingCell,
                value: e.target.value,
              })
            }
            className="h-6 min-w-fit pl-2 pr-14"
            autoFocus
          />
        </div>
      ) : (
        <div
          title={`${record[column.label] ? "Edit" : "Add"} ${column.label}`}
          onClick={(e) =>
            handleEditCell(e, record.id, column.label, record[column.label])
          }
          className={`cursor-pointer transition-colors hover:text-primary ${record[column.label] ? "w-fit" : "h-5 w-16"}`}
        >
          <span>{record[column.label]}</span>
        </div>
      )}
    </td>
  );
}
