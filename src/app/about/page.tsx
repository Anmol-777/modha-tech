import BackButton from "@/components/BackButton";
import PlaceholderImage from "@/components/PlaceholderImage";
import { siteConfig } from "@/data/content";

export const metadata = {
  title: "About Us",
  description: "The story of Modha Technologies and our mission to empower handloom weavers.",
};

export default function AboutPage() {
  const { aboutStory } = siteConfig;

  return (
    <div>
      <section className="bg-gray-800 px-4 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-center gap-3">
            <BackButton href="/" />
          </div>
          <h1 className="text-center text-sm text-black md:text-base">{aboutStory.title}</h1>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-3xl space-y-4 px-4 text-xs leading-relaxed md:px-6 md:text-sm">
          {aboutStory.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="py-4 md:py-8">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-[176px_1fr] md:px-6">
          <PlaceholderImage
            src="/images/about-machine.jpg"
            alt="Modha Pedal Operating Machine"
            className="h-44 w-full md:h-[171px] md:w-[176px]"
            rounded="md"
          />
          <div className="space-y-3 text-xs leading-relaxed md:text-sm">
            {aboutStory.machineIntro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-4 md:py-8">
        <div className="mx-auto max-w-3xl space-y-4 px-4 text-xs leading-relaxed md:px-6 md:text-sm">
          {aboutStory.closing.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="section-label mb-4">Impact on weavers</h2>

          <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-md bg-gray-500 md:h-[185px]">
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-white"
              aria-label="Play impact video"
            >
              <span className="ml-1 text-lg">▶</span>
            </button>
          </div>
        </div>
      </section>

      <section className="bg-gray-500 py-8 md:py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2 md:px-6">
          <div className="space-y-4 text-xs leading-relaxed md:text-sm">
            <div>
              <h3 className="mb-1 font-medium">Vision</h3>
              <p>{aboutStory.vision}</p>
            </div>
            <div>
              <h3 className="mb-1 font-medium">Mission</h3>
              <p>{aboutStory.mission}</p>
            </div>
          </div>

          <PlaceholderImage
            src="/images/vision.jpg"
            alt="Weavers at work"
            className="h-52 w-full md:h-[216px]"
            rounded="md"
          />
        </div>
      </section>
    </div>
  );
}
