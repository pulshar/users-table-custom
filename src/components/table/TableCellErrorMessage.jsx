import { motion } from "framer-motion";

export default function TableCellErrorMessage({ message }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 w-[102%] -translate-x-1/2 -translate-y-1/2 transform rounded bg-red-500 px-2 py-1.5 text-xs font-semibold text-background"
      initial={{ opacity: 0, x: "-45%", y: "-50%" }}
      animate={{ opacity: 1, x: "-50%" }}
      exit={{ opacity: 0 }}
    >
      {message}
    </motion.div>
  );
}
