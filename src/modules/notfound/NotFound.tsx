import { notFoundPageData } from "../../helpers";
import { Link } from "../link/Link";

export interface Props {
  type: 'inDevelopment' | 'nonExistent' | 'notLoggedIn' | 'noFavorites';
}

export const NotFound: React.FC<Props> = ({ type }) => {
  return (
    <section className="padding my-10 h-fit lg:h-[80vh] flex flex-col items-center gap-5 sm:gap-6 lg:gap-10">
      <p className="max-w-[608px] font-main text-20 lg:text-24 text-text-primary text-center">
        {notFoundPageData[type].text}
      </p>

      <img
        src={`/images/${notFoundPageData[type].image}.png`}
        alt="not-found-image"
        className="max-h-[346px] max-w-[713px] h-[50vw] w-[80vw] object-contain"
      />

      <Link
        path="/"
        className="lg:mt-2 px-12 sm:px-20 lg:px-[112.5px] h-12 min-h-12 lg:h-16 lg:min-h-16 flex justify-center items-center bg-primary rounded-[100px] font-main text-16 lg:text-20 text-white uppercase font-semibold"
      >
        Return to Home
      </Link>
    </section>
  );
};
