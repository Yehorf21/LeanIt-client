import cn from 'classnames';

import { useState } from 'react';
import { AnkiCard } from '../../api/cards';

interface Props {
  card: AnkiCard;
  backgroundColor: string;
}

export const FlashCard: React.FC<Props> = ({ card, backgroundColor }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { imageUrl, front, back } = card;

  return (
    <article
      className={`self-start flex flex-col gap-6 p-4 w-[65vw] sm:w-[35vw] lg:w-[25vw] h-fit rounded-[24px]`}
      style={{
        backgroundColor,
      }}
    >
      <div className="relative">
        <div className={cn('h-[150px] lg:h-[200px] w-[100%]', {
          'skeleton-card-image': !isImageLoaded,
        })}>
          <img
            className="h-[100%] w-[100%] object-cover rounded-[16px]"
            src={imageUrl}
            alt="card-image"
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-14 font-main text-[#4D2597]">Word</p>

          <h4 className="font-secondary text-20 lg:text-28 h-20 sm:h-auto lg:h-20 text-primary font-bold">
            {front}
          </h4>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-14 font-main text-[#4D2597]">
            Sentence from the video
          </p>

          <h5 className="font-main text-18 xl:text-20 text-text-secondary">
            {back}
          </h5>
        </div>
      </div>
    </article>
  );
};
