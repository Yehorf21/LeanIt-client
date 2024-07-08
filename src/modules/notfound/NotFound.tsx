export interface Props {
  type: 'inDevelopment' | 'nonExistent' | 'notLoggedIn';
}

export const NotFound: React.FC<Props> = ({ type }) => {
  const data = {
    inDevelopment: {
      text: `Looks like you’ve ventured into an area that’s still under construction. But don’t worry, we’re building something amazing here! Check back soon to see the final masterpiece.`,
      image: 'inDevelopment',
    },
    nonExistent: {
      text: `Looks like you got lost in the depths of our site. Don't worry, we'll find the way out together!`,
      image: 'notFound',
    },
    notLoggedIn: {
      text: `Looks like you haven't logged in yet. This content will be available after!`,
      image: 'inDevelopment',
    },
  };

  return (
    <section className="padding my-10 h-fit lg:h-[80vh] flex flex-col items-center gap-5 sm:gap-6 lg:gap-10">
      <p className="max-w-[608px] font-main text-20 lg:text-24 text-text-primary text-center">
        {data[type].text}
      </p>

      <img
        src={`/images/${data[type].image}.png`}
        alt="not-found-image"
        className="max-h-[346px] max-w-[713px] h-[50vw] w-[80vw] object-contain"
      />

      <a
        href="/"
        className="lg:mt-2 px-12 sm:px-20 lg:px-[112.5px] h-12 lg:h-16 flex justify-center items-center bg-primary rounded-[100px] font-main text-16 lg:text-20 text-white uppercase font-semibold"
      >
        Return to Home
      </a>
    </section>
  );
};
