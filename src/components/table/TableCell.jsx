import { useRef, useState } from "react";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { useOnClickOutside } from "../../hooks/useClickOutside";
import { Input } from "../ui/input";
import useUsersStore from "../../store/store";
import { toast } from "@/hooks/use-toast";
import { capitalize } from "@/helpers/index";

export default function TableCell({ record, column }) {
  const [editingCell, setEditingCell] = useState({});
  const updateUser = useUsersStore((state) => state.updateUser);

  const cellRef = useRef(null);
  useOnClickOutside(cellRef, () => {
    handleCancelEditCell();
  });
  const handleEditCell = (e, rowId, field, value) => {
    e.stopPropagation();
    setEditingCell({ rowId, field, value });
  };

  const handleCancelEditCell = (e) => {
    if (e) e.stopPropagation();
    setEditingCell({});
  };

  const handleSaveChange = (e, rowId, field, value) => {
    e.stopPropagation();
    updateUser(rowId, field, value);
    handleCancelEditCell();
    toast({
      variant: "success",
      title: "User updated",
      description: `${capitalize(field)} data was updated successfully.`,
    });
  };

  return (
    <td className="px-4 py-3">
      {editingCell.rowId === record.id && editingCell.field === column.label ? (
        <div ref={cellRef} className="relative">
          <div className="absolute inset-y-0 end-1.5 flex items-center gap-0.5">
            <button onClick={handleCancelEditCell}>
              <IoCloseCircle
                size={20}
                className="text-foreground/30 transition-colors hover:text-foreground/50"
              />
            </button>
            <button
              onClick={(e) =>
                handleSaveChange(e, record.id, column.label, editingCell.value)
              }
            >
              <IoCheckmarkCircle
                size={20}
                className="text-success/80 transition-colors hover:text-success"
              />
            </button>
          </div>
          <Input
            type="text"
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
          className={`cursor-pointer ${record[column.label] ? "w-fit" : "h-5 w-16"}`}
        >
          <span>{record[column.label]}</span>
        </div>
      )}
    </td>
  );
}
