import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { ExploreMore } from '../explore-more/ExploreMore';
import { useAppSelector } from '../../store/hooks';

export const ResourcesPage = () => {
  const { pickedCard } = useAppSelector(state => state.cards);
  const { title, imageUrl, description, href } = pickedCard;

  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <section
      className="padding flex flex-col lg:px-[100px] pt-[100px] pb-[100px] lg:pt-[200px]"
      id="resources-top"
    >
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-10">
        {!isDesktop ? (
          <>
            {/* Title wrapper */}
            <div className="flex flex-col gap-5">
              <button
                className="arrow-left bg-no-repeat bg-contain h-4 sm:h-8 w-4 sm:w-8"
                onClick={handleGoBack}
              />

              <h3 className="font-secondary text-32 sm:text-48 lg:text-64 max-w-[450px] text-primary uppercase">
                {title}
              </h3>
            </div>

            <div className="flex flex-col gap-6 items-center max-w-[450px] self-center">
              <a
                className="w-[90vw] max-w-[450px] border-[10px] border-[#C8ACFD] rounded-[24px]"
                href={href}
                target="_blank"
              >
                <img
                  className="w-[100%] h-[100%] object-cover rounded-[16px]"
                  src={imageUrl}
                  alt="picked-card-image"
                />
              </a>

              <p className="font-main text-20 text-text-secondary">
                {description}
              </p>

              <a
                className="mt-3 flex justify-center items-center h-14 w-[100%] bg-primary rounded-[100px] font-main text-white font-semibold uppercase"
                href={href}
                target="_blank"
              >
                Peek Inside!
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-10 w-[40vw] max-w-[600px]">
              {/* Title wrapper */}
              <div className="flex gap-5">
                <button
                  className="arrow-left bg-no-repeat bg-contain h-8 w-8"
                  onClick={handleGoBack}
                />

                <h3 className="font-secondary text-48 desktop:text-64 text-primary uppercase">
                  {title}
                </h3>
              </div>

              <p className="font-main text-20 text-text-secondary max-w-[500px]">
                {description}
              </p>

              <a
                className="mt-10 flex justify-center items-center h-16 w-[100%] bg-primary rounded-[100px] font-main text-white font-semibold uppercase"
                href={href}
                target="_blank"
              >
                Peek Inside!
              </a>
            </div>

            <a
              className="w-[40vw] max-w-[608px] h-[25vw] max-h-[400px] border-[10px] border-[#C8ACFD] rounded-[24px]"
              href={href}
              target="_blank"
            >
              <img
                className="w-[100%] h-[100%] object-cover rounded-[16px]"
                src={imageUrl}
                alt="picked-card-image"
              />
            </a>
          </>
        )}
      </div>

      <ExploreMore type="resources" />
    </section>
  );
};

export default ResourcesPage;