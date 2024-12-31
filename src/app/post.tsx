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
        src={`https://ucarecdn.com/${post.imageuuid}/`}
        width="100"
        height="100"
      />
    </li>
  );
}
