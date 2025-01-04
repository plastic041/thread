import { NewPostDialog } from "@/app/new/dialog";
import { ToLogin } from "@/app/new/to-login";
import { getCurrentSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { user } = await getCurrentSession();

  if (user === null) {
    return <ToLogin />;
  }

  return <NewPostDialog userId={user.id} />;
}
