"use client";

import { postsTable } from "@/drizzle/schema";
import UploadcareImage from "@uploadcare/nextjs-loader";

type PostItemProps = {
  post: typeof postsTable.$inferSelect;
};
export function PostItem({ post }: PostItemProps) {
  return (
    <li className="contents">
      <UploadcareImage
        alt="Test image"
        className={`[view-transition-name:img-${post.id}] object-cover aspect-square mx-auto`}
        src={`https://ucarecdn.com/${post.imageuuid}/`}
        width="200"
        height="200"
        referrerPolicy="no-referrer"
      />
    </li>
  );
}
