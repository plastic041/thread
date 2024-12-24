import { NewPostForm } from "@/app/new/form";
import { ToLogin } from "@/app/new/to-login";
import { getCurrentSession } from "@/lib/session";

export default async function Page() {
  const { user } = await getCurrentSession();

  if (user === null) {
    return <ToLogin />;
  }

  return (
    <div className="fixed inset-0 bg-neutral-400/50 animate-blur p-6 flex flex-col">
      <div className="bg-white shadow rounded">
        <NewPostForm userId={user.id} />
      </div>
    </div>
  );
}
