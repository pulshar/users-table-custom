import TableCell from "./TableCell";
import { useModal } from "../../hooks/useModal";
import Modal from "../Modal";
import { useState } from "react";
import UserDetails from "../UserDetails";
import { AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { capitalize } from "@/helpers/index";

export default function TableBody({ paginatedData, columns, setTableData }) {
  const [userData, setUserData] = useState({});
  // modals
  const { modal, toggleModal } = useModal();

  const handleSave = (recordId, field, value) => {
    setTableData((prevData) =>
      prevData.map((record) =>
        record.id === recordId ? { ...record, [field]: value } : record,
      ),
    );
    toast({
      variant: "success",
      title: "User updated",
      description: `${capitalize(field)} data was updated successfully.`,
    });
  };

  const handleShowUserDetails = (user) => {
    setUserData(user);
    toggleModal();
  };

  return (
    <tbody>
      {paginatedData.length > 0 ? (
        paginatedData.map((record) => (
          <tr
            onClick={() => handleShowUserDetails(record)}
            key={record.id}
            className="border-t bg-input hover:bg-background/10"
          >
            {columns.map((column) => (
              <TableCell
                key={column.label}
                record={record}
                column={column}
                handleSave={handleSave}
              />
            ))}
          </tr>
        ))
      ) : (
        <tr className="border-t bg-input text-center align-middle">
          <td className="h-20 p-3" colSpan={columns.length}>
            No results found!
          </td>
        </tr>
      )}
      <AnimatePresence>
        {modal && (
          <Modal title="User details" toggleModal={toggleModal}>
            <UserDetails data={userData} toggleModal={toggleModal} />
          </Modal>
        )}
      </AnimatePresence>
    </tbody>
  );
}
