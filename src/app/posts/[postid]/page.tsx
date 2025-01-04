import { PostLoader } from "@/app/posts/[postid]/post-loader";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ postid: string }>;
}) {
  const { postid } = await params;

  return (
    <div className="p-4">
      <Suspense
        fallback={
          <div className="flex flex-col gap-2 [grid-area:1/1]">
            <div className="p-2 bg-white flex flex-col shadow-md gap-2">
              <div
                className={`[view-transition-name:img-${postid}] w-full bg-gray-200 mx-auto aspect-square`}
              />
              <div className="ml-auto w-28 bg-gray-200 animate-pulse h-4" />
            </div>
            <span className="w-28 animate-pulse h-7 bg-gray-200" />
          </div>
        }
      >
        <PostLoader postId={Number(postid)} />
      </Suspense>
    </div>
  );
}
