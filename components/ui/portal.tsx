"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
export function Portal({ containerId, children }) {
  const [portal, setPortal] = useState(null);
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (container) {
      setPortal(createPortal(children, container));
    }
  }, [children, containerId]);
  return portal;
}
