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

const formSchema = z.object({
  content: z.string().min(1).max(140),
  image: typeof window === "undefined" ? z.any() : z.instanceof(FileList),
});

export default function NewPost() {
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
      body: JSON.stringify({ content, uuid: result.uuid }),
    });

    redirect("/");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
