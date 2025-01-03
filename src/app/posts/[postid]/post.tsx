"use client";

import UploadcareImage from "@uploadcare/nextjs-loader";
import { dtf } from "@/app/datetime-format";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PostMenu } from "@/app/posts/[postid]/post-menu";

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
  const [clicked, setClicked] = useState(false);

  return (
    <div className="flex flex-col gap-2 [grid-area:1/1]">
      <div className="animate-fadein p-2 bg-white flex flex-col shadow-md">
        <div className="relative">
          <UploadcareImage
            alt="Test image"
            className="[view-transition-name:img]"
            src={`https://ucarecdn.com/${post.imageuuid}/`}
            width="400"
            height="400"
            referrerPolicy="no-referrer"
          />
          <div
            role="button"
            onClick={() => setClicked((p) => !p)}
            className={cn(
              "grid items-start justify-end absolute inset-0 bg-white/50 transition-opacity duration-75 p-2",
              clicked ? "opacity-100" : "opacity-0"
            )}
          >
            {clicked && <PostMenu postId={post.postId} />}
          </div>
        </div>
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
