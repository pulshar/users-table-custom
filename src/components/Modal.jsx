import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useOnClickOutside } from "../hooks/useClickOutside";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { Button } from "./ui/button";

const animOverlay = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
const animDialog = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: { opacity: 0, scale: 0.95 },
};

export default function Modal({ title, onClose, children }) {
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, () => {
    onClose();
  });

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <motion.div
      variants={animOverlay}
      initial="initial"
      animate="animate"
      exit="exit"
      role="dialog"
      className="fixed inset-0 z-20 flex items-center justify-center bg-foreground/70 px-4 dark:bg-background/80"
    >
      <motion.div
        variants={animDialog}
        initial="initial"
        animate="animate"
        exit="exit"
        ref={modalRef}
        className="relative max-w-[800px] rounded-lg border bg-background p-6 shadow sm:min-w-[425px]"
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 rounded-full"
          onClick={onClose}
        >
          <IoClose />
        </Button>

        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        {children}
      </motion.div>
    </motion.div>,
    document.getElementById("modal-root"),
  );
}
