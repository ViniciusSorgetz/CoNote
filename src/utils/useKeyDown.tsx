import { useEffect } from "react";

export default function useKeyDown(callback: () => void, keys: string[]) {
  const onKeyDown = (event: KeyboardEvent) => {
    const wasAnyKeyPressed = keys.some((key) => key == event.key);

    if (wasAnyKeyPressed) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);
}
