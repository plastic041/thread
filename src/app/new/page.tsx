import { NewPostForm } from "@/app/new/form";
import { getCurrentSession } from "@/lib/session";
import { ToLogin } from "./to-login";

export default async function NewPost() {
  const { user } = await getCurrentSession();
  if (user === null) {
    return <ToLogin />;
  }

  return <NewPostForm userId={user.id} />;
}
