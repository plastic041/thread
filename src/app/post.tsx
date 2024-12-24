"use client";

import UploadcareImage from "@uploadcare/nextjs-loader";
import { dtf } from "./datetime-format";

type PostProps = {
  post: {
    postId: number;
    content: string | null;
    imageuuid: string;
    createdAt: Date;
    userId: number;
    username: string | null;
  };
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
      <time className="text-neutral-600 ml-auto">
        {dtf.format(new Date(post.createdAt))}
      </time>
      <div>
        <span className="text-neutral-500">@{post.username}</span>
        <span className="text-neutral-900"> {post.content}</span>
      </div>
    </li>
  );
}
