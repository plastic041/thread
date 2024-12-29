"use client";

import UploadcareImage from "@uploadcare/nextjs-loader";

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
    <li className="flex">
      <UploadcareImage
        alt="Test image"
        className="[view-transition-name:img]"
        src={`https://ucarecdn.com/${post.imageuuid}/-/resize/800x/`}
        width="400"
        height="400"
      />
      {/* <time className="text-neutral-600 ml-auto">
        {dtf.format(new Date(post.createdAt))}
      </time>
      <div>
        <span className="text-neutral-500">@{post.username}</span>
        <span className="text-neutral-900"> {post.content}</span>
      </div> */}
    </li>
  );
}
