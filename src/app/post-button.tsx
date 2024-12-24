import Link from "next/link";
import { PencilIcon } from "lucide-react";

export function PostButton() {
  return (
    <Link
      href="/new"
      className="shadow-xl size-16 bg-white rounded-full grid place-content-center"
    >
      <PencilIcon />
    </Link>
  );
}
