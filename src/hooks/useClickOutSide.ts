"use client";
import { useEffect, useRef } from "react";

export default function useClickOutSide<T extends HTMLElement = any>(
  handler: () => void,
  events: (keyof DocumentEventMap)[] = ["click"],
  nodes: HTMLElement[] = []
): React.RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    // Function to handle clicks outside of the nodes
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // Check if the clicked target is outside the nodes (including the ref)
      const isOutside =
        !ref.current?.contains(event.target as Node) &&
        !nodes.some((node) => node.contains(event.target as Node));
      if (isOutside) {
        handler();
      }
    };

    // Attach event listeners for all specified events
    events.forEach((event) => {
      document.addEventListener(event, handleClickOutside as EventListener);
    });

    // Cleanup function to remove event listeners
    return () => {
      events.forEach((event) => {
        document.removeEventListener(
          event,
          handleClickOutside as EventListener
        );
      });
    };
  }, [handler, events, nodes]);

  return ref;
}
