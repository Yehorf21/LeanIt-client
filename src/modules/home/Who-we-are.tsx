import { sectionContext } from "../../helpers";

export const WhoWeAre = () => {
  return (
    <section className="padding margin-top flex flex-col gap-11">
      {sectionContext.map((section, i) => (
        <article key={section.title} className="flex flex-col lg:flex-row lg:justify-between">
          <div className={`flex flex-col gap-8 lg:gap-10 lg:max-w-[500px] xl:max-w-[608px] who-we-are-text-${i + 1}`}>
            <h2 className="font-secondary text-primary text-32 sm:text-64">{section.title}</h2>

            <p className="font-main text-text-primary text-20 sm:text-24">{section.text}</p>
          </div>

          {/* Image */}
          <div className={`h-[70vw] w-[90vw] bg-no-repeat bg-contain max-h-[500px] lg:max-w-[550px] who-we-are-${i + 1}`} />
        </article>
      ))}
    </section>
  );
};
