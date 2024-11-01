"use client";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
export default function LogoutPage() {
  useEffect(() => {
    (async () => {
      await signOut();
    })();
  }, []);
  return null;
}
