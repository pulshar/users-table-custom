import TableCell from "./TableCell";
import Modal from "../Modal";
import UserDetails from "../UserDetails";
import { useModal } from "../../hooks/useModal";
import { AnimatePresence } from "framer-motion";
import useUsersStore from "../../store/store";

export default function TableBody({ paginatedData, columns }) {
  const setUserDetails = useUsersStore((state) => state.setUserDetails);

  const { openModal, closeModal, currentModal } = useModal();

  const handleShowUserDetails = (user) => {
    setUserDetails(user);
    openModal("userDetails");
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
              <TableCell key={column.label} record={record} column={column} />
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
        {currentModal === "userDetails" && (
          <Modal title="User details" onClose={closeModal}>
            <UserDetails onClose={closeModal} />
          </Modal>
        )}
      </AnimatePresence>
    </tbody>
  );
}
