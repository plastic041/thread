"use client";

import { useRouter } from "next/navigation";
import { NewPostForm } from "@/app/new/form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

type NewPostDialogProps = {
  userId: number;
};
export function NewPostDialog({ userId }: NewPostDialogProps) {
  const router = useRouter();

  return (
    <Dialog
      defaultOpen
      onOpenChange={(state) => {
        if (state === false) {
          router.push("/");
        }
      }}
    >
      <VisuallyHidden.Root>
        <DialogTitle>New Post</DialogTitle>
      </VisuallyHidden.Root>
      <DialogContent className="max-h-full overflow-y-auto max-w-lg mx-auto w-full p-0">
        <NewPostForm userId={userId} />
      </DialogContent>
    </Dialog>
  );
}
