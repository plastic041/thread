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
    <div className="flex flex-col p-2">
      <UploadcareImage
        alt="Test image"
        className="[view-transition-name:img]"
        src={`https://ucarecdn.com/${post.imageuuid}/-/resize/800x/`}
        width="400"
        height="400"
      />
      <div className="flex flex-col animate-fadein">
        <time className="text-neutral-500 ml-auto" suppressHydrationWarning>
          {dtf.format(new Date(post.createdAt))}
        </time>
        <div>
          <span className="text-neutral-500 text-lg">@{post.username}</span>
          <span className="text-neutral-900"> {post.content}</span>
        </div>
      </div>
    </div>
  );
}
