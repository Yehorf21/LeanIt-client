import { contributorsContext } from "../../helpers";

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="padding pt-[220px] lg:pt-[300px] pb-8 lg:pb-10 relative flex flex-col lg:flex-row gap-6 footer-shape">
      {/* Logo */}
      <button
        className="logo bg-no-repeat bg-contain h-12 lg:h-[88px] w-40 lg:w-[292px] sm:ml-20 lg:ml-0 lg:mr-[7.8vw] lg:relative bottom-[120px]"
        onClick={handleScrollToTop}
      />

      {/* Contributors */}
      <div className="flex flex-col gap-2 lg:gap-4 sm:ml-20 lg:ml-0 lg:items-center z-10">
        <div className="flex flex-col gap-2">
          {contributorsContext.map((contributor) => (
            <a
              href={contributor.link}
              className="flex gap-6"
              key={contributor.name}
              target="_blank"
            >
              <p className="font-main text-16 lg:text-20 text-primary uppercase font-semibold w-[85px] lg:w-[106px]">
                {contributor.role}
              </p>

              <p className="font-main text-16 lg:text-20 text-primary uppercase font-semibold">
                {contributor.name}
              </p>
            </a>
          ))}
        </div>

        <p className="font-main text-16 lg:text-20 text-primary font-semibold">
          © 2024
        </p>
      </div>

      {/* Letter */}
      <div className="footer absolute top-0 lg:-top-10 right-0 bg-no-repeat bg-contain w-[55vw] lg:w-[30vw] max-w-[300px] lg:max-w-[400px] h-[70vw] lg:h-[45vw] max-h-[400px] lg:max-h-[500px]" />
    </section>
  );
};
