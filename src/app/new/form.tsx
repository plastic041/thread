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
import { Image, Loader2Icon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  content: z.string().min(0).max(140),
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
      image: null,
      content: "",
    },
  });
  const fileList = form.watch("image");
  const imageURL =
    fileList && fileList.length > 0
      ? window.URL.createObjectURL(fileList[0])
      : "";

  const imageRef = form.register("image");

  // 2. Define a submit handler.
  async function onSubmit({ content, image }: z.infer<typeof formSchema>) {
    const fileList = image as FileList;
    const result = await uploadFile(fileList[0], {
      publicKey: "b038a00ca5884d2edac5",
      store: "auto",
    });

    const postResponse = await fetch("api/new-post", {
      method: "POST",
      body: JSON.stringify({ content, uuid: result.uuid, userId }),
    });
    const post = await postResponse.json();

    redirect(`/posts/${post.id}`);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-8 p-4 bg-white"
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex">
                  {field.value ? (
                    <div className="grid">
                      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
                      <img
                        className="[grid-area:1/1] rounded"
                        src={imageURL}
                        aria-hidden
                        onLoad={() => URL.revokeObjectURL(imageURL)}
                      />
                      <div className="[grid-area:1/1] flex items-start justify-end p-2">
                        <Button
                          size="icon"
                          variant="outline"
                          // className="bg-white/50 rounded-full size-12 grid place-items-center"
                          onClick={() => {
                            form.resetField("image");
                          }}
                        >
                          <X size={32} />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button asChild size="lg" className="w-full">
                      <label htmlFor="file-upload" aria-hidden>
                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                        <Image />
                      </label>
                    </Button>
                  )}
                  <input
                    type="file"
                    {...imageRef}
                    accept="image/*"
                    id="file-upload"
                    className="sr-only"
                  />
                </div>
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
                  placeholder="What's happening?"
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
              router.push("/");
            }}
            variant="outline"
            disabled={form.formState.isSubmitting}
          >
            Cancel
          </Button>
          <Button
            className="ml-auto grid"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
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
