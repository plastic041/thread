"use client";

import UploadcareImage from "@uploadcare/nextjs-loader";
import { dtf } from "@/app/datetime-format";

type PostProps = {
  post: {
    postId: number;
    content: string | null;
    imageuuid: string;
    createdAt: Date;
    userId: number;
    username: string;
  };
};
export function Post({ post }: PostProps) {
  return (
    <div className="flex flex-col p-4 gap-2">
      <div className="animate-fadein p-2 bg-white flex flex-col shadow-md">
        <UploadcareImage
          alt="Test image"
          className="[view-transition-name:img]"
          src={`https://ucarecdn.com/${post.imageuuid}/`}
          width="400"
          height="400"
        />
        <time
          dateTime={post.createdAt.toISOString()}
          className="text-neutral-500 ml-auto italic"
          suppressHydrationWarning
        >
          {dtf.format(new Date(post.createdAt))}
        </time>
      </div>
      <div className="text-lg">
        <span className="text-neutral-500">@{post.username}</span>
        <span className="text-neutral-900"> {post.content}</span>
      </div>
    </div>
  );
}
