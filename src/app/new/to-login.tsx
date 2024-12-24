"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ToLogin() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return null;
}
