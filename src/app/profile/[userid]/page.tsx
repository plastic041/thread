import { Suspense } from "react";
import { Image } from "lucide-react";
import { ProfileLoader } from "@/app/profile/[userid]/profile-loader";

export default async function Page({
  params,
}: {
  params: Promise<{ userid: string }>;
}) {
  const userId = Number((await params).userid);

  return (
    <Suspense
      fallback={
        <div className="flex flex-col p-2 gap-2">
          <div className="grid grid-cols-3 rounded bg-white shadow-md p-4 shrink-0">
            <div className="col-span-1 grid place-content-center">
              <div className="rounded-full size-24 aspect-square bg-neutral-200" />
            </div>
            <div className="flex flex-col px-4 gap-2 col-span-2">
              <span className="w-28 h-6 bg-neutral-200 animate-pulse" />
              <div className="flex flex-row gap-2 items-center">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image size={20} />
                <span className="w-20 h-5 bg-neutral-200 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      }
    >
      <ProfileLoader userId={userId} />
    </Suspense>
  );
}
