"use client";

import { uploadFile } from "@uploadcare/upload-client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  content: z.string().min(1).max(140),
  image: typeof window === "undefined" ? z.any() : z.instanceof(FileList),
});

type NewPostFormProps = {
  userId: number;
};
export function NewPostForm({ userId }: NewPostFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      content: "",
    },
  });

  const imageRef = form.register("image");

  // 2. Define a submit handler.
  async function onSubmit({ content, image }: z.infer<typeof formSchema>) {
    const fileList = image as FileList;
    const result = await uploadFile(fileList[0], {
      publicKey: "b038a00ca5884d2edac5",
      store: "auto",
    });

    await fetch("api/new-post", {
      method: "POST",
      body: JSON.stringify({ content, uuid: result.uuid, userId }),
    });

    redirect("/");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-8 p-4"
      >
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormControl>
                <input type="file" {...imageRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="..."
                  {...field}
                  rows={8}
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex ml-auto gap-x-2">
          <Button
            type="button"
            onClick={() => {
              router.back();
            }}
            variant="outline"
          >
            Cancel
          </Button>
          <Button className="ml-auto grid" type="submit">
            <span
              className={cn(
                "[grid-area:1/1]",
                form.formState.isSubmitting && "invisible"
              )}
            >
              Submit
            </span>
            <div className="[grid-area:1/1] grid place-content-center">
              <Loader2Icon
                className={cn(
                  "animate-spin [grid-area:1/1]",
                  !form.formState.isSubmitting && "invisible"
                )}
              />
            </div>
          </Button>
        </div>
      </form>
    </Form>
  );
}
