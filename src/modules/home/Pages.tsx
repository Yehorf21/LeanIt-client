import { pageCardContext } from "../../helpers";
import { Link } from "../link/Link";

export const Pages = () => {
  return (
    <section id="pages" className="padding margin-top relative pages-shape">
      <div className="flex flex-col gap-10 sm:gap-[60px] lg:gap-20">
        {pageCardContext.map((pageCard) => (
          <article
            className="flex flex-col items-center gap-10 w-[100%] bg-additional-light py-14 px-6 rounded-[24px]"
            key={pageCard.page}
          >
            <h1 className="font-secondary text-48 lg:text-130 text-primary uppercase">
              {pageCard.page}
            </h1>

            <div className="flex flex-col items-center sm:max-w-[500px] lg:max-w-[800px]">
              <div className="flex flex-col items-center lg:items-start lg:flex-row">
                {/* Quotes */}
                <div className="quotes h-10 lg:h-20 w-10 lg:w-20 lg: bg-no-repeat bg-contain" />

                <h4 className="font-secondary text-28 lg:text-38 font-semibold text-text-primary text-center lg:max-w-[700px]">
                  {pageCard.title}
                </h4>
              </div>

              <p className="mt-8 font-main text-20 lg:text-24 text-text-secondary text-center">
                {pageCard.text}
              </p>
            </div>

            <Link
              path={`/${pageCard.page}`}
              className="flex items-center justify-center h-14 lg:h-16 w-[100%] sm:w-[50vw] sm:max-w-[398px] bg-additional rounded-[100px] font-main text-16 lg:text-20 text-primary font-semibold uppercase"
            >
              Get started
            </Link>
          </article>
        ))}
      </div>

      {/* Test your English section */}
      <div className="margin-top pb-[200px] relative flex flex-col items-center gap-8 sm:gap-10">
        <div className="test-your-English-left absolute top-0 left-0 -z-10 bg-no-repeat bg-contain h-[50vw] w-[50vw] max-w-[355px] max-h-[575px]" />

        <h3 className="mt-32 font-secondary font-semibold text-32 lg:text-64 text-primary uppercase">
          Test your English
        </h3>

        <a
          href="https://www.efset.org/"
          className="flex items-center justify-center gap-2 w-[90vw] h-14 lg:h-16 max-w-[398px] bg-primary rounded-[100px]"
          target="_blank"
        >
          <p className="font-main font-semibold text-16 lg:text-20 text-white uppercase">Go to test</p>

          <div className="chevron-light bg-no-repeat bg-contain h-4 sm:h-6 w-4 sm:w-6" />
        </a>

        <p className="font-main text-14 lg:text-16 text-text-secondary text-center max-w-[398px]">
          Gather the letters on the page into a meaningful phrase - and prove to
          everyone that you're incredibly awesome!
        </p>

        <div className="test-your-English-right absolute bottom-0 right-0 sm:-right-32 -z-10 bg-no-repeat bg-contain h-[50vw] w-[50vw] max-w-[441px] max-h-[350px]"></div>
      </div>
    </section>
  );
};
