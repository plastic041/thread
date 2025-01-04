"use client";

import { Image } from "lucide-react";

type InfoProps = {
  username: string;
  picture: string;
  imageCount: number;
};
export function Info({ username, picture, imageCount }: InfoProps) {
  return (
    <div className="grid grid-cols-3 rounded bg-white shadow-md p-4 shrink-0">
      <div className="col-span-1 grid place-content-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={picture}
          alt={`${username}'s profile image`}
          className="rounded-full size-24 aspect-square"
          width={96}
          height={96}
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-col px-4 gap-2 col-span-2">
        <span className="text-2xl leading-6">{username}</span>
        <div className="flex flex-row gap-2 items-center">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image size={20} />
          <span className="text-xl leading-5">{imageCount}</span>
        </div>
      </div>
    </div>
  );
}
