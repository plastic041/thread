"use client";

import { postsTable } from "@/drizzle/schema";
import UploadcareImage from "@uploadcare/nextjs-loader";

type PostProps = {
  post: typeof postsTable.$inferSelect;
};
export function Post({ post }: PostProps) {
  return (
    <li className="flex">
      <UploadcareImage
        alt="Test image"
        className="[view-transition-name:img]"
        src={`https://ucarecdn.com/${post.imageuuid}/`}
        width="100"
        height="100"
        referrerPolicy="no-referrer"
      />
    </li>
  );
}
