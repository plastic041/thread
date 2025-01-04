import { NewPostForm } from "@/app/new/form";
import { getCurrentSession } from "@/lib/session";
import { ToLogin } from "./to-login";

export const dynamic = "force-dynamic";

export default async function NewPost() {
  const { user } = await getCurrentSession();

  if (user === null) {
    return <ToLogin />;
  }

  return (
    <div className="my-2 rounded overflow-hidden shadow">
      <NewPostForm userId={user.id} />
    </div>
  );
}
