"use client";

import { postsTable } from "@/drizzle/schema";
import UploadcareImage from "@uploadcare/nextjs-loader";
import { dtf } from "./datetime-format";

type PostProps = {
  post: typeof postsTable.$inferSelect;
};
export function Post({ post }: PostProps) {
  return (
    <li className="bg-white p-2 grid grid-cols-1 shadow-md">
      <UploadcareImage
        alt="Test image"
        src={`https://ucarecdn.com/${post.imageuuid}/`}
        width="400"
        height="400"
      />
      <time className="text-neutral-600">
        {dtf.format(new Date(post.createdAt))}
      </time>
      <p className="text-xl text-neutral-900">{post.content}</p>
    </li>
  );
}
