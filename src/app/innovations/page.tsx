import BackButton from "@/components/BackButton";
import InnovationList from "@/components/InnovationList";
import { getInnovations } from "@/lib/api";

export const metadata = {
  title: "Innovations",
  description: "Explore Modha Technologies patented and pending innovations for handloom weaving.",
};

export default async function InnovationsPage() {
  const innovations = await getInnovations();

  return (
    <div className="py-6 md:py-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-6 flex items-center gap-3">
          <BackButton href="/" />
          <h1 className="flex-1 text-center text-sm md:text-base">Innovations</h1>
          <div className="w-7" />
        </div>

        <InnovationList innovations={innovations} />
      </div>
    </div>
  );
}
