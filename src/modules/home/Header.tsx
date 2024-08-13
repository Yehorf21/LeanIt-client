export const Header = () => {
  return (
    <section className="padding header-shape flex justify-center pt-[148px] pb-[148px] sm:py-20 relative">
      {/* Left letter image */}
      <div className="header-left bg-no-repeat bg-contain z-10 h-[50vw] sm:h-[40vw] max-h-[414px] w-[55vw] sm:w-[45vw] max-w-[497px] absolute left-0 top-0 sm:-bottom-40 sm:top-[unset]" />

      <div className="flex flex-col z-20 items-center max-w-[500px] lg:max-w-[800px]">
        <h1 className="font-secondary text-primary text-80 sm:text-130 lg:text-180 text-center">LeanIt</h1>

        <p className="font-main text-text-primary text-20 lg:text-24 text-center">
          A cozy collection of useful resources to start your English learning
          journey is all gathered here. Study at your own pace, improvise along
          the way, and don't let your school teacher see this.
        </p>

        <a href="#pages" className="mt-8 flex justify-center items-center h-14 w-[85vw] max-w-[398px] bg-primary rounded-[100px] text-[#FFFDFD] font-main text-16 lg:text-20 font-semibold uppercase">Say no more - let's go!</a>
      </div>

      {/* Right letter image */}
      <div className="header-right bg-no-repeat bg-contain z-10 h-[60vw] sm:h-[50vw] max-h-[540px] w-[56vw] sm:w-[43vw] max-w-[480px] absolute -right-10 lg:-right-20 -bottom-20 sm:top-0" />
    </section>
  );
};
