import { useEffect } from "react";

export const useKeyDown = (callback, keys) => {
  useEffect(() => {
    const onKeyDown = (event) => {
      const keysPressed = keys.some((key) => event.key === key);
      if (keysPressed) {
        event.preventDefault();
        callback();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [callback, keys]);
};
