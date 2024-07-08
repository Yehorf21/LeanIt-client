export const WhoWeAre = () => {
  const sectionContext = [
    {
      title: 'Who we are',
      text: `We're a small team of developers who wanted to work on something cool through and through. Learning another language is quite a complex topic, but let’s think of it as collecting a puzzle - every new word, grammar structure, pronunciation example, and you have a solid image of what is going on. Remember how you learned to talk as a kid? You took baby steps, picked up new words, and now you're fluent. Here, you'll do something like that.`,
    },
    {
      title: 'What we do',
      text: `Tho a portfolio project, we wanted to make this useful and fun. Ever thought that looking for learning resources was long and frustrating? Well, we collected it all here and made a summary to make your sailing smoother! Delve right into the most popular grammar topics, interesting videos and any other cool stuff we’ve got in store.`,
    },
  ];
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
