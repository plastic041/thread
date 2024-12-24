import { NewPostForm } from "@/app/new/form";

export default function Page() {
  return (
    <div className="fixed inset-0 bg-neutral-400/50 animate-blur p-6 flex flex-col">
      <div className="bg-white shadow rounded">
        <NewPostForm />
      </div>
    </div>
  );
}
